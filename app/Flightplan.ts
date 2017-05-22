import './Flightplan.less';

export class Flightplan {
	private startTime = new Date().getTime();

	constructor(private element: JQuery) {
		const animateClass = 'Flightplan-me--animateFocus';
		const mars = element.find('.Flightplan-mars');
		const me = element.find('.Flightplan-me');
		const outerRing = element.find('.Flightplan-meRingOuter');

		// restart the ring transition when it finishes
		outerRing.on('animationend', () => {
			me.removeClass(animateClass);
			setTimeout(() => {
				me.addClass(animateClass);
			}, 0);
		});

		const foo = () => {
			const diff = new Date().getTime() - this.startTime;
			const percent = diff / 50;
			mars.css('background-position', `${percent}% 100%`);

			requestAnimationFrame(foo);
		}

		//foo();
	}
}
