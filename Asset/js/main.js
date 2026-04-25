/* =========================================================
   Hero Travel — Frontend Interactions
   Author: Md. Jahidul Islam Hemel
   ========================================================= */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------------------
       1. Auto-update copyright year
    ----------------------------------------------------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();


    /* -----------------------------------------------------
       2. Cancel jumps for placeholder <a href="#"> links
    ----------------------------------------------------- */
    document.querySelectorAll('a[href="#"]').forEach(a => {
        a.addEventListener('click', e => e.preventDefault());
    });


    /* -----------------------------------------------------
       3. Smooth-scroll for in-page nav anchors
       (e.g. #home, #packages, #contact)
    ----------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
        link.addEventListener('click', e => {
            const id = link.getAttribute('href');
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    /* -----------------------------------------------------
       4. Toast helper (slides up from bottom)
    ----------------------------------------------------- */
    function showToast(message) {
        let toast = document.querySelector('.ht-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'ht-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('ht-toast--show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => {
            toast.classList.remove('ht-toast--show');
        }, 3500);
    }


    /* -----------------------------------------------------
       5. Modal helper (lazily created on first use)
    ----------------------------------------------------- */
    function showModal(title, body) {
        let backdrop = document.querySelector('.ht-modal-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'ht-modal-backdrop';
            backdrop.innerHTML = `
                <div class="ht-modal" role="dialog" aria-modal="true">
                    <button class="ht-modal__close" type="button" aria-label="Close">&times;</button>
                    <h3 class="ht-modal__title"></h3>
                    <p class="ht-modal__body"></p>
                    <a class="ht-modal__cta" href="mailto:jahidhemel@gmail.com">Email Hemel</a>
                </div>
            `;
            document.body.appendChild(backdrop);

            backdrop.addEventListener('click', e => {
                if (e.target === backdrop || e.target.classList.contains('ht-modal__close')) {
                    backdrop.classList.remove('ht-modal-backdrop--show');
                }
            });

            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') {
                    backdrop.classList.remove('ht-modal-backdrop--show');
                }
            });
        }
        backdrop.querySelector('.ht-modal__title').textContent = title;
        backdrop.querySelector('.ht-modal__body').textContent = body;
        backdrop.classList.add('ht-modal-backdrop--show');
    }


    /* -----------------------------------------------------
       6. "Find Now" search button
    ----------------------------------------------------- */
    const findBtn = document.querySelector('.tourSearchPanel button');
    if (findBtn) {
        findBtn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();

            const whereEl = document.getElementById('whereto');
            const whenEl  = document.getElementById('when');
            const typeEl  = document.getElementById('SelectType');

            const where = whereEl ? whereEl.value.trim() : '';
            const when  = whenEl  ? whenEl.value         : '';
            const type  = typeEl && typeEl.selectedOptions[0]
                          ? typeEl.selectedOptions[0].text
                          : '';

            if (!where && !when) {
                showToast('Where would you like to go? Add a destination or date.');
                return;
            }

            const parts = [];
            if (type && type !== 'Select Type') parts.push(type.toLowerCase());
            if (where) parts.push('to ' + where);
            if (when)  parts.push('on '  + when);

            showToast('🔍 Searching ' + parts.join(' ') + '…');
        });
    }


    /* -----------------------------------------------------
       7. Demo CTAs — Book Now, Read More, See More, etc.
    ----------------------------------------------------- */
    const demoSelectors = [
        '.dealsandDiscountContentDiv > a > button',
        '.dealsandDiscountBodyPanel > a > button',
        '.popularTourdetails > a > button',
        '.simplePlaceContentPanel > a > button'
    ].join(', ');

    document.querySelectorAll(demoSelectors).forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            showModal(
                'Just a demo!',
                "Hey! This is a demo from my portfolio, so the buttons don't actually do anything yet. Drop me an email if you'd like to chat."
            );
        });
    });


    /* -----------------------------------------------------
       8. Newsletter form
    ----------------------------------------------------- */
    const newsletterForm = document.querySelector('.newsletterFromDIV form');
    if (newsletterForm) {
        const handleSubscribe = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const nameEl  = document.getElementById('enterName');
            const emailEl = document.getElementById('enterEmail');

            const name  = nameEl  ? nameEl.value.trim()  : '';
            const email = emailEl ? emailEl.value.trim() : '';

            if (!name || !email) {
                showToast('Please enter your name and email.');
                return;
            }
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                showToast('That email looks off — double-check it.');
                return;
            }

            showToast('Thanks for subscribing, ' + name + '!');
            newsletterForm.reset();
        };

        newsletterForm.addEventListener('submit', handleSubscribe);
        const submitBtn = newsletterForm.querySelector('button');
        if (submitBtn) submitBtn.addEventListener('click', handleSubscribe);
    }

});
