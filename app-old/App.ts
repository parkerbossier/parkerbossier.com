import './reset.less';
import { Nav } from './Nav';
import { Flightplan } from './Flightplan';
import { Page } from './Page';
import './App.less';

class App {
	constructor(private element: JQuery) {
		// reset the hash on load if applicable
		const initialHash = window.location.hash;
		if (initialHash === '#flightplan')
			window.history.replaceState(null, document.title, '/');

		const nav = new Nav($('.Nav'));
		nav.onChange(value => {
			$('.App-pages').animate(
				{
					scrollTop: $(`#${value}`).index() * $(window).height()
				},
				500,
				() => {
					window.location.hash = value;
				}
			)
		});

		if (initialHash)
			nav.setValue(initialHash.substr(1));

		const pages: Page[] = [];
		$('.Page').map((i, pageElement) => {
			const page = new Page($(pageElement));
			page.onRequestNext(() => {
				const nextPage = $(pageElement).next();
				if (nextPage.length) {
					nextPage.scrollTop(0);
					nav.setValue(nextPage.attr('id'));
				}
			});
			page.onRequestPrevious(() => {
				const prevPage = $(pageElement).prev();
				if (prevPage.length) {
					prevPage.scrollTop(0);
					nav.setValue(prevPage.attr('id'));
				}
			});

			pages.push(page);
		});

		const filghtplan = new Flightplan($('.Flightplan'));
	}
}

const app = new App($('.App'));

//window['smoothscroll'] = smoothScroll;