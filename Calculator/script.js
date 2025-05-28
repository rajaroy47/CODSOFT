// Get references to DOM elements
        const historyDisplay = document.getElementById('history-display');
        const currentDisplay = document.getElementById('current-display');
        const buttons = document.querySelectorAll('.calculator-button');
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        // Calculator state variables
        let currentOperand = '';
        let previousOperand = '';
        let operation = null;
        let shouldResetDisplay = false; // Flag to clear display after an operation or equals
        let memory = 0; // Initialize memory for MC, MR, M+, M- (though only MC is implemented for now)

        /**
         * Updates the display with the current and history operands.
         */
        function updateDisplay() {
            currentDisplay.innerText = currentOperand === '' ? '0' : currentOperand;
            if (operation != null) {
                historyDisplay.innerText = `${previousOperand} ${operation}`;
            } else {
                historyDisplay.innerText = '';
            }
        }

        /**
         * Appends a number to the current operand.
         * @param {string} number - The number string to append.
         */
        function appendNumber(number) {
            if (shouldResetDisplay) {
                currentOperand = number;
                shouldResetDisplay = false;
                updateDisplay(); // Update immediately after reset
                return;
            }
            if (number === '.' && currentOperand.includes('.')) return; // Prevent multiple decimal points
            currentOperand = currentOperand.toString() + number.toString();
            updateDisplay();
        }

        /**
         * Sets the operation for the calculation.
         * @param {string} op - The operator string (+, -, *, /).
         */
        function chooseOperation(op) {
            if (currentOperand === '' && previousOperand === '') return; // Do nothing if no number is entered and no previous calculation
            if (previousOperand !== '') {
                // If there's a previous operand and an operation, calculate first
                calculate();
            }
            operation = op;
            previousOperand = currentOperand;
            currentOperand = ''; // Clear current operand for new input
            shouldResetDisplay = false; // Ensure display doesn't reset until next number is entered
            updateDisplay();
        }

        /**
         * Performs the calculation based on the current operation.
         */
        function calculate() {
            let computation;
            const prev = parseFloat(previousOperand);
            const current = parseFloat(currentOperand);
            if (isNaN(prev) || isNaN(current)) return; // Don't calculate if inputs are invalid

            switch (operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '/':
                    // Handle division by zero
                    if (current === 0) {
                        currentOperand = 'Error: Div by 0';
                        previousOperand = '';
                        operation = null;
                        shouldResetDisplay = true;
                        updateDisplay();
                        return;
                    }
                    computation = prev / current;
                    break;
                default:
                    return; // No operation selected
            }
            currentOperand = computation.toString();
            operation = null;
            previousOperand = '';
            shouldResetDisplay = true; // Reset display after showing result
            updateDisplay();
        }

        /**
         * Clears all calculator state.
         */
        function clear() {
            currentOperand = '';
            previousOperand = '';
            operation = null;
            shouldResetDisplay = false;
            updateDisplay();
        }

        /**
         * Deletes the last character from the current operand.
         */
        function deleteLast() {
            if (currentOperand === 'Error: Div by 0') { // Clear error on DEL
                clear();
                return;
            }
            currentOperand = currentOperand.toString().slice(0, -1);
            if (currentOperand === '') {
                currentOperand = '0'; // If empty, set to '0'
            }
            updateDisplay();
        }

        /**
         * Toggles the sign of the current operand.
         */
        function toggleSign() {
            if (currentOperand === '' || currentOperand === '0') return;
            currentOperand = (parseFloat(currentOperand) * -1).toString();
            updateDisplay();
        }

        /**
         * Calculates the square root of the current operand.
         */
        function squareRoot() {
            const num = parseFloat(currentOperand);
            if (isNaN(num) || num < 0) {
                currentOperand = 'Error';
            } else {
                currentOperand = Math.sqrt(num).toString();
            }
            operation = null; // Clear operation after calculation
            previousOperand = '';
            shouldResetDisplay = true;
            updateDisplay();
        }

        /**
         * Applies percentage logic.
         */
        function percentage() {
            let num = parseFloat(currentOperand);
            if (isNaN(num)) return;

            if (previousOperand !== '' && operation !== null) {
                const prev = parseFloat(previousOperand);
                let percentageValue;

                if (operation === '+' || operation === '-') {
                    percentageValue = prev * (num / 100);
                    if (operation === '+') {
                        currentOperand = (prev + percentageValue).toString();
                    } else {
                        currentOperand = (prev - percentageValue).toString();
                    }
                } else if (operation === '*' || operation === '/') {
                    currentOperand = (num / 100).toString(); // Convert current operand to percentage
                    // No need to call calculate here immediately, the user might press equals or another operator
                }
            } else {
                // If no previous operand or operation, just convert current number to percentage
                currentOperand = (num / 100).toString();
            }
            // Reset state if it's a standalone percentage calculation or addition/subtraction percentage
            if (operation === null || (previousOperand === '' && operation === null) || operation === '+' || operation === '-') {
                operation = null;
                previousOperand = '';
                shouldResetDisplay = true;
            } else if (operation === '*' || operation === '/') {
                // For multiplication/division, percentage just modifies currentOperand for next calculation
                shouldResetDisplay = false;
            }
            updateDisplay();
        }

        /**
         * Clears the memory.
         */
        function memoryClear() {
            memory = 0;
            // Optionally, show a message or clear the display if memory was recalled
            // For now, just clear the memory silently.
        }


        /**
         * Toggles between light and dark themes.
         */
        function toggleTheme() {
            if (body.classList.contains('light-theme')) {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark'); // Save theme preference
            } else {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light'); // Save theme preference
            }
        }

        // Event Listeners for buttons
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.dataset.value;
                const action = button.dataset.action;

                if (value) {
                    appendNumber(value);
                } else if (action) {
                    switch (action) {
                        case 'clear':
                            clear();
                            break;
                        case 'delete':
                            deleteLast();
                            break;
                        case 'add':
                        case 'subtract':
                        case 'multiply':
                        case 'divide':
                            chooseOperation(button.innerText); // Use button text for operator
                            break;
                        case 'equals':
                            calculate();
                            break;
                        case 'toggle-sign':
                            toggleSign();
                            break;
                        case 'sqrt':
                            squareRoot();
                            break;
                        case 'percentage':
                            percentage();
                            break;
                        case 'memory-clear':
                            memoryClear();
                            break;
                    }
                }
            });
        });

        // Event Listener for keyboard input
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9' || e.key === '.') {
                appendNumber(e.key);
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                chooseOperation(e.key);
            } else if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault(); // Prevent default Enter key behavior (e.g., form submission)
                calculate();
            } else if (e.key === 'Backspace') {
                deleteLast();
            } else if (e.key === 'Escape') { // 'Esc' key for clear
                clear();
            } else if (e.key === '%') {
                percentage();
            }
        });

        // Event Listener for theme toggle button
        themeToggle.addEventListener('click', toggleTheme);

        // Load saved theme preference on page load
        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                body.classList.remove('light-theme', 'dark-theme'); // Remove default
                body.classList.add(savedTheme + '-theme');
            } else {
                // Default to light theme if no preference saved
                body.classList.add('light-theme');
            }
            updateDisplay(); // Initialize display
        });