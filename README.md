# Portfolio — Akhil Elango

Static site: plain HTML, CSS and JavaScript. No build step; open `index.html` in a browser or deploy the folder to GitHub Pages / Netlify.

## Structure

```
index.html            Home: summary, key facts, tech stack, education
experience.html       Work experience
projects.html         Projects and research index
contact.html          Email, LinkedIn
projects/*.html       One deep-dive page per project (6 sections each)

css/base.css          Design tokens (colours, type, spacing), reset
css/layout.css        Header, footer, containers, section grid
css/components.css    Buttons, tags, lists, reveal animation
css/pages/*.css       Styles used by a single page

js/site.js            Shared header/footer, contact links, animations
js/project.js         "On this page" highlighting on deep-dive pages
assets/               Photo, favicon, diagrams
```

## Editing

- **Photo:** add `assets/photo.jpg` (portrait, about 4:5). Initials show until it exists.
- **LinkedIn / email:** set once in `SITE` at the top of `js/site.js`.
- **Navigation:** the `NAV` list in `js/site.js`.
- **Colours and fonts:** the `:root` tokens in `css/base.css`.
- **Deep dives:** replace each `<div class="placeholder">` in `projects/*.html`. Each section has a comment describing what goes there. For the architecture figure, drop an image into `assets/` and swap it for `.diagram__frame`. For baseline numbers, use `<table class="results">`.

## Adding a project

1. Copy any file in `projects/` and rename it.
2. Update the title, label, kicker and summary at the top, and the previous/next links at the bottom.
3. Add a row to `projects.html`.
