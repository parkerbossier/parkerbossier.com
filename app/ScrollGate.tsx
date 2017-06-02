import Classnames from 'classnames';
import React from 'react';

import { scrollHeightRemaining } from './lib/utils';

import './ScrollGate.less';

interface ScrollGateProps {
	/** Range is [0, 1] */
	completion: number;
	direction: 'down' | 'up';
	onNavigate: () => void;
}

interface ScrollGateState {

}

const maxScale = 2;
function easeOutQuart(t: number) {
	return 1 - (--t) * t * t * t;
}

export class ScrollGate extends React.Component<ScrollGateProps, ScrollGateState> {
	render() {
		const { completion, direction } = this.props;

		const curScale = (maxScale - 1) * easeOutQuart(completion) + 1;
		const style: React.CSSProperties = {
			transform: `scale(${curScale})`
		};

		const classnames = Classnames(
			'ScrollGate',
			{ 'ScrollGate--down': this.props.direction === 'down' }
		);

		return (
			<div className={classnames} onClick={this.props.onNavigate} style={style}>
				{/* https://www.iconfinder.com/icons/211623/arrow_b_up_icon#size=128 */}
				<svg viewBox="0 0 512 512" xmlSpace="preserve">
					<path d="M413.1,327.3l-1.8-2.1l-136-156.5c-4.6-5.3-11.5-8.6-19.2-8.6c-7.7,0-14.6,3.4-19.2,8.6L101,324.9l-2.3,2.6  C97,330,96,333,96,336.2c0,8.7,7.4,15.8,16.6,15.8v0h286.8v0c9.2,0,16.6-7.1,16.6-15.8C416,332.9,414.9,329.8,413.1,327.3z" />
				</svg>
			</div>
		)
	}
}
