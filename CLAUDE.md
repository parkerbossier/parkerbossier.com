# parkerbossier.com

Single-page static personal site. Vite + SCSS, no framework, no JS. Deployed on Cloudflare Pages; the stylesheet is inlined into the HTML at build.

## Commands

- `npm run dev` (binds to LAN via `--host` for real-device testing) / `npm run build` / `npm run preview`
- `npm run lint` / `npm run lint:fix` — stylelint (idiomatic property order is enforced; run lint before considering a change done)

## CSS conventions

- BEM-ish naming: `.thing_subthing` for elements, `.thing__state` for states.
- Units: px for chrome (borders, radii, fixed paddings), rem for type, em/ch for type-relative sizes, em for breakpoints.

## Images

- **Scrub metadata before committing any image.** Photos (especially iPhone exports) carry GPS coordinates, device model, and timestamps. Pipeline:
  1. Convert to sRGB first: `sips -m "/System/Library/ColorSync/Profiles/sRGB Profile.icc" <in> --out <out>` — stripping alone removes the Display P3 ICC profile and shifts colors, since browsers assume sRGB for untagged images.
  2. Strip: `exiftool -all= <file>` for JPEG/PNG; `cwebp` strips by default.
  3. Verify clean: `exiftool -a -G1 -icc_profile:all -exif:all -gps:all -xmp:all <file>` should output nothing.
- **Placement:** assets referenced by the page live in `src/` so Vite content-hashes them (safe to iterate after deploy). Social/OG images live in `public/` because their absolute URLs in meta tags must stay stable and Vite doesn't rewrite meta content; to force scrapers to re-fetch after a change, rename the file and update the references.
- **Formats:** WebP for page images (universally supported; no fallback needed). JPEG for `og:image` — some link-preview scrapers still can't decode WebP/AVIF.
- **Sizing:** encode at max displayed CSS px × 4 (densest mobile DPR); e.g. the 180px portrait ships at 720px.
