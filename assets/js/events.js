/* Event calendar: month grid + list, filters, .ics export, detail modal */
(function () {
  const F = window.FEEDIA, U = window.FeediaUI, esc = U.esc;
  const state = { view: "month", when: "upcoming", cats: new Set(Object.keys(F.categories)), cursor: null };

  const events = F.events.slice().sort((a, b) => a.date.localeCompare(b.date));
  const nextUp = events.find(e => !U.isPast(e));
  const start = nextUp ? U.parseDate(nextUp.date) : U.today();
  state.cursor = new Date(start.getFullYear(), start.getMonth(), 1);

  /* ---- filters ---- */
  const catWrap = document.getElementById("cat-filters");
  catWrap.innerHTML = Object.entries(F.categories).map(([k, c]) =>
    `<button class="chip active" data-cat="${k}" aria-pressed="true"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${c.color};margin-right:6px"></span>${c.label}</button>`).join("");
  catWrap.addEventListener("click", e => {
    const b = e.target.closest("[data-cat]"); if (!b) return;
    const k = b.dataset.cat;
    state.cats.has(k) ? state.cats.delete(k) : state.cats.add(k);
    b.classList.toggle("active"); b.setAttribute("aria-pressed", state.cats.has(k));
    render();
  });
  document.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => {
    state.view = b.dataset.view;
    document.querySelectorAll("[data-view]").forEach(x => { x.classList.toggle("active", x === b); x.setAttribute("aria-selected", x === b); });
    render();
  }));
  document.querySelectorAll("[data-when]").forEach(b => b.addEventListener("click", () => {
    state.when = b.dataset.when;
    document.querySelectorAll("[data-when]").forEach(x => x.classList.toggle("active", x === b));
    render();
  }));
  document.getElementById("prev").onclick = () => { state.cursor.setMonth(state.cursor.getMonth() - 1); render(); };
  document.getElementById("next").onclick = () => { state.cursor.setMonth(state.cursor.getMonth() + 1); render(); };
  document.getElementById("today-btn").onclick = () => { const t = U.today(); state.cursor = new Date(t.getFullYear(), t.getMonth(), 1); render(); };

  const visible = () => events.filter(e => state.cats.has(e.category) && (
    state.when === "all" || (state.when === "past" ? U.isPast(e) : !U.isPast(e))));

  /* ---- month view ---- */
  function renderMonth() {
    const c = state.cursor, y = c.getFullYear(), m = c.getMonth();
    document.getElementById("cal-title").textContent = c.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const first = new Date(y, m, 1), gridStart = new Date(y, m, 1 - first.getDay());
    const list = events.filter(e => state.cats.has(e.category)); // month grid always shows past + future
    const t = U.today().getTime();
    let html = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => `<div class="cal-dow">${d}</div>`).join("");
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i);
      if (i === 35 && d.getMonth() !== m) break; // drop an empty sixth row
      const dayEvents = list.filter(e => { const a = U.parseDate(e.date), b = e.end ? U.parseDate(e.end) : a; return d >= a && d <= b; });
      html += `<div class="cal-cell ${d.getMonth() !== m ? "other" : ""} ${d.getTime() === t ? "today" : ""}">
        <span class="num">${d.getDate()}</span>
        ${dayEvents.map(e => `<button class="cal-event" data-ev="${e.id}" style="background:${F.categories[e.category].color}${U.isPast(e) ? ";opacity:.55" : ""}" title="${esc(e.title)}">${esc(e.title)}</button>`).join("")}
      </div>`;
    }
    document.getElementById("cal-grid").innerHTML = html;
  }

  /* ---- list view ---- */
  function renderList() {
    let list = visible();
    if (state.when === "past") list = list.reverse();
    document.getElementById("list-view").innerHTML = list.length ? list.map(eventRow).join("") :
      `<div class="empty">No events match these filters.${state.when === "upcoming" ? " Check <b>Past</b> to see previous events." : ""}</div>`;
  }
  function eventRow(ev) {
    const d = U.parseDate(ev.date), cat = F.categories[ev.category];
    return `<article class="card event-item ${ev.tentative ? "tentative" : ""}" id="${ev.id}">
      <div class="date-chip"><span class="m">${U.MONTHS[d.getMonth()]}</span><span class="d">${d.getDate()}</span></div>
      <div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:6px">
          <span class="tag" style="color:${cat.color}">${cat.label}</span>
          ${ev.tentative ? '<span class="tag">Dates TBC</span>' : ""}
          ${U.isPast(ev) ? '<span class="tag">Past</span>' : ""}
          ${ev.sponsorable && !U.isPast(ev) ? '<span class="tag green">Sponsorships open</span>' : ""}
        </div>
        <h3 style="margin:0 0 4px">${esc(ev.title)}</h3>
        <div class="event-meta"><span>📅 ${U.fmtRange(ev)}</span>${ev.time ? `<span>🕒 ${esc(ev.time)}</span>` : ""}<span>📍 ${esc(ev.location)}</span></div>
      </div>
      <button class="btn btn-ghost btn-sm" data-ev="${ev.id}">Details</button>
    </article>`;
  }

  function render() {
    const month = state.view === "month";
    document.getElementById("month-view").hidden = !month;
    document.getElementById("list-view").hidden = month;
    document.querySelectorAll("[data-when]").forEach(b => b.parentElement.style.display = month ? "none" : "");
    month ? renderMonth() : renderList();
  }

  /* ---- detail modal ---- */
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-ev]"); if (!b) return;
    openEvent(events.find(x => x.id === b.dataset.ev));
  });
  function openEvent(ev) {
    const cat = F.categories[ev.category], past = U.isPast(ev);
    const video = ev.video ? F.media.find(m => m.yt === ev.video) : null;
    U.openModal(`
      ${video ? `<div class="player"><iframe src="${U.ytEmbed(ev.video)}" title="${esc(video.title)}" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe></div>` : ""}
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
        <span class="tag" style="color:${cat.color}">${cat.label}</span>
        ${ev.tentative ? '<span class="tag">Dates TBC</span>' : ""}${past ? '<span class="tag">Past event</span>' : ""}
      </div>
      <h2 style="font-size:1.8rem">${esc(ev.title)}</h2>
      <div class="event-meta" style="margin-bottom:14px"><span>📅 ${U.fmtRange(ev)}</span>${ev.time ? `<span>🕒 ${esc(ev.time)}</span>` : ""}<span>📍 ${esc(ev.location)}</span></div>
      <p class="muted">${esc(ev.description)}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:18px">
        ${!past ? `<button class="btn btn-primary btn-sm" data-ics="${ev.id}">⬇ Add to calendar (.ics)</button>
                   <a class="btn btn-ghost btn-sm" target="_blank" rel="noopener" href="${gcal(ev)}">Google Calendar</a>
                   <a class="btn btn-ghost btn-sm" href="mailto:${F.brand.email}?subject=${encodeURIComponent("RSVP: " + ev.title)}">RSVP</a>` : ""}
        ${ev.sponsorable && !past ? `<a class="btn btn-ghost btn-sm" href="invest.html?event=${ev.id}#apply">Sponsor this event</a>` : ""}
        <button class="btn btn-ghost btn-sm" data-copy="${ev.id}">Copy link</button>
      </div>`);
    history.replaceState(null, "", "#" + ev.id);
  }
  document.addEventListener("click", e => {
    const i = e.target.closest("[data-ics]"); if (i) downloadICS([events.find(x => x.id === i.dataset.ics)], i.dataset.ics);
    const c = e.target.closest("[data-copy]"); if (c) U.copy(location.href.split("#")[0] + "#" + c.dataset.copy);
  });
  document.getElementById("ics-all").onclick = () => downloadICS(events.filter(e => !U.isPast(e)), "feedia-events");

  /* ---- calendar export ---- */
  const ymd = s => s.replace(/-/g, "");
  const plusDay = s => { const d = U.parseDate(s); d.setDate(d.getDate() + 1); return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`; };
  function gcal(ev) {
    const p = new URLSearchParams({ action: "TEMPLATE", text: ev.title, dates: `${ymd(ev.date)}/${plusDay(ev.end || ev.date)}`, details: `${ev.description}${ev.time ? "\nTime: " + ev.time : ""}`, location: ev.location });
    return "https://calendar.google.com/calendar/render?" + p;
  }
  function icsEscape(s) { return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
  function downloadICS(list, name) {
    const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const body = list.map(ev => [
      "BEGIN:VEVENT", `UID:${ev.id}@thefeedia.com`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${ymd(ev.date)}`, `DTEND;VALUE=DATE:${plusDay(ev.end || ev.date)}`,
      `SUMMARY:${icsEscape(ev.title)}`, `LOCATION:${icsEscape(ev.location)}`,
      `DESCRIPTION:${icsEscape(ev.description + (ev.time ? "\nTime: " + ev.time : "") + (ev.tentative ? "\nDates to be confirmed." : ""))}`,
      "END:VEVENT"].join("\r\n")).join("\r\n");
    const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Feedia//Events//EN\r\nCALSCALE:GREGORIAN\r\n${body}\r\nEND:VCALENDAR\r\n`;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = name + ".ics"; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    U.toast("Calendar file downloaded");
  }

  render();
  const hashEv = events.find(e => "#" + e.id === location.hash);
  if (hashEv) openEvent(hashEv);
})();
