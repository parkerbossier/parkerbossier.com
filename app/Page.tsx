import Classnames from 'classnames';
import React from 'react';
import debounce from 'debounce';

import { PageKey } from './App';
import { scrollHeightRemaining } from './lib/utils';

import './Page.less';

interface PageProps {
	isFirstPage?: boolean;
	isLastPage?: boolean;
	/** Lock this page's content from scrolling (useful during nav transition) */
	lockScrolling: boolean;
	onNavigateNext?: () => void;
	onNavigatePrev?: () => void;
	pageKey: PageKey;
}

interface PageState {
	/** The distance scrolled towards this page's scroll gates (- for prev, + for next) */
	scrollGateProgress: number;
}

/** The number of picels the user needs to scroll to trigger the scroll gate (and cause a navigation event) */
const scrollGateThreshold = 800;

export class Page extends React.Component<PageProps, PageState> {
	state = {
		scrollGateProgress: 0
	} as PageState;

	private contentRef: HTMLDivElement;

	private handleContentWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
		this.queueScrollGateReset();

		// scrolling previous
		if (e.deltaY < 0) {

			// scroll exhausted, begin scroll gate
			if (this.contentRef.scrollTop === 0) {
				const newProgress = this.state.scrollGateProgress + e.deltaY;
				this.setState({ scrollGateProgress: newProgress });

				// scroll gate broken
				if (
					!this.props.isFirstPage &&
					-newProgress > scrollGateThreshold
					&& !this.scrollGateThresholdMet
				) {
					this.scrollGateThresholdMet = true;
					this.props.onNavigatePrev();

					// reset the content scroll after we're out of view (probably)
					setTimeout(() => {
						this.contentRef.scrollTop = 0;
					}, 1000);
				}
			}
		}

		// scrolling next
		else if (e.deltaY > 0) {
			const remainingScroll = scrollHeightRemaining(this.contentRef);

			// scroll exhausted, begin scroll gate
			if (remainingScroll === 0) {
				const newProgress = this.state.scrollGateProgress + e.deltaY;
				this.setState({ scrollGateProgress: newProgress });

				// scroll gate broken
				if (
					!this.props.isLastPage &&
					newProgress > scrollGateThreshold &&
					!this.scrollGateThresholdMet
				) {
					this.scrollGateThresholdMet = true;
					this.props.onNavigateNext();

					// reset the content scroll after we're out of view (probably)
					setTimeout(() => {
						this.contentRef.scrollTop = 0;
					}, 1000);
				}
			}
		}
	}

	/**
	 * "Queues" up a scroll gate reset.
	 * Effectively, we wait for the user to stop scrolling before resetting the gate.
	 * */
	private queueScrollGateReset = debounce(() => {
		this.setState({ scrollGateProgress: 0 });
		this.scrollGateThresholdMet = false;
	}, 500);
	
	/** When set, the scroll gate threshold has been met, so further triggers in this scroll session should be ignored. */
	private scrollGateThresholdMet: boolean;

	render() {
		const { lockScrolling, pageKey } = this.props;
		const { scrollGateProgress } = this.state;

		const fragment = PageKey[pageKey].toLowerCase();

		const scrollGatePrevOpacity = Math.max(-scrollGateProgress / scrollGateThreshold, 0);
		const scrollGateNextOpacity = Math.max(scrollGateProgress / scrollGateThreshold, 0);

		const classes = Classnames(
			'Page',
			{ 'Page--scrollLock': lockScrolling }
		);

		return (
			<section className={classes} id={fragment}>
				<div
					className="Page-content"
					onWheel={this.handleContentWheel}
					ref={div => { this.contentRef = div; }}
				>
					{this.props.children}
				</div>

				<div className="Page-scrollGate" style={{ opacity: scrollGatePrevOpacity }}>
					{this.props.isFirstPage && (
						<span>
							Refreshed. Maybe.
						</span>
					)}
				</div>
				<div className="Page-scrollGate Page-scrollGateNext" style={{ opacity: scrollGateNextOpacity }}>
					{this.props.isLastPage && (
						<span>
							Thanks for reading!
						</span>
					)}
				</div>
			</section >
		)
	}
}
