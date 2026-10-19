# Morphlet website

A standalone marketing website for Morphlet, with alternating light/dark sections inspired by the Pihu OS website. The Pihu OS project is unchanged.

## Local preview

```sh
npm run dev
```

Open http://127.0.0.1:4173. Set `PORT` to use another port. No dependency installation or build step is needed. All deployable files live in `dist/`.

## Included

- Interactive quick-wheel preview, clearly labelled as a demonstration.
- Studio showcase with real app screenshots and dark/light preview controls.
- AI-ready PDF bundle walkthrough and privacy information.
- Platform download links to GitHub Releases and an accessible FAQ.
- Responsive layouts, keyboard controls and reduced-motion support.

Product claims reflect the desktop application's current documented capabilities. SVG/PNG app icons are from Morphlet; Studio captures use a generated sample document. System fonts and local assets avoid external font/image dependencies.

Developed by Mayank Jha.

## Pages and releases

- `/features.html`: categorized conversion guide and supported desktop/PDF features.
- `/download.html`: direct installers, architecture/package choices, file sizes and checksum links.
- `/releases.html`: platform tabs, installation steps, published release notes and expandable history inspired by the Pihu OS release-page layout.

Release pages load a checked-in snapshot of public GitHub metadata, then refresh from GitHub’s public API when available. A failed live refresh keeps the snapshot usable. No GitHub credentials are sent to visitors. Update `dist/assets/releases.json` to refresh the fallback snapshot.

The dark logo for light backgrounds is available as `dist/assets/morphlet-dark.svg` and `dist/assets/morphlet-dark.png`. `dist/assets/logo-preview.png` is a presentation preview on a light background.

Platform logos use the Devicon SVG collection; the source license is included in `dist/assets/platforms/LICENSE.txt`. Apple, Windows and Linux marks identify the supported platforms.

## Production website

Designed and developed by **Mayank Kumar Jha**. Canonical website: https://morphlet.nfks.co.in.

The website uses static HTML for crawlable page content, lightweight JavaScript for interactive wheels and category filters, and a live GitHub release feed with a bundled fallback. It requires no framework, account, conversion uploads or browser-side processing service. Wheels support pointer, touch, scroll and keyboard input, with opt-in synthesized sound and reduced-motion support.

Each primary page includes unique search descriptions, canonical links, Open Graph / Twitter cards and JSON-LD author, website and page metadata. The homepage also identifies the desktop software; inner pages include breadcrumbs. `dist/robots.txt`, `dist/sitemap.xml` and a custom 404 page support discoverability. Search ranking and indexing are controlled by search engines; no ranking guarantee is implied.

### GitHub Pages deployment

Push to `main` to validate and deploy `dist/` using `.github/workflows/pages.yml`. Pull requests run validation without deploying. In repository Settings → Pages, select **GitHub Actions** and set the custom domain to **morphlet.nfks.co.in**. The domain setting is required even though a CNAME file is included for portability.

At the DNS provider create a **CNAME** record: host **morphlet**, target **the-mayankjha.github.io** (no repository path). Once DNS and certificate provisioning complete, enable **Enforce HTTPS** in Pages. Submit `https://morphlet.nfks.co.in/sitemap.xml` to your search console after launch.

Run `npm run check` before pushing. It checks JavaScript syntax, page metadata, JSON-LD, local links/assets, sitemap and custom-domain configuration. No installation or build dependencies are required.
