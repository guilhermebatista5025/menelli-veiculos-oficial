/* ---- LOADING SCREEN ---- */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1500);
});

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ---- HAMBURGER MENU ---- */
const ham = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

ham.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    ham.classList.toggle('active', open);
    ham.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
});

function closeMobile() {
    mobileNav.classList.remove('open');
    ham.classList.remove('active');
    ham.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

/* ---- SCROLL REVEAL ---- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = Math.round(eased * target);
        el.textContent = val + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const counterEls = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            animateCounter(e.target);
            counterObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

/* ---- FAQ ACCORDION ---- */
function toggleFaq(btn) {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
    }
}

/* ---- WHATSAPP CHAT ---- */
const WA_NUMBER = '5527999849266';
let chatOpen = false;
let typingDone = false;

function toggleChat() {
    chatOpen = !chatOpen;
    const chat = document.getElementById('mini-chat');
    const btn = document.querySelector('.wa-btn');
    chat.classList.toggle('open', chatOpen);
    btn.setAttribute('aria-expanded', chatOpen);

    if (chatOpen && !typingDone) {
        typingDone = true;
        setTimeout(() => {
            const cursor = document.getElementById('typing-cursor');
            if (cursor) cursor.style.display = 'none';
        }, 2500);
    }
}

function openWA(msg) {
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, '_blank', 'noopener');
}

function sendChat() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    openWA(msg);
    input.value = '';
}

/* Close chat on outside click */
document.addEventListener('click', (e) => {
    const chat = document.getElementById('mini-chat');
    const fab = document.getElementById('wa-fab');
    if (chatOpen && !chat.contains(e.target) && !fab.contains(e.target)) {
        chatOpen = false;
        chat.classList.remove('open');
    }
});

/* ---- RIPPLE EFFECT ---- */
document.querySelectorAll('.ripple-container').forEach(el => {
    el.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size / 2}px;
        top:${e.clientY - rect.top - size / 2}px;
      `;
        this.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });
});

/* ---- VEHICLE CARD ripple ---- */
document.querySelectorAll('.vehicle-card').forEach(card => {
    card.addEventListener('click', function () {
        const action = this.getAttribute('onclick');
        if (action) eval(action);
    });
});