
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const body = document.body;
  const navbarCollapseElement = document.getElementById("navbarNav");
 
  const bsCollapse = new bootstrap.Collapse(navbarCollapseElement, {
    toggle: false,
  });

  // Function to set theme
  const setTheme = (theme) => {
    if (theme === "dark") {
      body.classList.add("dark-theme");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-theme");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }
  };

  // Check for saved theme preference on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    
    setTheme("light");
  }

  // Toggle theme on button click
  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
 
    if (navbarCollapseElement.classList.contains("show")) {
      bsCollapse.hide();
    }
  });

  document.querySelectorAll("#navbarNav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapseElement.classList.contains("show")) {
        bsCollapse.hide(); 
      }
    });
  });
});
