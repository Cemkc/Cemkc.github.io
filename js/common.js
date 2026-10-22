// Shared helpers for the home page (main.js) and project pages (project.js).
window.UI = (function () {
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

  /* ---------- Media ---------- */
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

  // Click-to-play YouTube player for project pages: a thumbnail until clicked, then a normal player with sound.
  function videoPlayer(project) {
    const id = project.youtube;
    const watchUrl = `https://www.youtube.com/watch?v=${id}`;
    const img = el("img", { src: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`, alt: `Video thumbnail for ${project.title}` });
    img.addEventListener("error", () => { img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }, { once: true });
    const canEmbed = location.protocol === "http:" || location.protocol === "https:";
    const button = el(canEmbed ? "button" : "a", canEmbed
      ? { class: "media player", type: "button", "aria-label": `Play ${project.title} video` }
      : { class: "media player", href: watchUrl, target: "_blank", rel: "noopener", "aria-label": `Watch ${project.title} on YouTube` },
      [img, el("span", { class: "play", html: playIcon })]);
    if (canEmbed) {
      button.addEventListener("click", () => {
        const frame = el("iframe", {
          src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`,
          title: `${project.title} video`,
          allow: "autoplay; encrypted-media; picture-in-picture; fullscreen",
          allowfullscreen: "",
          referrerpolicy: "strict-origin-when-cross-origin"
        });
        const box = el("div", { class: "media player playing" }, frame);
        button.replaceWith(box);
      });
    }
    return button;
  }

  // Link to a project's own page.
  function projectUrl(project) {
    return `project.html?id=${encodeURIComponent(project.id)}`;
  }

  // Finds a project and its area by id.
  function findProject(id) {
    for (const area of data.areas) {
      const index = area.projects.findIndex(p => p.id === id);
      if (index !== -1) return { area, project: area.projects[index], index };
    }
    return null;
  }

  return { data, $, el, media, liveMedia, videoPlayer, placeholder, playIcon, projectUrl, findProject };
})();
