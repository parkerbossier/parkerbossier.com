import debounce from 'debounce';
import React from 'react';

import './ScrollGate.less';
import { scrollHeightRemaining } from "./lib/utils";

interface ScrollGateProps {
	direction: 'forward' | 'backward';
	enabled: boolean;
}

interface ScrollGateState {
	distance: number;
}

export class ScrollGate extends React.Component<ScrollGateProps, ScrollGateState> {
	render() {
		return (
			<section className="ScrollGate">
				hi
			</section>
		)
	}
}
