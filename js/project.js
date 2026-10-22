(function () {
  const { data, $, el, liveMedia, videoPlayer, findProject, projectUrl } = window.UI;
  const root = $("#project");

  const id = new URLSearchParams(location.search).get("id");
  const found = id && findProject(id);

  if (!found) {
    document.title = `Project not found · ${data.profile.name}`;
    root.append(el("div", { class: "not-found" }, [
      el("h1", { text: "Project not found" }),
      el("p", {}, ["This link doesn't match a project. ", el("a", { href: "index.html", text: "See all projects" }), "."])
    ]));
    return;
  }

  const { area, project, index } = found;
  const page = project.page || {};
  document.title = `${project.title} · ${data.profile.name}`;
  document.body.dataset.tone = area.tone;
  $("#back-link").href = `index.html#${area.id}`;
  $("#back-name").textContent = data.profile.name;
  $("#topbar-area").textContent = area.label;

  /* ---------- Header ---------- */
  const meta = [project.team, project.role].filter(Boolean).join(" · ");
  root.append(el("header", { class: "project-head" }, [
    el("p", { class: "eyebrow area-eyebrow", text: [area.label, project.year].filter(Boolean).join(" · ") }),
    el("h1", { text: project.title }),
    meta ? el("p", { class: "meta", text: meta }) : null,
    el("p", { class: "lead", text: project.summary }),
    links(project)
  ]));

  /* ---------- Hero media ---------- */
  const hero = heroMedia(project);
  if (hero) root.append(el("div", { class: "project-hero" }, hero));

  /* ---------- Contribution overview ---------- */
  // Pages without their own facts fall back to the card's metric.
  const facts = page.facts || (project.metric ? [{ label: project.metric.label, value: project.metric.value }] : []);
  root.append(el("section", { class: "overview", "aria-labelledby": "contribution" }, [
    el("div", { class: "overview-text" }, [
      el("h2", { id: "contribution", text: "My contribution" }),
      el("p", { text: page.intro || project.summary }),
      !page.intro && project.highlights && project.highlights.length
        ? el("ul", { class: "highlights" }, project.highlights.map(h => el("li", { text: h })))
        : null
    ]),
    facts.length
      ? el("dl", { class: "facts" }, facts.flatMap(f => [el("dt", { text: f.label }), el("dd", { text: f.value })]))
      : null
  ]));

  /* ---------- Sections ---------- */
  for (const s of page.sections || []) {
    root.append(el("section", { class: "block" }, [
      el("h2", { text: s.title }),
      s.text ? el("p", { text: s.text }) : null,
      s.bullets ? el("ul", { class: "highlights" }, s.bullets.map(b => el("li", { text: b }))) : null,
      s.code ? codeBlock(s.code) : null,
      s.image ? figure(s.image, s.imageAlt, s.caption) : null
    ]));
  }

  if (page.lessons) {
    root.append(el("section", { class: "block lessons" }, [
      el("h2", { text: "What I learned" }),
      el("p", { text: page.lessons })
    ]));
  }

  if (page.note) root.append(el("p", { class: "note", text: page.note }));

  if (page.gallery && page.gallery.length) {
    const grid = el("div", { class: "gallery" });
    const section = el("section", { class: "block" }, [el("h2", { text: "Screenshots" }), grid]);
    for (const g of page.gallery) {
      const img = el("img", { src: g.src, alt: g.alt || project.title, loading: "lazy" });
      // Drop images that fail to load, and the whole section if none are left.
      img.addEventListener("error", () => {
        img.closest("a")?.remove();
        if (!grid.children.length) section.remove();
      });
      grid.append(el("a", { href: g.src, target: "_blank", rel: "noopener" }, img));
    }
    root.append(section);
  }

  root.append(el("section", { class: "block stack" }, [
    el("h2", { text: "Tech" }),
    el("ul", { class: "tags" }, (project.tech || []).map(t => el("li", { text: t })))
  ]));

  /* ---------- Previous / next ---------- */
  const prev = area.projects[index - 1];
  const next = area.projects[index + 1];
  root.append(el("nav", { class: "pager", "aria-label": "More projects" }, [
    prev ? el("a", { class: "prev", href: projectUrl(prev) }, [el("span", { text: "← Previous" }), el("b", { text: prev.title })]) : el("span"),
    next ? el("a", { class: "next", href: projectUrl(next) }, [el("span", { text: "Next →" }), el("b", { text: next.title })]) : el("span")
  ]));

  /* ---------- Helpers ---------- */
  function links(p) {
    const items = (p.links || []).map(l => el("a", { class: "btn", href: l.url, target: "_blank", rel: "noopener", text: `${l.label} ↗` }));
    if (!items.length) items.push(el("span", { class: "private", text: "Closed source" }));
    return el("div", { class: "head-links" }, items);
  }

  function heroMedia(p) {
    if (p.youtube && p.autoplay) return liveMedia(p);
    if (p.youtube) return videoPlayer(p);
    if (p.image) return el("div", { class: "media" }, el("img", { src: p.image, alt: p.imageAlt || p.title }));
    return null;
  }

  function codeBlock(code) {
    return el("figure", { class: "code" }, [
      el("figcaption", { text: code.file }),
      el("pre", { tabindex: "0" }, el("code", { class: code.lang ? `language-${code.lang}` : null, text: code.source }))
    ]);
  }

  function figure(src, alt, caption) {
    return el("figure", { class: "shot" }, [
      el("img", { src, alt: alt || "", loading: "lazy" }),
      caption ? el("figcaption", { text: caption }) : null
    ]);
  }
})();
