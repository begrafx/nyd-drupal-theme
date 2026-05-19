# NydCSS Theme for Drupal 11

A full-featured, production-ready Drupal 11 theme built on the
[NydCSS](https://github.com/begrafx/nydcss) framework — a modern,
composable, utility-first stylesheet that synthesises the best of
Tailwind, Bootstrap, Bulma, and more.

---

## Features

| Feature | Details |
|---|---|
| **CSS Framework** | NydCSS (ships in `dist/nyd.min.css`) |
| **Typography** | Playfair Display (headings) + DM Sans (body) via Google Fonts |
| **Color system** | Deep navy primary, amber accent, full dark-mode support |
| **Hero region** | Full-bleed, with decorative gradients + staggered animation |
| **Sidebars** | Left, Right, or Both — CSS Grid, collapses to single column on mobile |
| **Header** | Sticky + glassmorphism blur, auto-shadow on scroll |
| **Mobile menu** | Animated hamburger, full-height drawer, focus-trap & Escape key support |
| **Footer** | 4-column grid, collapses to 2-col → 1-col |
| **Dark mode** | `prefers-color-scheme` auto + `[data-theme]` override |
| **Accessibility** | Skip link, ARIA roles, keyboard nav, focus rings, `prefers-reduced-motion` |
| **Drupal compat** | Admin toolbar offset, local tasks tabs, contextual links |

---

## Directory Structure

```
nyd/
├── nyd.info.yml          # Theme metadata, regions, features
├── nyd.libraries.yml     # CSS/JS library definitions
├── nyd.theme             # PHP preprocess + theme suggestions
├── logo.svg              # Default logo (replace with yours)
├── screenshot.png        # Theme screenshot (add a 588×438px PNG)
│
├── dist/
│   └── nyd.min.css       # NydCSS compiled output (80 KB)
│
├── css/
│   ├── nyd.theme.css     # Theme overrides, layout, components
│   └── nyd.toolbar.css   # Admin toolbar spacing fix
│
├── js/
│   └── nyd.behaviors.js  # Drupal behaviors (menu, sticky, a11y)
│
└── templates/
    ├── html.html.twig
    ├── page.html.twig
    ├── page--front.html.twig
    ├── node.html.twig
    ├── block.html.twig
    ├── menu.html.twig
    ├── breadcrumb.html.twig
    ├── status-messages.html.twig
    ├── pager.html.twig
    ├── field.html.twig
    ├── form-element.html.twig
    ├── input.html.twig
    ├── views-view.html.twig
    └── views-view-unformatted.html.twig
```

---

## Installation

1. Place the `nyd/` folder in `web/themes/custom/nyd/`.
2. Enable: `drush theme:enable nyd && drush config:set system.theme default nyd -y`
3. Clear caches: `drush cr`
4. (Optional) Place blocks in the new regions via **Appearance → Block Layout**.

---

## Regions

| Region ID | Label | Location |
|---|---|---|
| `header` | Header | Sticky header — secondary blocks (e.g. search) |
| `primary_menu` | Primary Menu | Desktop navbar + mobile drawer |
| `secondary_menu` | Secondary Menu | Header right — account/utility links |
| `hero` | Hero | Full-bleed section below header |
| `highlighted` | Highlighted | Status messages / alert bar |
| `help` | Help | Contextual admin help |
| `breadcrumb` | Breadcrumb | Above main content |
| `content` | Content | Main content column |
| `sidebar_first` | Sidebar First | Left sidebar |
| `sidebar_second` | Sidebar Second | Right sidebar |
| `content_bottom` | Content Bottom | Full-width strip below content |
| `footer_first` | Footer First | Footer column 1 |
| `footer_second` | Footer Second | Footer column 2 |
| `footer_third` | Footer Third | Footer column 3 |
| `footer_fourth` | Footer Fourth | Footer column 4 |
| `footer_bottom` | Footer Bottom | Copyright bar |

---

## Customisation

### Override design tokens

In your own `css/custom.css` (add to `nyd.libraries.yml`):

```css
:root {
  /* Swap primary to your brand color */
  --nyd-color-primary:       #7c3aed;
  --nyd-color-primary-hover: #6d28d9;
  --nyd-color-primary-light: #ede9fe;

  /* Change accent */
  --nyd-color-accent:       #ec4899;
  --nyd-color-accent-hover: #db2777;

  /* Change hero gradient */
  --nyd-hero-bg: linear-gradient(135deg, #1a0533 0%, #3b0764 100%);

  /* Sidebar width */
  --nyd-sidebar-width: 300px;
}
```

### Hero variants

Add classes to the hero region wrapper via a custom block:

| Class | Effect |
|---|---|
| *(default)* | Gradient, min 520 px |
| `site-hero--compact` | Reduced height (240 px), interior pages |
| `site-hero--image` | Expects `background-image` inline style, adds dark overlay |

### Dark / light mode toggle

Add a button anywhere with `data-nyd-theme-toggle` and the JS behavior
handles the rest, storing the user preference in `localStorage`.

---

## NydCSS Utility Classes

NydCSS ships hundreds of utility classes that work inside any template.
Some highlights:

```html
<!-- Cards -->
<div class="card card-elevated">
  <div class="card-body">…</div>
</div>

<!-- Badges -->
<span class="badge badge-pill badge-primary">New</span>

<!-- Alert -->
<div class="alert alert-warning">
  <div class="alert-content">Watch out!</div>
</div>

<!-- Button -->
<button class="btn btn-primary btn-lg">Get Started</button>

<!-- Grid -->
<div class="auto-grid-md">…</div>

<!-- Stack rhythm -->
<div class="stack-6">…</div>
```

Full reference: https://github.com/begrafx/nydcss / `dist/nyd.css`

---

## Browser Support

All evergreen browsers. IE 11 is **not** supported (CSS custom properties).

---

## License

Custom theme code — MIT. NydCSS — see its own license.
