# Cemkc.github.io

Portfolio site for Cem Koç, served by GitHub Pages at https://cemkc.github.io.

Plain HTML, CSS and JavaScript. No build step: push to `main` and Pages serves it.

## Editing content

Everything shown on the site lives in [`data/projects.js`](data/projects.js).

- **Add a project:** add an object to an area's `projects` list. The comment at the top of the file lists the fields.
- **Add an area:** add an object to `areas` with an `id`, `label`, `tone` (`amber`, `cyan` or `violet`) and `projects`. A new tab appears for it automatically, linkable as `https://cemkc.github.io/#<id>`.
- **Email / CV:** set `profile.email` or `profile.cv` (e.g. `assets/Cem-Koc-CV.pdf`) and they show up in the header.
- **Screenshots:** put images in `assets/img/` and reference them with `image: "assets/img/name.png"`. Projects with a `youtube` id use the video thumbnail instead.

## Run locally

Open `index.html` in a browser, or run `python -m http.server` in this folder and visit http://localhost:8000.

## Direct links per area

- Game Development: https://cemkc.github.io/#game-dev
- Graphics Programming: https://cemkc.github.io/#graphics
- Other projects: https://cemkc.github.io/#other
