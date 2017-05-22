import './Flightplan.less';

export class Flightplan {
	constructor(private element: JQuery) {
		const animateClass = 'Flightplan-me--animateFocus';
		const me = element.find('.Flightplan-me');
		const outerRing = element.find('.Flightplan-meRingOuter');

		outerRing.on('animationend', () => {
			console.log('reset!');

			me.removeClass(animateClass);
			setTimeout(() => {
				me.addClass(animateClass);
			}, 0);
		})
	}
}
