# parkerbossier.com

A simple, lightweight personal website. One HTML page, one stylesheet, no JS framework.

## Development

```sh
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

Built with [Vite](https://vite.dev/) and Sass (via `sass-embedded`).

## Deployment

Hosted on Cloudflare Pages, which builds from this repo (`npm run build`, output `dist/`).

### If the CF build fails with `Cannot find module @rollup/rollup-linux-x64-gnu`

This is npm's optional-dependencies bug ([npm/cli#4828](https://github.com/npm/cli/issues/4828)) hitting rollup's platform-specific binaries on the Cloudflare build image. It happened in July 2025 (see the "Debug" commit streak ending at `fbd068e`). The workaround that worked then: temporarily add the missing package to `optionalDependencies` in `package.json`, or regenerate `package-lock.json` from scratch. The workaround was later removed and builds have been clean since.
