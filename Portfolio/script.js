// Smooth Scrolling for Navigation Links and Collapse Navbar on Click
document.querySelectorAll(".navbar-nav .nav-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Smooth scroll to the target section
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });

    // Check if the navbar is currently expanded (on mobile/collapsed state)
    const navbarCollapse = document.getElementById("navbarNav");
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: false, // Don't toggle immediately
    });

    if (navbarCollapse.classList.contains("show")) {
      // If the navbar is showing, hide it
      bsCollapse.hide();
    }
  });
});

// Typewriter Effect for Hero Lead Text with Fixed Crimson Color
const typewriterTextElement = document.getElementById("typewriter-text");
const phrases = [
  "Full-Stack Developer.",
  "Clean Code Advocate.",
  "Scalable App Builder.",
  "Lifelong Learner.",
];

// The color for the dynamic text is now fixed crimson via CSS
// const crimsonColor = '#dc3545'; // Not needed in JS as color is set by CSS

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    // Deleting text
    typewriterTextElement.textContent = currentPhrase.substring(
      0,
      charIndex - 1
    );
    charIndex--;
  } else {
    // Typing text
    typewriterTextElement.textContent = currentPhrase.substring(
      0,
      charIndex + 1
    );
    charIndex++;
  }

  let typingSpeed = isDeleting ? 30 : 70; // Faster deletion, slower typing
  if (!isDeleting && charIndex === currentPhrase.length) {
    typingSpeed = 1500; // Pause at end of typing
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
    typingSpeed = 500; // Pause before typing next phrase
  }

  setTimeout(typeWriter, typingSpeed);
}

// Scroll-based Fade-in and Slide-up Animations (for projects & skills)
const observerOptions = {
  root: null, // Use the viewport as the root
  rootMargin: "0px",
  threshold: 0.1, // Trigger when 10% of the item is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      observer.unobserve(entry.target); // Stop observing once animated
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".project-card").forEach((card) => {
  observer.observe(card);
});

// Observe skill items for animation (reverted to list items)
document.querySelectorAll(".skill-item").forEach((item) => {
  observer.observe(item);
});

// Initialize Typewriter effect when the page loads
window.onload = typeWriter;

// Scroll to Top Button Logic
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
};

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Project Modal Logic
const projectModal = document.getElementById("projectModal");
const closeButton = document.querySelector(".close-button");
const modalProjectTitle = document.getElementById("modalProjectTitle");
const modalProjectScreenshot = document.getElementById(
  "modalProjectScreenshot"
);
const modalProjectDescription = document.getElementById(
  "modalProjectDescription"
);
const modalProjectTechnologies = document.getElementById(
  "modalProjectTechnologies"
);
const modalProjectCodeLink = document.getElementById("modalProjectCodeLink");
const modalProjectDemoLink = document.getElementById("modalProjectDemoLink");

