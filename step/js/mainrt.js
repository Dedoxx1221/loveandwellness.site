document.querySelectorAll(".accordion .item .header").forEach((header) => {
  header.addEventListener("click", function () {
    const item = this.parentNode;
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    } else {
      document
        .querySelectorAll(".accordion .item")
        .forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    }
  });
});

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Menu toggle
const menuBtn = document.getElementById("menu");
const mainNav = document.getElementById("mainNav");

if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle("active");
    mainNav.classList.toggle("active");
    document.body.style.overflow = mainNav.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close menu when clicking on links
  document.querySelectorAll("#mainNav a").forEach((link) => {
    link.addEventListener("click", function () {
      menuBtn.classList.remove("active");
      mainNav.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

var yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
var copyYearEl = document.getElementById("copyYear");
if (copyYearEl) copyYearEl.textContent = new Date().getFullYear();
