/* =========================================================
   Feedia — shared layout & helpers
   ========================================================= */
(function () {
  const F = window.FEEDIA;
  const page = document.body.dataset.page || "";

  const NAV = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "about.html", label: "About", key: "about" },
    { href: "services.html", label: "Services", key: "services" },
    { href: "events.html", label: "Events", key: "events" },
    { href: "media.html", label: "Media", key: "media" },
    { href: "invest.html", label: "Invest & Sponsor", key: "invest" }
  ];

  /* ---------- Header ---------- */
  const header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML = `
      <div class="container nav">
        <a class="logo" href="index.html" aria-label="Feedia home">
          <img src="assets/img/feedia-wordmark.png" alt="Feedia" width="69" height="24">
          <small>A Global<br>Strategy Company</small>
        </a>
        <ul class="nav-links" id="nav-links">
          ${NAV.map(n => `<li><a href="${n.href}" class="${n.key === page ? "active" : ""}" ${n.key === page ? 'aria-current="page"' : ""}>${n.label}</a></li>`).join("")}
        </ul>
        <div class="nav-actions">
          <button class="icon-btn" id="theme-toggle" aria-label="Toggle color theme" title="Toggle theme">◐</button>
          <a class="btn btn-primary btn-sm" href="consultation.html">Free Consultation</a>
          <button class="icon-btn menu-toggle" id="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">☰</button>
        </div>
      </div>`;
    const toggle = document.getElementById("menu-toggle");
    const links = document.getElementById("nav-links");
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      toggle.textContent = open ? "✕" : "☰";
    });
  }

  /* ---------- Footer ---------- */
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    const svc = F.services.slice(0, 6);
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <a class="logo" href="index.html"><img src="assets/img/feedia-wordmark.png" alt="Feedia" width="69" height="24"></a>
            <p class="muted" style="margin-top:16px;max-width:340px">Your outsourced marketing and business development team. Strategy, PR, content, events and growth across every digital platform.</p>
            <div class="socials">
              ${F.brand.socials.map(s => `<a class="icon-btn" href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}" title="${s.label}">${s.short}</a>`).join("")}
            </div>
          </div>
          <div>
            <h4>Services</h4>
            <ul>${svc.map(s => `<li><a href="services.html#${s.id}">${s.title}</a></li>`).join("")}<li><a href="services.html" class="link-arrow">All services</a></li></ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="about.html">About</a></li>
              <li><a href="events.html">Event Calendar</a></li>
              <li><a href="media.html">Media Library</a></li>
              <li><a href="invest.html">Invest & Sponsor</a></li>
              <li><a href="invest.html#affiliate">Affiliate Rewards</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:${F.brand.email}">${F.brand.email}</a></li>
              <li><a href="consultation.html">Book a free consultation</a></li>
              <li><a href="index.html#contact">Send a message</a></li>
              <li><a href="${F.brand.youtube}" target="_blank" rel="noopener">YouTube channel</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Feedia · A Global Strategy Company</span>
          <span>Home of <a href="media.html" class="link-arrow">2050 House</a></span>
        </div>
      </div>`;
  }

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const saved = store.get("feedia-theme");
  if (saved) root.dataset.theme = saved;
  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const current = root.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const next = current === "light" ? "dark" : "light";
    root.dataset.theme = next;
    store.set("feedia-theme", next);
  });

  /* ---------- Reveal on scroll ---------- */
  function observeReveal(scope) {
    const els = (scope || document).querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  }

  /* ---------- Toast ---------- */
  let toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove("show"), 2600);
  }

  /* ---------- Modal ---------- */
  function ensureModal() {
    let m = document.getElementById("modal");
    if (m) return m;
    m = document.createElement("div");
    m.id = "modal"; m.className = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true");
    m.innerHTML = `<div class="modal-box"><button class="icon-btn modal-close" aria-label="Close">✕</button><div class="modal-content"></div></div>`;
    document.body.appendChild(m);
    m.addEventListener("click", e => { if (e.target === m || e.target.closest(".modal-close")) closeModal(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
    return m;
  }
  let lastFocus;
  function openModal(html) {
    const m = ensureModal();
    lastFocus = document.activeElement;
    m.querySelector(".modal-content").innerHTML = html;
    m.classList.add("open");
    document.body.style.overflow = "hidden";
    m.querySelector(".modal-close").focus();
  }
  function closeModal() {
    const m = document.getElementById("modal");
    if (!m || !m.classList.contains("open")) return;
    m.classList.remove("open");
    m.querySelector(".modal-content").innerHTML = ""; // stops video playback
    document.body.style.overflow = "";
    lastFocus?.focus?.();
  }

  /* ---------- YouTube helpers ---------- */
  const ytThumb = (id, q = "hqdefault") => `https://i.ytimg.com/vi/${id}/${q}.jpg`;
  const ytEmbed = (id, autoplay) => `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1${autoplay ? "&autoplay=1" : ""}`;
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function playVideo(item) {
    openModal(`
      <div class="player"><iframe src="${ytEmbed(item.yt, true)}" title="${esc(item.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px"><span class="tag brand">${esc(item.category)}</span><span class="tag">${esc(item.duration)}</span><span class="tag">${esc(item.year)}</span></div>
      <h3>${esc(item.title)}</h3>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">
        <a class="btn btn-ghost btn-sm" href="https://www.youtube.com/watch?v=${item.yt}" target="_blank" rel="noopener">Watch on YouTube</a>
        <button class="btn btn-ghost btn-sm" data-share="${item.yt}">Copy link</button>
      </div>`);
    document.querySelector("[data-share]")?.addEventListener("click", e => copy(`https://www.youtube.com/watch?v=${e.currentTarget.dataset.share}`));
  }

  function mediaCard(item) {
    return `
      <article class="card media-card lift reveal" tabindex="0" role="button" data-yt="${item.yt}" aria-label="Play ${esc(item.title)}">
        <div class="thumb">
          <img src="${ytThumb(item.yt)}" alt="" loading="lazy">
          <span class="badge">${esc(item.category)}</span>
          <span class="play" aria-hidden="true">▶</span>
          <span class="duration">${esc(item.duration)}</span>
        </div>
        <h3>${esc(item.title)}</h3>
        <div class="meta"><span>${esc(item.year)}</span><span>·</span><span>Feedia / 2050 House</span></div>
      </article>`;
  }

  function bindMediaCards(scope) {
    scope.querySelectorAll("[data-yt]").forEach(el => {
      const item = F.media.find(m => m.yt === el.dataset.yt);
      const go = () => playVideo(item);
      el.addEventListener("click", go);
      el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
  }

  /* ---------- Misc helpers ---------- */
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); toast("Copied to clipboard"); }
    catch (e) { prompt("Copy this:", text); }
  }
  const parseDate = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fmtRange(ev) {
    const a = parseDate(ev.date);
    const opts = { month: "short", day: "numeric", year: "numeric" };
    if (!ev.end) return a.toLocaleDateString("en-US", { weekday: "short", ...opts });
    const b = parseDate(ev.end);
    return `${a.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${b.toLocaleDateString("en-US", opts)}`;
  }
  const today = () => { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); };
  const isPast = ev => parseDate(ev.end || ev.date) < today();
  const money = n => "$" + Math.round(n).toLocaleString("en-US");

  /* Opens the visitor's email app with a pre-filled message — works with no backend.
     To collect submissions server-side instead, set data-endpoint="https://formspree.io/f/xxxx" on the form. */
  function wireForm(form, subjectFn, after) {
    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = Object.fromEntries(new FormData(form).entries());
      const ref = getRef();
      if (ref && !data["Referral code"]) data["Referral code"] = ref;
      const endpoint = form.dataset.endpoint;
      if (endpoint) {
        try {
          const r = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(data) });
          if (!r.ok) throw new Error();
          toast("Thanks! We'll be in touch shortly.");
          form.reset(); after?.(data); return;
        } catch (err) { toast("Couldn't send. Opening your email app instead."); }
      }
      const body = Object.entries(data).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
      location.href = `mailto:${F.brand.email}?subject=${encodeURIComponent(subjectFn(data))}&body=${encodeURIComponent(body)}`;
      toast("Opening your email app…");
      after?.(data);
    });
  }

  /* ---------- Affiliate referral capture ----------
     Any page opened with ?ref=CODE remembers the code (30 days) and attaches it to form submissions. */
  function getRef() {
    try {
      const raw = store.get("feedia-ref"); if (!raw) return "";
      const { code, t } = JSON.parse(raw);
      return Date.now() - t < 30 * 864e5 ? code : "";
    } catch (e) { return ""; }
  }
  const refParam = new URLSearchParams(location.search).get("ref");
  if (refParam) {
    const code = refParam.toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 24);
    if (code) store.set("feedia-ref", JSON.stringify({ code, t: Date.now() }));
  }

  window.FeediaUI = { toast, openModal, closeModal, playVideo, mediaCard, bindMediaCards, ytThumb, ytEmbed, esc, copy, parseDate, fmtRange, isPast, today, money, MONTHS, observeReveal, wireForm, store, getRef };

  document.addEventListener("DOMContentLoaded", () => observeReveal());
  if (document.readyState !== "loading") observeReveal();
})();
