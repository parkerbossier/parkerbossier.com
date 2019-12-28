# parkerbossier.com

## Build stack

### LESS
- Traditional auto-formatting with VS Code's built-in formatter
- `postcss-sorting` (via `yarn formatLess`) for occasional deeper tidying (mainly property sorting)
  - For some reason, the state of VS Code extension support for context-aware CSS sorting is quite poor :/
- Minified for prod

### HTML
- Marked sources are inlined with `gulp-inline-source`
- Minified for prod

### Static assets
- Static assets from `/app/static`, like images and `.htaccess`, get copied to the build root