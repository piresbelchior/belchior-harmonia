// ── BELCHIOR HARMONIA – Componentes compartilhados ──

const NAV_HTML = `
<nav>
  <div class="nav-in">
    <a href="index.html" class="logo"><img src="logo.png" alt="Belchior Harmonia" class="nav-logo-img"/><span>Belchior</span> Harmonia</a>
    <ul class="nav-links">
      <li><a href="index.html">Página Inicial</a></li>
      <li><a href="aulas-particulares.html">Aulas Particulares</a></li>
      <li><a href="samba-sem-misterio.html">Samba sem Mistério</a></li>
      <li><a href="https://www.youtube.com/@belchiorharmonia" target="_blank">Canal do Youtube</a></li>
      <li><a href="https://www.instagram.com/belchiorharmonia/" target="_blank">Instagram</a></li>
    </ul>
    <button class="ham" id="ham"><span></span><span></span><span></span></button>
  </div>
</nav>
<div id="mmenu">
  <button class="mclose" id="mclose">✕</button>
  <a href="index.html">Página Inicial</a>
  <a href="aulas-particulares.html">Aulas Particulares</a>
  <a href="samba-sem-misterio.html">Samba sem Mistério</a>
  <a href="https://www.youtube.com/@belchiorharmonia" target="_blank">Canal do Youtube</a>
  <a href="https://www.instagram.com/belchiorharmonia/" target="_blank">Instagram</a>
</div>`;

const FOOTER_HTML = `
<footer>
  <div class="foot-in">
    <div class="foot-brand"><img src="logo.png" alt="Belchior Harmonia" style="width:28px;height:28px;object-fit:contain;vertical-align:middle;margin-right:.5rem"/><span>Belchior</span> Harmonia</div>
    <div class="foot-copy">© 2025 Belchior Harmonia · João G. Belchior · Rio de Janeiro – RJ</div>
    <div class="foot-links">
      <a href="https://www.instagram.com/belchiorharmonia/" target="_blank">📷 Instagram</a>
      <a href="https://www.youtube.com/@belchiorharmonia" target="_blank">▶️ YouTube</a>
    </div>
  </div>
</footer>`;

const NAV_CSS = `
nav{background:#111111;position:sticky;top:0;z-index:999;padding:0 2rem}
.nav-in{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:56px}
.logo{font-family:'Montserrat',sans-serif;font-weight:900;font-size:1rem;color:#FFFFFF;text-decoration:none}
.logo span{color:#F26522}
.nav-logo-img{width:32px;height:32px;object-fit:contain;flex-shrink:0}
.nav-links{display:flex;gap:1.75rem;list-style:none}
.nav-links a{color:rgba(255,255,255,.75);font-size:.8rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;transition:color .2s;text-decoration:none}
.nav-links a:hover{color:#F26522}
.nav-links a.active{color:#F26522}
.ham{display:none;background:none;border:none;cursor:pointer;flex-direction:column;gap:5px;padding:4px}
.ham span{display:block;width:22px;height:2px;background:#FFFFFF}
#mmenu{display:none;position:fixed;inset:0;background:rgba(17,17,17,.97);z-index:998;flex-direction:column;align-items:center;justify-content:center;gap:2rem}
#mmenu.open{display:flex}
#mmenu a{font-family:'Montserrat',sans-serif;font-size:1.5rem;font-weight:700;color:#FFFFFF;transition:color .2s;text-decoration:none}
#mmenu a:hover{color:#F26522}
.mclose{position:absolute;top:1.5rem;right:1.5rem;background:none;border:none;color:#FFFFFF;font-size:1.8rem;cursor:pointer}
footer{background:#111111;border-top:1px solid rgba(255,255,255,.06);padding:2rem}
.foot-in{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.foot-brand{font-family:'Montserrat',sans-serif;font-weight:900;font-size:.95rem;color:#FFFFFF}
.foot-brand span{color:#F26522}
.foot-copy{font-size:.78rem;color:rgba(255,255,255,.3)}
.foot-links{display:flex;gap:1.25rem}
.foot-links a{font-size:.78rem;font-weight:600;color:rgba(255,255,255,.4);letter-spacing:.05em;text-transform:uppercase;transition:color .2s;text-decoration:none}
.foot-links a:hover{color:#F26522}
@media(max-width:768px){.nav-links{display:none}.ham{display:flex}.foot-in{flex-direction:column;text-align:center}}`;

