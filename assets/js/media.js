/* Media library: YouTube embeds with category filter, search and sort */
(function () {
  const F = window.FEEDIA, U = window.FeediaUI, esc = U.esc;
  const secs = d => d.split(":").reduce((t, n) => t * 60 + Number(n), 0);
  const state = { cat: "All", q: "", sort: "new" };

  // Featured player
  const feat = F.media.find(m => m.featured) || F.media[0];
  document.getElementById("featured").innerHTML = `
    <div class="player" style="margin:0"><iframe src="${U.ytEmbed(feat.yt)}" title="${esc(feat.title)}" loading="lazy" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe></div>
    <div>
      <span class="eyebrow">Featured</span>
      <h2 style="font-size:1.8rem">${esc(feat.title)}</h2>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px"><span class="tag brand">${esc(feat.category)}</span><span class="tag">${feat.duration}</span><span class="tag">${feat.year}</span></div>
      <a class="btn btn-ghost btn-sm" href="https://www.youtube.com/watch?v=${feat.yt}" target="_blank" rel="noopener">Watch on YouTube</a>
    </div>`;

  // Category chips (with counts)
  const cats = ["All", ...new Set(F.media.map(m => m.category))];
  const catEl = document.getElementById("media-cats");
  catEl.innerHTML = cats.map(c => {
    const n = c === "All" ? F.media.length : F.media.filter(m => m.category === c).length;
    return `<button class="chip ${c === "All" ? "active" : ""}" data-cat="${esc(c)}">${esc(c)} <span style="opacity:.7">${n}</span></button>`;
  }).join("");
  catEl.addEventListener("click", e => {
    const b = e.target.closest("[data-cat]"); if (!b) return;
    state.cat = b.dataset.cat;
    catEl.querySelectorAll(".chip").forEach(x => x.classList.toggle("active", x === b));
    render();
  });
  document.getElementById("media-search").addEventListener("input", e => { state.q = e.target.value.trim().toLowerCase(); render(); });
  document.getElementById("media-sort").addEventListener("change", e => { state.sort = e.target.value; render(); });

  function render() {
    let list = F.media.map((m, i) => ({ ...m, _i: i }))
      .filter(m => state.cat === "All" || m.category === state.cat)
      .filter(m => !state.q || (m.title + " " + m.category).toLowerCase().includes(state.q));
    const by = {
      new: (a, b) => b.year - a.year || a._i - b._i,
      old: (a, b) => a.year - b.year || b._i - a._i,
      long: (a, b) => secs(b.duration) - secs(a.duration),
      short: (a, b) => secs(a.duration) - secs(b.duration)
    };
    list.sort(by[state.sort]);
    document.getElementById("media-count").textContent = `${list.length} video${list.length === 1 ? "" : "s"}`;
    const grid = document.getElementById("media-grid");
    grid.innerHTML = list.length ? list.map(U.mediaCard).join("") : `<div class="empty" style="grid-column:1/-1">No videos match “${esc(state.q)}”.</div>`;
    U.bindMediaCards(grid);
    U.observeReveal(grid);
  }
  render();
})();
