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

// ===== Schedule Tabs with URL hash =====
(function () {
  var tabs = document.querySelectorAll('.schedule-tab');
  var panels = document.querySelectorAll('.tab-panel');
  if (!tabs.length) return;

  function switchTab(tabName) {
    tabs.forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-tab') === tabName);
    });
    panels.forEach(function (p) {
      p.classList.toggle('active', p.id === tabName);
    });
  }

  // Click handler
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var tabName = this.getAttribute('data-tab');
      switchTab(tabName);
      history.replaceState(null, '', '#' + tabName);
    });
  });

  // Load from URL hash on page load
  var hash = window.location.hash.replace('#', '');
  if (hash === 'fullday' || hash === 'schoolday' || hash === 'halfday') {
    switchTab(hash);
  }

  // Handle back/forward navigation
  window.addEventListener('hashchange', function () {
    var hash = window.location.hash.replace('#', '');
    if (hash === 'fullday' || hash === 'schoolday' || hash === 'halfday') {
      switchTab(hash);
    }
  });
})();

// ===== Scroll-triggered animations (IntersectionObserver) =====
(function () {
  var items = document.querySelectorAll('.animate-in');
  if (!items.length) return;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach(function (item) { observer.observe(item); });
  } else {
    // Fallback: show all immediately
    items.forEach(function (item) { item.classList.add('visible'); });
  }
})();

// ===== Back to Top Button =====
(function () {
  var btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
