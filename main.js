/* =====================================================
   ANANYA PANDEY PORTFOLIO - main.js
===================================================== */

/* -- Inject email via JS to prevent obfuscation -- */
(function() {
  var user = 'ananyapandeyedu';
  var domain = 'gmail.com';
  var address = user + '@' + domain;
  var link = document.getElementById('contact-email-link');
  if (!link) return;

  link.href = 'mailto:' + address;
  var addrSpan = link.querySelector('.email-address');
  var label = link.querySelector('.email-label');
  if (addrSpan) addrSpan.textContent = address;

  window.addEventListener('load', function() {
    // Measure small width (just "Email")
    addrSpan.style.display = 'none';
    label.style.position = 'relative';
    link.style.width = 'auto';
    var smallW = link.offsetWidth;

    // Measure large width (just the address)
    label.style.display = 'none';
    addrSpan.style.display = 'block';
    addrSpan.style.position = 'relative';
    var largeW = link.offsetWidth;

    // Reset to default collapsed state
    label.style.display = '';
    label.style.position = 'absolute';
    label.style.opacity = '1';
    addrSpan.style.display = '';
    addrSpan.style.position = 'absolute';
    addrSpan.style.opacity = '0';
    link.style.width = smallW + 'px';

    var expanded = false;
    var animating = false;

    function expand() {
      if (expanded || animating) return;
      animating = true;
      label.style.opacity = '0';
      setTimeout(function() {
        link.style.width = largeW + 'px';
        setTimeout(function() {
          addrSpan.style.opacity = '1';
          expanded = true;
          animating = false;
        }, 180);
      }, 80);
    }

    function collapse() {
      if (!expanded || animating) return;
      animating = true;
      addrSpan.style.opacity = '0';
      setTimeout(function() {
        link.style.width = smallW + 'px';
        setTimeout(function() {
          label.style.opacity = '1';
          expanded = false;
          animating = false;
        }, 180);
      }, 80);
    }

    link.addEventListener('mouseenter', expand);
    link.addEventListener('mouseleave', collapse);
  });
})();

/* -- Sticky nav on scroll -- */
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* -- Scroll reveal -- */
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(function(el) {
  revealObserver.observe(el);
});

/* -- Hero reveals on load -- */
window.addEventListener('load', function() {
  var heroEls = document.querySelectorAll('#hero .reveal');
  heroEls.forEach(function(el, i) {
    setTimeout(function() { el.classList.add('visible'); }, 200 + i * 160);
  });
});

/* -- Mobile menu -- */
var burger = document.getElementById('burger');
var mobileMenu = document.getElementById('mobileMenu');
var closeMenu = document.getElementById('closeMenu');

if (burger) {
  burger.addEventListener('click', function() {
    mobileMenu.classList.add('open');
  });
}
if (closeMenu) {
  closeMenu.addEventListener('click', function() {
    mobileMenu.classList.remove('open');
  });
}
document.querySelectorAll('.mm-link').forEach(function(link) {
  link.addEventListener('click', function() {
    mobileMenu.classList.remove('open');
  });
});

/* -- Active nav highlight -- */
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav-links a');

var sectionObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      var id = entry.target.getAttribute('id');
      navLinks.forEach(function(link) {
        link.style.color = (link.getAttribute('href') === '#' + id) ? 'var(--violet)' : '';
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(function(s) { sectionObserver.observe(s); });
