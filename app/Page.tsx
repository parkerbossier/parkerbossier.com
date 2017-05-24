import Classnames from 'classnames';
import React from 'react';
import debounce from 'debounce';

import { PageKey } from './App';
import { scrollHeightRemaining } from './lib/utils';

import './Page.less';

interface PageProps {
	isFirstPage?: boolean;
	isLastPage?: boolean;
	/** Should be true when the pages are transitioning (for content scroll prevention and resetting) */
	isTransitioning: boolean;
	onNavigateNext?: () => void;
	onNavigatePrev?: () => void;
	pageKey: PageKey;
}

interface PageState {
	/**
	 * The distance scrolled towards this page's scroll gates (- for prev, + for next).
	 * 
	 * NOTE: Will never exceed scrollGateThreshold.
	 */
	scrollGateProgress: number;
}

/** The number of pixels the user needs to scroll to trigger the scroll gate (and cause a navigation event) */
const scrollGateThreshold = 800;

export class Page extends React.Component<PageProps, PageState> {
	state = {
		scrollGateProgress: 0
	} as PageState;

	private contentRef: HTMLDivElement;

	componentWillReceiveProps(nextProps: PageProps) {
		// reset content scroll after the transition ends (and any scrolled content is presumably out of view)
		if (this.props.isTransitioning && !nextProps.isTransitioning) {
			this.contentRef.scrollTop = 0;
		}
	}

	private handleMouseWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
		// bail if we're transitioning because that should kill all scrolling
		if (this.props.isTransitioning)
			return;

		// bail once we meet the threshold; let the scroll gate decay 
		if (this.scrollGateThresholdMet)
			return;

		const scrollIsOverContent = this.contentRef.contains(e.target as HTMLElement);
		if (!scrollIsOverContent)
			// "forward" mousewheel events outside of content to content
			this.contentRef.scrollTop += e.deltaY;

		// scrolling previous
		if (e.deltaY < 0) {

			// scroll exhausted, begin scroll gate
			if (this.contentRef.scrollTop === 0) {
				this.postponeScrollGateReset();
				const newProgress = Math.max(-scrollGateThreshold, this.state.scrollGateProgress + e.deltaY);
				this.setState({ scrollGateProgress: newProgress });

				// scroll gate broken
				if (
					!this.props.isFirstPage &&
					-newProgress === scrollGateThreshold
					&& !this.scrollGateThresholdMet
				) {
					this.scrollGateThresholdMet = true;
					this.props.onNavigatePrev();
				}
			}
		}

		// scrolling next
		else if (e.deltaY > 0) {
			const remainingScroll = scrollHeightRemaining(this.contentRef);

			// scroll exhausted, begin scroll gate
			if (remainingScroll === 0) {
				this.postponeScrollGateReset();
				const newProgress = Math.min(scrollGateThreshold, this.state.scrollGateProgress + e.deltaY);

				this.setState({ scrollGateProgress: newProgress });

				// scroll gate broken
				if (
					!this.props.isLastPage &&
					newProgress === scrollGateThreshold &&
					!this.scrollGateThresholdMet
				) {
					this.scrollGateThresholdMet = true;
					this.props.onNavigateNext();
				}
			}
		}
	}

	/**
	 * "Queues" up a scroll gate reset.
	 * Effectively, we wait for the user to stop scrolling before resetting the gate.
	 * */
	private postponeScrollGateReset = debounce(() => {
		this.setState({ scrollGateProgress: 0 });
		this.scrollGateThresholdMet = false;
	}, 500);

	/** When set, the scroll gate threshold has been met, so further triggers in this scroll session should be ignored. */
	private scrollGateThresholdMet: boolean;

	render() {
		const { isTransitioning, pageKey } = this.props;
		const { scrollGateProgress } = this.state;

		const fragment = PageKey[pageKey].toLowerCase();

		/** [0, 1] */
		const scrollGatePrevProgress = Math.max(-scrollGateProgress / scrollGateThreshold, 0);
		/** [0, 1] */
		const scrollGateNextProgress = Math.max(scrollGateProgress / scrollGateThreshold, 0);

		const classes = Classnames(
			'Page',
			{ 'Page--transitioning': isTransitioning }
		);

		return (
			<section
				className={classes}
				id={fragment}
				onWheel={this.handleMouseWheel}
			>
				<div
					className="Page-content"
					ref={div => { this.contentRef = div; }}
				>
					{this.props.children}
				</div>

				<div className="Page-scrollGate">
					{this.props.isFirstPage && (
						<span>
							Refreshed. Maybe.
						</span>
					)}

					<div className="Page-scrollGateIconOuter" style={{ opacity: scrollGatePrevProgress }}>
						<div className="Page-scrollGateIconInner" style={{ transform: `scale(${scrollGatePrevProgress})` }} />
					</div>
				</div>
				<div className="Page-scrollGate Page-scrollGateNext">
					{this.props.isLastPage && (
						<span>
							Thanks for reading!
						</span>
					)}

					<div className="Page-scrollGateIconOuter" style={{ opacity: scrollGateNextProgress }}>
						<div className="Page-scrollGateIconInner" style={{ transform: `scale(${scrollGateNextProgress})` }} />
					</div>
				</div>
			</section>
		)
	}
}
