/* Invest & Sponsor: tiers, open events, rewards calculator, link builder, application */
(function () {
  const F = window.FEEDIA, U = window.FeediaUI, esc = U.esc, $ = id => document.getElementById(id);
  const tiers = F.tiers;
  const openEvents = F.events.filter(e => e.sponsorable && !U.isPast(e)).sort((a, b) => a.date.localeCompare(b.date));

  /* Tiers */
  $("tier-grid").innerHTML = tiers.map(t => `
    <div class="card tier reveal ${t.featured ? "featured" : ""}">
      ${t.featured ? '<span class="ribbon">Most popular</span>' : ""}
      <h3>${t.name}</h3>
      <div class="price">${U.money(t.price)} <small>/ event</small></div>
      <div class="reward-rate">${t.rewardRate}% <span style="font-weight:500">back on referred tickets</span></div>
      <ul>${t.perks.map(p => `<li>${esc(p)}</li>`).join("")}<li>${t.sponsorBonus}% bonus on sponsors you refer</li></ul>
      <a class="btn ${t.featured ? "btn-primary" : "btn-ghost"} btn-block" href="#apply" data-pick-tier="${t.id}">Choose ${t.name}</a>
    </div>`).join("");

  /* Open events */
  $("open-events").innerHTML = openEvents.length ? openEvents.map(ev => {
    const d = U.parseDate(ev.date), cat = F.categories[ev.category];
    return `<div class="card event-item reveal ${ev.tentative ? "tentative" : ""}">
      <div class="date-chip"><span class="m">${U.MONTHS[d.getMonth()]}</span><span class="d">${d.getDate()}</span></div>
      <div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:6px"><span class="tag" style="color:${cat.color}">${cat.label}</span>${ev.tentative ? `<span class="tag">${U.esc(ev.status || "Dates TBC")}</span>` : ""}</div>
        <h3 style="margin:0 0 4px">${esc(ev.title)}</h3>
        <div class="event-meta"><span>📅 ${U.fmtRange(ev)}</span><span>📍 ${esc(ev.location)}</span></div>
      </div>
      <a class="btn btn-primary btn-sm" href="#apply" data-pick-event="${ev.id}">Sponsor</a>
    </div>`;
  }).join("") : `<div class="empty">New sponsorship opportunities are coming soon. <a class="link-arrow" href="#apply">Register interest</a></div>`;

  /* Calculator */
  const tierOpts = tiers.map(t => `<option value="${t.id}">${t.name} (${U.money(t.price)})</option>`).join("");
  $("calc-tier").innerHTML = tierOpts;
  $("calc-sponsor-tier").innerHTML = tierOpts;
  $("calc-tier").value = (tiers.find(t => t.featured) || tiers[0]).id;
  $("calc-sponsor-tier").value = tiers[0].id;
  function calc() {
    const t = tiers.find(x => x.id === $("calc-tier").value);
    const st = tiers.find(x => x.id === $("calc-sponsor-tier").value);
    const tickets = +$("calc-tickets").value, price = +$("calc-price").value, sponsors = +$("calc-sponsors").value;
    const rev = tickets * price;
    const ticketReward = rev * t.rewardRate / 100;
    const bonus = sponsors * st.price * t.sponsorBonus / 100;
    const total = ticketReward + bonus;
    const offset = Math.min(100, total / t.price * 100);
    $("out-tickets").textContent = tickets.toLocaleString();
    $("out-price").textContent = U.money(price);
    $("out-sponsors").textContent = sponsors;
    $("out-rev").textContent = U.money(rev);
    $("out-rate").textContent = t.rewardRate + "%";
    $("out-ticket-reward").textContent = U.money(ticketReward);
    $("out-bonus").textContent = U.money(bonus);
    $("out-cost").textContent = U.money(t.price);
    $("out-total").textContent = U.money(total);
    $("out-offset").textContent = (total / t.price * 100).toFixed(0) + "%";
    $("out-bar").style.width = offset + "%";
  }
  ["calc-tier", "calc-tickets", "calc-price", "calc-sponsors", "calc-sponsor-tier"].forEach(id => $(id).addEventListener("input", calc));
  calc();

  /* Terms table */
  $("terms-body").innerHTML = tiers.map(t => `<tr><td><strong>${t.name}</strong></td><td>${U.money(t.price)}</td><td>${t.rewardRate}% of referred ticket revenue</td><td>${t.sponsorBonus}% of referred sponsorship</td><td>Within 30 days after the event</td></tr>`).join("");

  /* Link builder */
  const base = location.href.split(/[?#]/)[0].replace(/[^/]*$/, "");
  const targets = [
    { label: "Event calendar", path: "events.html" },
    { label: "Sponsorship page", path: "invest.html" },
    { label: "Homepage", path: "index.html" },
    ...openEvents.map(e => ({ label: e.title, path: "events.html", hash: e.id }))
  ];
  $("ref-target").innerHTML = targets.map((t, i) => `<option value="${i}">${esc(t.label)}</option>`).join("");
  const clean = s => s.toUpperCase().replace(/[^A-Z0-9_-]/g, "");
  function buildLink() {
    const code = clean($("ref-code").value);
    $("ref-code").value = code;
    const t = targets[+$("ref-target").value];
    $("ref-out").value = code ? `${base}${t.path}?ref=${encodeURIComponent(code)}${t.hash ? "#" + t.hash : ""}` : "";
    $("ref-out").placeholder = "Enter your code to generate a link";
  }
  $("ref-code").addEventListener("input", buildLink);
  $("ref-target").addEventListener("change", buildLink);
  $("ref-copy").addEventListener("click", () => $("ref-out").value ? U.copy($("ref-out").value) : U.toast("Enter your affiliate code first"));
  buildLink();

  /* Application form */
  $("s-tier").innerHTML = tierOpts;
  $("s-tier").value = (tiers.find(t => t.featured) || tiers[0]).id;
  $("s-event").innerHTML = openEvents.map(e => `<option value="${esc(e.title)}" data-id="${e.id}">${esc(e.title)}</option>`).join("") + `<option value="Multiple / not sure yet">Multiple / not sure yet</option>`;
  const params = new URLSearchParams(location.search);
  const preEvent = params.get("event");
  if (preEvent) { const o = [...$("s-event").options].find(o => o.dataset.id === preEvent); if (o) o.selected = true; }
  const ref = U.getRef();
  if (ref) $("s-ref").value = ref;

  document.addEventListener("click", e => {
    const t = e.target.closest("[data-pick-tier]"); if (t) $("s-tier").value = t.dataset.pickTier;
    const ev = e.target.closest("[data-pick-event]");
    if (ev) { const o = [...$("s-event").options].find(o => o.dataset.id === ev.dataset.pickEvent); if (o) o.selected = true; }
  });

  U.wireForm($("sponsor-form"), d => `Sponsorship application: ${d.Company} (${(tiers.find(t => t.id === d.Tier) || {}).name || d.Tier})`);
  U.observeReveal();
})();
