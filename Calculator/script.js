let display = document.getElementById('input-box');
let buttons = document.querySelectorAll('button');
let btnAry = Array.from(buttons);
// console.log('hloooo');

let empStr = '';


btnAry.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if(e.target.innerHTML == 'DEL'){
            empStr = empStr.substring(0, empStr.length - 1);
            display.value = empStr;
        }
        else if(e.target.innerHTML == 'AC'){
            empStr = '';
            display.value = empStr;
        }
        else if(e.target.innerHTML == '='){
            empStr = eval(empStr);
            display.value = empStr;
        }
        else{
            empStr += e.target.innerHTML;
            display.value = empStr;
        }
    })
})