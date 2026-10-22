(function () {
  const data = window.PORTFOLIO;
  const $ = (sel, root = document) => root.querySelector(sel);

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (value === null || value === undefined || value === false) continue;
      if (key === "text") node.textContent = value;
      else if (key === "html") node.innerHTML = value;
      else node.setAttribute(key, value);
    }
    for (const child of [].concat(children)) if (child) node.append(child);
    return node;
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    const p = data.profile;
    document.title = `${p.name} · Portfolio`;
    $("#hero-role").textContent = p.role;
    $("#hero-name").textContent = p.name;
    $("#hero-intro").textContent = p.intro;
    const links = $("#hero-links");
    if (p.cv) links.append(el("a", { class: "btn primary", href: p.cv, target: "_blank", rel: "noopener", text: "Download CV" }));
    for (const l of p.links) links.append(el("a", { class: "btn", href: l.url, target: "_blank", rel: "noopener", text: l.label }));
    if (p.email) {
      const mail = el("a", { class: "btn", href: `mailto:${p.email}`, text: p.email });
      const copy = el("button", { class: "btn copy", type: "button", text: "Copy email" });
      copy.addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(p.email); copy.textContent = "Copied"; }
        catch { copy.textContent = p.email; }
        setTimeout(() => (copy.textContent = "Copy email"), 1800);
      });
      links.append(mail, copy);
    }
  }

  /* ---------- Cards ---------- */
  const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 4l15 8-15 8z"/></svg>';

  function initials(title) {
    return title.replace(/\(.*?\)/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  }

  function placeholder(project) {
    return el("div", { class: "placeholder", "aria-hidden": "true" }, el("span", { text: initials(project.title) }));
  }

  // Muted, looping, chrome-less YouTube player that behaves like a GIF.
  // The iframe is only created once the card scrolls near the viewport.
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lazyVideos = "IntersectionObserver" in window
    ? new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          lazyVideos.unobserve(entry.target);
          entry.target.loadVideo();
        }
      }, { rootMargin: "200px" })
    : null;

  function liveMedia(project) {
    const id = project.youtube;
    const poster = el("img", {
      src: project.poster || `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      alt: project.imageAlt || `Gameplay from ${project.title}`,
      loading: "lazy"
    });
    poster.addEventListener("error", () => poster.replaceWith(placeholder(project)));
    const box = el("div", { class: "media live" }, [
      poster,
      el("a", { class: "badge sound", href: `https://www.youtube.com/watch?v=${id}`, target: "_blank", rel: "noopener", text: "Watch with sound ↗" })
    ]);
    box.loadVideo = () => {
      const params = new URLSearchParams({
        autoplay: 1, mute: 1, loop: 1, playlist: id, controls: 0,
        playsinline: 1, rel: 0, modestbranding: 1, iv_load_policy: 3, disablekb: 1
      });
      const frame = el("iframe", {
        src: `https://www.youtube-nocookie.com/embed/${id}?${params}`,
        title: `${project.title} gameplay video`,
        allow: "autoplay; encrypted-media; picture-in-picture",
        tabindex: "-1",
        referrerpolicy: "strict-origin-when-cross-origin",
        "aria-hidden": "true"
      });
      frame.addEventListener("load", () => setTimeout(() => box.classList.add("playing"), 600));
      box.insertBefore(frame, box.lastChild);
    };
    // YouTube rejects embeds from file:// pages (error 153), so keep the poster there.
    const canEmbed = location.protocol === "http:" || location.protocol === "https:";
    if (canEmbed && !reducedMotion) lazyVideos ? lazyVideos.observe(box) : box.loadVideo();
    return box;
  }

  function media(project) {
    if (project.youtube && project.autoplay) return liveMedia(project);
    if (project.youtube) {
      const url = `https://www.youtube.com/watch?v=${project.youtube}`;
      const img = el("img", {
        src: `https://img.youtube.com/vi/${project.youtube}/hqdefault.jpg`,
        alt: `Video thumbnail for ${project.title}`,
        loading: "lazy"
      });
      const link = el("a", { class: "media", href: url, target: "_blank", rel: "noopener", "aria-label": `Watch ${project.title} on YouTube` },
        [img, el("span", { class: "play", html: playIcon }), el("span", { class: "badge", text: "Video" })]);
      img.addEventListener("error", () => img.replaceWith(placeholder(project)));
      return link;
    }
    if (project.image) {
      const img = el("img", { src: project.image, alt: project.imageAlt || project.title, loading: "lazy" });
      img.addEventListener("error", () => img.replaceWith(placeholder(project)));
      return el("div", { class: "media" }, img);
    }
    return el("div", { class: "media" }, placeholder(project));
  }

  function card(project) {
    const meta = [project.team, project.role].filter(Boolean).join(" · ");
    const body = el("div", { class: "body" }, [
      el("div", { class: "card-head" }, [
        el("h3", { text: project.title }),
        project.year ? el("span", { class: "year", text: project.year }) : null
      ]),
      meta ? el("p", { class: "meta", text: meta }) : null,
      el("p", { class: "summary", text: project.summary }),
      project.metric ? el("div", { class: "metric" }, [el("b", { text: project.metric.value }), el("span", { text: project.metric.label })]) : null,
      project.highlights && project.highlights.length
        ? el("ul", { class: "highlights" }, project.highlights.map(h => el("li", { text: h })))
        : null,
      el("ul", { class: "tags", "aria-label": "Technologies" }, (project.tech || []).map(t => el("li", { text: t }))),
      el("div", { class: "links" },
        project.links && project.links.length
          ? project.links.map(l => el("a", { href: l.url, target: "_blank", rel: "noopener", text: l.label }))
          : el("span", { class: "private", text: "Closed source (studio project)" }))
    ]);
    const hasMedia = !!(project.youtube || project.image);
    return el("article", { class: "card" + (project.featured ? " featured" : "") + (hasMedia ? "" : " no-media") }, [media(project), body]);
  }

  /* ---------- Tabs & panels ---------- */
  const tabs = [];
  const panels = [];

  function renderAreas() {
    const tablist = $("#tablist");
    const main = $("#panels");
    data.areas.forEach(area => {
      const tab = el("button", {
        class: "tab", role: "tab", type: "button", id: `tab-${area.id}`,
        "aria-controls": `panel-${area.id}`, "aria-selected": "false", "data-tone": area.tone, tabindex: "-1"
      }, [area.label, el("span", { class: "count", text: String(area.projects.length) })]);
      tab.addEventListener("click", () => select(area.id, true));
      tab.addEventListener("keydown", onTabKey);
      tablist.append(tab);
      tabs.push(tab);

      const [first, ...rest] = area.label.split(" ");
      const panel = el("section", { class: "panel", id: `panel-${area.id}`, role: "tabpanel", "aria-labelledby": `tab-${area.id}`, "data-tone": area.tone, hidden: "" }, [
        el("div", { class: "panel-head" }, [
          el("div", {}, [
            el("h2", {}, [el("span", { text: first }), rest.length ? " " + rest.join(" ") : ""]),
            el("p", { class: "pitch", text: area.pitch })
          ]),
          el("ul", { class: "skills", "aria-label": "Skills" }, (area.skills || []).map(s => el("li", { text: s })))
        ]),
        el("div", { class: "grid" }, area.projects.map(card))
      ]);
      main.append(panel);
      panels.push(panel);
    });
  }

  function select(id, updateHash) {
    const index = Math.max(0, data.areas.findIndex(a => a.id === id));
    tabs.forEach((t, i) => {
      const on = i === index;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach((p, i) => (p.hidden = i !== index));
    document.querySelector(".tabs").dataset.tone = data.areas[index].tone;
    if (updateHash) history.replaceState(null, "", `#${data.areas[index].id}`);
  }

  function onTabKey(e) {
    const i = tabs.indexOf(e.currentTarget);
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    tabs[next].focus();
    select(data.areas[next].id, true);
  }

  /* ---------- Hero octree ---------- */
  function startOctree() {
    const canvas = $("#octree");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const CAPACITY = 3, MAX_DEPTH = 4, COUNT = 46;
    let rng = 7;
    const rand = () => ((rng = (rng * 16807) % 2147483647) / 2147483647);
    const points = Array.from({ length: COUNT }, () => ({
      p: [rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1].map(v => v * 0.9),
      v: [rand() - 0.5, rand() - 0.5, rand() - 0.5].map(v => v * 0.006)
    }));

    function build(cx, cy, cz, h, pts, depth, out) {
      out.nodes.push({ cx, cy, cz, h, depth });
      out.depth = Math.max(out.depth, depth);
      if (pts.length <= CAPACITY || depth >= MAX_DEPTH) {
        pts.forEach(pt => (pt.depth = depth));
        return;
      }
      const q = h / 2;
      for (let i = 0; i < 8; i++) {
        const nx = cx + (i & 1 ? q : -q), ny = cy + (i & 2 ? q : -q), nz = cz + (i & 4 ? q : -q);
        const inside = pts.filter(pt =>
          (pt.p[0] >= cx) === !!(i & 1) && (pt.p[1] >= cy) === !!(i & 2) && (pt.p[2] >= cz) === !!(i & 4));
        if (inside.length) build(nx, ny, nz, q, inside, depth + 1, out);
      }
    }

    let angle = 0.6;
    function project([x, y, z], w, hgt) {
      const ca = Math.cos(angle), sa = Math.sin(angle);
      const tilt = 0.42, ct = Math.cos(tilt), st = Math.sin(tilt);
      let X = x * ca - z * sa, Z = x * sa + z * ca;
      let Y = y * ct - Z * st; Z = y * st + Z * ct;
      const s = Math.min(w, hgt) * 0.27 * (3.2 / (3.2 + Z));
      return [w / 2 + X * s, hgt * 0.47 + Y * s];
    }

    const edges = [[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];
    function drawBox(n, w, hgt, color, alpha) {
      const c = [];
      for (let i = 0; i < 8; i++) c.push(project([n.cx + (i & 1 ? n.h : -n.h), n.cy + (i & 2 ? n.h : -n.h), n.cz + (i & 4 ? n.h : -n.h)], w, hgt));
      ctx.strokeStyle = color; ctx.globalAlpha = alpha; ctx.beginPath();
      for (const [a, b] of edges) { ctx.moveTo(c[a][0], c[a][1]); ctx.lineTo(c[b][0], c[b][1]); }
      ctx.stroke();
    }

    const hud = { nodes: $("#hud-nodes"), depth: $("#hud-depth"), points: $("#hud-points") };
    let frame = 0;

    function resize() {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function tick() {
      const styles = getComputedStyle(document.documentElement);
      const cyan = styles.getPropertyValue("--cyan").trim();
      const amber = styles.getPropertyValue("--amber").trim();
      const w = canvas.clientWidth, hgt = canvas.clientHeight;
      ctx.clearRect(0, 0, w, hgt);

      for (const pt of points) for (let k = 0; k < 3; k++) {
        pt.p[k] += pt.v[k];
        if (pt.p[k] > 0.95 || pt.p[k] < -0.95) pt.v[k] *= -1;
      }
      const tree = { nodes: [], depth: 0 };
      build(0, 0, 0, 1, points, 0, tree);

      ctx.lineWidth = 1;
      for (const n of tree.nodes) drawBox(n, w, hgt, cyan, n.depth === 0 ? 0.9 : 0.25 + 0.12 * n.depth);
      ctx.globalAlpha = 1;
      for (const pt of points) {
        const [x, y] = project(pt.p, w, hgt);
        ctx.fillStyle = pt.depth >= 3 ? amber : cyan;
        ctx.beginPath(); ctx.arc(x, y, pt.depth >= 3 ? 3 : 2.2, 0, Math.PI * 2); ctx.fill();
      }

      if (frame++ % 10 === 0) {
        hud.nodes.textContent = tree.nodes.length;
        hud.depth.textContent = tree.depth;
        hud.points.textContent = points.length;
      }
      angle += 0.0035;
      if (!reduced) requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", () => { resize(); if (reduced) tick(); });
    tick();
  }

  renderHero();
  renderAreas();
  const fromHash = location.hash.slice(1);
  select(data.areas.some(a => a.id === fromHash) ? fromHash : data.areas[0].id, false);
  window.addEventListener("hashchange", () => select(location.hash.slice(1), false));
  startOctree();
})();
