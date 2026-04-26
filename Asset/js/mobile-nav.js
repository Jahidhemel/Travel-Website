/* =========================================================
   Hero Travel — Mobile nav + scroll shadow
   Injects a hamburger button into the header and a
   centered slide-down nav. Toggles `.is-scrolled` class on
   the header for the shadow on scroll.
   Author: Md. Jahidul Islam Hemel
   ========================================================= */

'use strict';

(function () {
    function init() {
        var header = document.querySelector('body > header');
        if (!header) return;

        // ---- Build hamburger button ----
        var headerInner = header.querySelector('.headerPaneldiv');
        if (headerInner && !headerInner.querySelector('.mobile-menu-btn')) {
            var btn = document.createElement('button');
            btn.className = 'mobile-menu-btn';
            btn.setAttribute('aria-label', 'Open menu');
            btn.innerHTML = '<i class="fa fa-bars"></i>';
            headerInner.appendChild(btn);

            // ---- Build slide-down mobile nav ----
            var mobileNav = document.createElement('nav');
            mobileNav.className = 'mobile-nav';
            mobileNav.id = 'mobileNav';
            // Mirror the items from the desktop nav
            var desktopLinks = header.querySelectorAll('.headernavPanel a');
            if (desktopLinks.length === 0) {
                // Fallback links
                ['Home|#home', 'Packages|#packages', 'Contact|#contact'].forEach(function (s) {
                    var parts = s.split('|');
                    var a = document.createElement('a');
                    a.href = parts[1];
                    a.textContent = parts[0];
                    mobileNav.appendChild(a);
                });
            } else {
                desktopLinks.forEach(function (link) {
                    var a = document.createElement('a');
                    a.href = link.getAttribute('href');
                    a.textContent = link.textContent;
                    mobileNav.appendChild(a);
                });
            }
            header.appendChild(mobileNav);

            btn.addEventListener('click', function () {
                var open = mobileNav.classList.toggle('is-open');
                btn.innerHTML = open
                    ? '<i class="fa fa-times"></i>'
                    : '<i class="fa fa-bars"></i>';
                btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            });

            mobileNav.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () {
                    mobileNav.classList.remove('is-open');
                    btn.innerHTML = '<i class="fa fa-bars"></i>';
                    btn.setAttribute('aria-label', 'Open menu');
                });
            });
        }

        // ---- Scroll shadow ----
        function onScroll() {
            if (window.scrollY > 8) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
