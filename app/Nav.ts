import './Nav.less';

export class Nav {
	constructor(private element: JQuery) {
		// toggle
		element.find('.Nav-toggle').click(e => {
			element.toggleClass('Nav--collapsed');
		});
	}

	public onChange(handler: (value: string) => void) {
		this.element.find('input[type=radio]').on('change', e => {
			const input = e.currentTarget as HTMLInputElement;
			handler(input.value);
		});
	}

	setValue(value: string) {
		this.element.find(`input[value=${value}]`).closest('label').click();
	}
}
