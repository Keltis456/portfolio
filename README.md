# Portfolio — Mykyta Brik

Personal portfolio site for a Unity Team Lead with 8+ years in game development.

**Live site:** https://keltis456.github.io/portfolio/

## Run locally

The site is static. Serve the folder over HTTP so the CV download and media paths resolve.

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173.

## Layout

| Path | Contents |
| --- | --- |
| `index.html` | All page sections: hero, about, experience, projects, education, contact |
| `styles.css` | Design tokens in `:root`, section styles, responsive rules at 768px and 480px |
| `script.js` | Scroll effects, IntersectionObserver reveals, and the `Carousel` class |
| `media/<project>/` | Screenshots for one project, loaded by the carousels |
| `cv/` | CV PDF linked from the hero |

## Projects on the page

- **Match Dreams: Puzzle Adventure** — Match3 game with meta progression (Clever Duck, Moon Active)
- **Funny Food** — educational series with 40M+ combined downloads (Bini Bambini)
- **Shedry Dar** — AR/XR game for commercial campaigns
- **Discolored** — Nintendo Switch port of a first-person puzzle adventure
- **AI-Driven Motion Artist Tools** — generative agent tooling for a 200-artist pipeline
- **Additional Console Ports** and **Hyper-Casual Pipeline**

## Adding a project

1. Create `media/<project-slug>/` and put the screenshots there.
2. Copy an existing `.project-card` block in `index.html`.
3. Point each `.carousel-image` at a new screenshot and add one `.indicator` button per image.
4. Mark the first `.carousel-image` and the first `.indicator` as `active`.

`script.js` picks up the new carousel on load. No build step runs.

## Deployment

GitHub Pages serves the `master` branch from the repository root. A push to `master` publishes the site.
