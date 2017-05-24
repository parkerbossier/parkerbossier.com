import './Page.less';

import debounce = require('debounce');

export class Page {
	constructor(private element: JQuery) {
		const content = element.find('.Page-content');

		content.on('mousewheel', e => {
			const canScroll = e.currentTarget.scrollHeight > $(e.currentTarget).height();
			const remainingScroll = e.currentTarget.scrollHeight - e.currentTarget.getBoundingClientRect().height - e.currentTarget.scrollTop;
		});
	}

	onRequestNext(callback: () => void) {
		const content = this.element.find('.Page-content');
		const debouncedCallback = debounce(callback, 100, true);

		if (content.length)
			content.on('mousewheel', e => {
				const deltaY = (e.originalEvent as any).wheelDeltaY;
				if (deltaY < 0) {
					const canScroll = e.currentTarget.scrollHeight > $(e.currentTarget).height();
					const remainingScroll =
						e.currentTarget.scrollHeight
						- e.currentTarget.getBoundingClientRect().height
						- e.currentTarget.scrollTop;

					if (canScroll) {
						if (remainingScroll === 0)
							debouncedCallback();
					}

					else
						debouncedCallback();
				}
			});
		else
			this.element.on('mousewheel', e => {
				const deltaY = (e.originalEvent as any).wheelDeltaY;
				if (deltaY < 0)
					debouncedCallback();
			})
	}

	onRequestPrevious(callback: () => void) {
		const content = this.element.find('.Page-content');
		const debouncedCallback = debounce(callback, 100, true);

		if (content.length)
			content.on('mousewheel', e => {
				const deltaY = (e.originalEvent as any).wheelDeltaY;
				if (deltaY > 0) {
					const canScroll = e.currentTarget.scrollHeight > $(e.currentTarget).height();
					const remainingScroll = e.currentTarget.scrollTop;

					if (canScroll) {
						if (remainingScroll === 0)
							debouncedCallback();
					}

					else
						debouncedCallback();
				}
			});
		else
			this.element.on('mousewheel', e => {
				const deltaY = (e.originalEvent as any).wheelDeltaY;
				if (deltaY > 0)
					debouncedCallback();
			})
	}
}
