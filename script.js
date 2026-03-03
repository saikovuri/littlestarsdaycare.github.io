// Mobile nav toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', function (e) {
  e.stopPropagation();
  nav.classList.toggle('active');
});

// Close nav when clicking/tapping outside
document.addEventListener('click', function (e) {
  if (nav.classList.contains('active') && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
    nav.classList.remove('active');
  }
});

// Close nav when a nav link is clicked (mobile)
nav.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    nav.classList.remove('active');
  });
});

// Close nav on scroll (mobile)
window.addEventListener('scroll', function () {
  if (nav.classList.contains('active')) {
    nav.classList.remove('active');
  }
});
