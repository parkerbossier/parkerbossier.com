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

export class ScrollGate extends React.Component<ScrollGateProps, ScrollGateState> {
	render() {
		const { completion, direction } = this.props;

		return (
			<div className="ScrollGate" onClick={this.props.onNavigate}>
				<div className="ScrollGate-progress" style={{ width: completion * 100 + '%' }} />
			</div>
		)
	}
}