// Injetar componentes
document.addEventListener('DOMContentLoaded', () => {
  // Injetar CSS
  const style = document.createElement('style');
  style.textContent = NAV_CSS;
  document.head.appendChild(style);

  // Injetar nav
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) navPlaceholder.innerHTML = NAV_HTML;

  // Injetar footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.innerHTML = FOOTER_HTML;

  // Mobile menu
  const ham = document.getElementById('ham');
  const mm = document.getElementById('mmenu');
  const mc = document.getElementById('mclose');
  if (ham) ham.addEventListener('click', () => mm.classList.add('open'));
  if (mc) mc.addEventListener('click', () => mm.classList.remove('open'));
  if (mm) mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mm.classList.remove('open')));

  // Marcar link ativo
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, #mmenu a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });
});


// ── META PIXEL + CAPI ────────────────────────────────
const META_PIXEL_ID = '563576268393888';
const CAPI_WORKER_URL = 'https://meta-capi-belchior.piresbelchior.workers.dev/';

// Injetar script do Facebook Pixel no <head>
(function() {
  if (window.fbq) return;
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  script.onload = function() {
    fbq('init', META_PIXEL_ID);
    initTracking();
  };
  document.head.appendChild(script);

  window.fbq = window.fbq || function() {
    (window.fbq.q = window.fbq.q || []).push(arguments);
  };
  window.fbq.loaded = true;
  window.fbq.version = '2.0';
  window.fbq.q = [];
})();

function initTracking() {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  // PageView
  const pageViewId = generateEventId();
  fbq('track', 'PageView', {}, { eventID: pageViewId });
  sendCAPI('PageView', {}, pageViewId);

  // ViewContent — Samba
  if (page === 'samba-sem-misterio.html') {
    const sambViewId = generateEventId();
    fbq('track', 'ViewContent', {
      content_name: 'Samba sem Mistério',
      content_category: 'Curso Online',
      currency: 'BRL',
      value: 9.90
    }, { eventID: sambViewId });
    sendCAPI('ViewContent', {
      content_name: 'Samba sem Mistério',
      value: 9.90,
      currency: 'BRL'
    }, sambViewId);
  }

  // ViewContent — Aulas
  if (page === 'aulas-particulares.html') {
    const aulasViewId = generateEventId();
    fbq('track', 'ViewContent', {
      content_name: 'Aulas Particulares de Violão',
      content_category: 'Aulas',
    }, { eventID: aulasViewId });
    sendCAPI('ViewContent', {
      content_name: 'Aulas Particulares de Violão'
    }, aulasViewId);
  }

  // InitiateCheckout — Hotmart
  document.querySelectorAll('a[href*="pay.hotmart.com"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const checkoutId = generateEventId();
      const val = btn.href.includes('xpluvrux') ? 95.70 : 19.90;
      fbq('track', 'InitiateCheckout', {
        content_name: 'Samba sem Mistério',
        currency: 'BRL',
        value: val
      }, { eventID: checkoutId });
      sendCAPI('InitiateCheckout', {
        content_name: 'Samba sem Mistério',
        value: val,
        currency: 'BRL'
      }, checkoutId);
    });
  });

  // Contact — WhatsApp
  document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const contactId = generateEventId();
      const cname = page === 'aulas-particulares.html' ? 'Aulas Particulares' : 'Samba sem Mistério';
      fbq('track', 'Contact', { content_name: cname }, { eventID: contactId });
      sendCAPI('Contact', { content_name: cname }, contactId);
    });
  });
}

function generateEventId() {
  return 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function sendCAPI(event_name, extra = {}, event_id = null) {
  const eid = event_id || generateEventId();
  const payload = {
    event_name,
    event_id: eid,
    event_source_url: window.location.href,
    client_user_agent: navigator.userAgent,
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc'),
    ...extra
  };

  fetch(CAPI_WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {}); // silencioso em caso de erro
}

// ────────────────────────────────────────────────────