// Project Data (Replace with your actual project details)
const projectsData = {
  calculator: {
    title: "NexChat WebApp",
    description:
      "This project is a dynamic, fully responsive, and scalable web-based chat application designed to deliver seamless real-time messaging between users. Built with modern web technologies and real-time communication protocols, the platform ensures fast, secure, and intuitive interactions across various devices and screen sizes.",
    technologies: "HTML, CSS, BootStrap, JavaScript, Firebase Realtime Database",
    codeLink: "https://github.com/rajaroy47/NexChatApp.git",
    demoLink: "https://nex-chat-app-sable.vercel.app/", // Add your live demo link here if available
    screenshot:
      "assets/screenshots/nexchat.png", // Placeholder
  },
  "landing-page": {
    title: "Modern Landing Page",
    description:
      "A visually appealing and fully responsive landing page, crafted to showcase products/services with compelling design and engaging content sections. This project emphasized modern design trends and effective use of Bootstrap for layout and responsiveness.",
    technologies: "HTML, CSS, Bootstrap",
    codeLink: "https://github.com/rajaroy47/CODSOFT/tree/main/Landing%20Page",
    demoLink: "",
    screenshot:
      "https://placehold.co/600x400/3a475e/ffffff?text=Landing+Page+Screenshot",
  },
  "password-generator": {
    title: "Secure Password Generator",
    description:
      "A robust web application designed to generate strong, customizable passwords based on user-defined criteria for enhanced security. This project highlights my ability to implement client-side logic for practical utility tools.",
    technologies: "HTML, CSS, JavaScript, BootStrap",
    codeLink:
      "https://github.com/rajaroy47/random-passgen.git",
    demoLink: "",
    screenshot:
      "assets/screenshots/passgen.png",
  },
  "todo-webapp": {
    title: "Interactive To-Do WebApp",
    description:
      "A feature-rich to-do list application enabling users to manage tasks, set priorities, and track completion, built for productivity. This project demonstrates fundamental CRUD operations and dynamic DOM manipulation.",
    technologies: "HTML, CSS, JavaScript",
    codeLink: "https://github.com/rajaroy47/CODSOFT/tree/main/To-Do%20Webapp",
    demoLink: "",
    screenshot:
      "https://placehold.co/600x400/3a475e/ffffff?text=To-Do+App+Screenshot",
  },
  // Add more projects here
  /*
            "my-other-project": {
                title: "My Other Project",
                description: "A detailed description of another project you've worked on, highlighting its purpose, key features, and unique aspects.",
                technologies: "React, Node.js, MongoDB",
                codeLink: "https://github.com/your-username/my-other-project",
                demoLink: "https://your-other-project-demo.com",
                screenshot: "assets/img/my-other-project-screenshot.png"
            }
            */
};

// Function to open the modal and populate with project data
function openProjectModal(projectId) {
  const project = projectsData[projectId];
  if (project) {
    modalProjectTitle.innerText = project.title;
    modalProjectDescription.innerText = project.description;
    modalProjectTechnologies.innerText = `Technologies: ${project.technologies}`;
    modalProjectCodeLink.href = project.codeLink;

    if (project.demoLink) {
      modalProjectDemoLink.href = project.demoLink;
      modalProjectDemoLink.style.display = "inline-block"; // Show if demo link exists
    } else {
      modalProjectDemoLink.style.display = "none"; // Hide if no demo link
    }

    if (project.screenshot) {
      modalProjectScreenshot.src = project.screenshot;
      modalProjectScreenshot.style.display = "block"; // Show if screenshot exists
    } else {
      modalProjectScreenshot.style.display = "none"; // Hide if no screenshot
    }

    projectModal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling background
  }
}

// Function to close the modal
function closeProjectModal() {
  projectModal.style.display = "none";
  document.body.style.overflow = "auto"; // Allow scrolling background
}

// Event listeners for opening modal
document.querySelectorAll(".view-details-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default link behavior
    const projectId = this.dataset.projectId;
    openProjectModal(projectId);
  });
});

// Event listener for closing modal
closeButton.addEventListener("click", closeProjectModal);

// Close modal when clicking outside of the modal content
window.addEventListener("click", function (event) {
  if (event.target == projectModal) {
    closeProjectModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && projectModal.style.display === "block") {
    closeProjectModal();
  }
});

// Particles.js configuration
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80 /* Number of particles */,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#6366f1" /* Particle color (indigo accent) */,
    },
    shape: {
      type: "circle" /* Shape of particles */,
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.5 /* Opacity of particles */,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3 /* Size of particles */,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: false /* No lines between particles */,
    },
    move: {
      enable: true,
      speed: 3 /* Speed of particles */,
      direction: "bottom" /* Particles fall downwards */,
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false /* No hover interaction */,
      },
      onclick: {
        enable: false /* No click interaction */,
      },
      resize: true,
    },
  },
  retina_detect: true,
});
