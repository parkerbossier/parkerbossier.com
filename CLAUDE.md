# parkerbossier.com

Single-page static personal site. Vite + SCSS, no framework, no JS. Deployed on Cloudflare Pages; the stylesheet is inlined into the HTML at build.

## Commands

- `npm run dev` (binds to LAN via `--host` for real-device testing) / `npm run build` / `npm run preview`
- `npm run lint` / `npm run lint:fix` — stylelint (idiomatic property order is enforced; run lint before considering a change done)

## CSS conventions

- BEM-ish naming: `.thing_subthing` for elements, `.thing__state` for states.
- Units: px for chrome (borders, radii, fixed paddings), rem for type, em/ch for type-relative sizes, em for breakpoints.

## Deliberate decisions (don't "fix" these)

- **`mailto:` keeps `target="_blank"`.** Gmail-as-handler users (most of the audience) get compose in a new tab instead of losing the page; native-client users pay a small orphan-tab cost. The trade was weighed — leave it.
- **No CSP.** The only external resource is the Cloudflare analytics beacon — the one thing a CSP would police is also the thing a CSP typo would silently kill. Thin protection, real fragility.
- **Analytics is Cloudflare Web Analytics, injected into the HTML at the edge — conditionally on User-Agent.** Browser UAs get the beacon; default `curl` does not (verified both ways), so absence in fetched HTML proves nothing. Verify with a browser UA or in the Cloudflare dashboard.
- **HSTS has `includeSubDomains` but not `preload`.** Cloudflare fronts all subdomains with TLS, so includeSubDomains is safe; preload is effectively irreversible, so it stays off.
- **Decorative syntax spans need `aria-hidden="true"`.** The intro's comment marks (`/**`, `*`) and mid-sentence wrap-break spans are visual only; any new ones must be hidden too, or screen readers read "star" mid-sentence. Meaningful tags (`@owns` etc.) stay voiced.
- **Favicons are unhashed in `public/` by design.** `/favicon.ico` and `/apple-touch-icon.png` are fetched at well-known root paths by clients that never read the HTML; hashing would break them. Rename-on-change applies if promptness ever matters.
- **The code panel is always dark, in both schemes.** Docs-site idiom; also the syntax palette is AA-validated against the dark panel only — light syntax themes chronically fail contrast on yellows/oranges.

## Images

- **Scrub metadata before committing any image.** Photos (especially iPhone exports) carry GPS coordinates, device model, and timestamps. Pipeline:
  1. Convert to sRGB first: `sips -m "/System/Library/ColorSync/Profiles/sRGB Profile.icc" <in> --out <out>` — stripping alone removes the Display P3 ICC profile and shifts colors, since browsers assume sRGB for untagged images.
  2. Strip: `exiftool -all= <file>` for JPEG/PNG; `cwebp` strips by default.
  3. Verify clean: `exiftool -a -G1 -icc_profile:all -exif:all -gps:all -xmp:all <file>` should output nothing.
- **Placement:** assets referenced by the page live in `src/` so Vite content-hashes them (safe to iterate after deploy). Social/OG images live in `public/` because their absolute URLs in meta tags must stay stable and Vite doesn't rewrite meta content; scrapers cache these by URL on their own servers, so to replace what a stale cache *shows*, rename the file and update the references. In-place replacement is fine when the old bytes render identically (e.g. a re-encode) or the URL is too new for meaningful caches to exist.
- **Formats:** WebP for page images (universally supported; no fallback needed). JPEG for `og:image` — some link-preview scrapers still can't decode WebP/AVIF.
- **Sizing:** encode at max displayed CSS px × 4 (densest mobile DPR); e.g. the 180px portrait ships at 720px.
