import { defineConfig, type Plugin } from 'vite';

// the whole stylesheet is ~1kB gzipped, so inlining it removes the page's only
// render-blocking request at no meaningful cost (single page = no cache reuse)
const inlineStylesheet: Plugin = {
	name: 'inline-stylesheet',
	apply: 'build',
	transformIndexHtml: {
		order: 'post',
		handler(html, { bundle }) {
			if (!bundle) return;

			// no first-class link from an html entry to its css asset exists
			// (chunk.viteMetadata.importedCss needs a js entry), so find by type
			const cssName = Object.keys(bundle).find(name => name.endsWith('.css'));
			if (!cssName) return;
			const css = bundle[cssName];
			if (css?.type !== 'asset') return;

			delete bundle[cssName];
			return html.replace(
				/<link rel="stylesheet"[^>]*>/,
				() => `<style>${css.source.toString().trim()}</style>`
			);
		},
	},
};

export default defineConfig({
	plugins: [inlineStylesheet],
});
