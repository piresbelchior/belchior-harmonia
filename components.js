// ── BELCHIOR HARMONIA – Componentes compartilhados ──────

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
.logo{font-family:'Montserrat',sans-serif;font-weight:900;font-size:1rem;color:#FFFFFF;text-decoration:none;display:flex;align-items:center;gap:.5rem}
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
.foot-brand{font-family:'Montserrat',sans-serif;font-weight:900;font-size:.95rem;color:#FFFFFF;display:flex;align-items:center}
.foot-brand span{color:#F26522}
.foot-copy{font-size:.78rem;color:rgba(255,255,255,.3)}
.foot-links{display:flex;gap:1.25rem}
.foot-links a{font-size:.78rem;font-weight:600;color:rgba(255,255,255,.4);letter-spacing:.05em;text-transform:uppercase;transition:color .2s;text-decoration:none}
.foot-links a:hover{color:#F26522}
@media(max-width:768px){.nav-links{display:none}.ham{display:flex}.foot-in{flex-direction:column;text-align:center}}`;

// ── CAPI Worker ──────────────────────────────────────────
const CAPI_URL = 'https://meta-capi-belchior.piresbelchior.workers.dev/';

function generateEventId() {
  return 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function sendCAPI(event_name, extra = {}, event_id = null) {
  const eid = event_id || generateEventId();
  fetch(CAPI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name,
      event_id: eid,
      event_source_url: window.location.href,
      client_user_agent: navigator.userAgent,
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),
      ...extra
    }),
  }).catch(() => {});
  return eid;
}

// ── Injetar componentes ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // CSS
  const style = document.createElement('style');
  style.textContent = NAV_CSS;
  document.head.appendChild(style);

  // Nav
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) navPlaceholder.innerHTML = NAV_HTML;

  // Footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.innerHTML = FOOTER_HTML;

  // Mobile menu
  const ham = document.getElementById('ham');
  const mm = document.getElementById('mmenu');
  const mc = document.getElementById('mclose');
  if (ham) ham.addEventListener('click', () => mm.classList.add('open'));
  if (mc) mc.addEventListener('click', () => mm.classList.remove('open'));
  if (mm) mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mm.classList.remove('open')));

  // Link ativo
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, #mmenu a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // ── EVENTOS META PIXEL + CAPI ──────────────────────────

  // ViewContent — Samba sem Mistério
  if (currentPage === 'samba-sem-misterio.html') {
    const eid = generateEventId();
    if (window.fbq) fbq('track', 'ViewContent', {
      content_name: 'Samba sem Mistério',
      content_category: 'Curso Online',
      currency: 'BRL',
      value: 9.90
    }, { eventID: eid });
    sendCAPI('ViewContent', {
      content_name: 'Samba sem Mistério',
      value: 9.90,
      currency: 'BRL'
    }, eid);
  }

  // ViewContent — Aulas Particulares
  if (currentPage === 'aulas-particulares.html') {
    const eid = generateEventId();
    if (window.fbq) fbq('track', 'ViewContent', {
      content_name: 'Aulas Particulares de Violão',
      content_category: 'Aulas',
    }, { eventID: eid });
    sendCAPI('ViewContent', {
      content_name: 'Aulas Particulares de Violão'
    }, eid);
  }

  // CAPI — PageView server-side
  sendCAPI('PageView');

  // InitiateCheckout — Hotmart
  document.querySelectorAll('a[href*="pay.hotmart.com"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.href.includes('xpluvrux') ? 95.70 : 19.90;
      const eid = generateEventId();
      if (window.fbq) fbq('track', 'InitiateCheckout', {
        content_name: 'Samba sem Mistério',
        currency: 'BRL',
        value: val
      }, { eventID: eid });
      sendCAPI('InitiateCheckout', {
        content_name: 'Samba sem Mistério',
        value: val,
        currency: 'BRL'
      }, eid);
    });
  });

  // Contact — WhatsApp
  document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cname = currentPage === 'aulas-particulares.html' ? 'Aulas Particulares' : 'Samba sem Mistério';
      const eid = generateEventId();
      if (window.fbq) fbq('track', 'Contact', { content_name: cname }, { eventID: eid });
      sendCAPI('Contact', { content_name: cname }, eid);
    });
  });

});
