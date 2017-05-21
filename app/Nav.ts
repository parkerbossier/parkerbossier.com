import './Nav.less';

export class Nav {
	constructor(private element: JQuery) {
		// on change
		element.find('input[type=radio]').on('change', e => {
			const input = e.currentTarget as HTMLInputElement;
			window.location.hash = input.value;
		});

		// toggle
		element.find('.Nav-toggle').click(e => {
			element.toggleClass('Nav--collapsed');
		});
	}
}
