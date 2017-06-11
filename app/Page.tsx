import Classnames from 'classnames';
import React from 'react';
import debounce from 'debounce';

import { PageKey } from './App';
import { ScrollGate } from './ScrollGate';
import { scrollHeightRemaining } from './lib/utils';

import './Page.less';

interface PageProps {
	captureScrollEvents: boolean;
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
const scrollGateThreshold = 550;

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

	private handleGateNextClick = () => {
		if (!this.props.isLastPage)
			this.props.onNavigateNext();
	}
	private handleGatePrevClick = () => {
		if (!this.props.isFirstPage)
			this.props.onNavigatePrev();
	}

	private handleMouseWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
		if (this.props.captureScrollEvents)
			this.handleScroll(e.deltaY, e.target as any);
	}

	private handleScroll = (deltaY: number, target?: HTMLElement) => {
		//console.log('handling scroll', deltaY)

		// bail if we're transitioning because that should kill all scrolling
		if (this.props.isTransitioning)
			return;

		// bail once we meet the threshold; let the scroll gate decay 
		if (this.scrollGateThresholdMet)
			return;

		const scrollIsOverContent = target && this.contentRef.contains(target as HTMLElement);
		if (!scrollIsOverContent)
			// "forward" mousewheel events outside of content to content
			this.contentRef.scrollTop += deltaY;

		// scrolling previous
		if (deltaY < 0) {

			// scroll exhausted, begin scroll gate
			if (this.contentRef.scrollTop === 0) {
				this.postponeScrollGateReset();
				const newProgress = Math.max(-scrollGateThreshold, this.state.scrollGateProgress + deltaY);
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
		else if (deltaY > 0) {
			const remainingScroll = scrollHeightRemaining(this.contentRef);

			// scroll exhausted, begin scroll gate
			if (remainingScroll === 0) {
				this.postponeScrollGateReset();
				const newProgress = Math.min(scrollGateThreshold, this.state.scrollGateProgress + deltaY);

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

	private prevTouchMoveScreenY: number;
	private handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		const touchScreenY = e.touches[0].screenY;
		const deltaY = this.prevTouchMoveScreenY !== undefined
			? this.prevTouchMoveScreenY - touchScreenY
			: 0;
		this.handleScroll(deltaY, e.target as any);
		this.prevTouchMoveScreenY = touchScreenY;
	}

	private handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
		this.prevTouchMoveScreenY = undefined;
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

		const pageName = PageKey[pageKey].toLowerCase();

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
				data-pagekey={pageName}
				onTouchEnd={this.handleTouchEnd}
				onTouchMove={this.handleTouchMove}
				onWheel={this.handleMouseWheel}
			>
				{!this.props.isFirstPage && (
					<ScrollGate
						completion={scrollGatePrevProgress}
						direction="up"
						onNavigate={this.handleGatePrevClick}
					/>
				)}

				<div
					className="Page-content"
					ref={div => { this.contentRef = div; }}
				>
					{this.props.children}
				</div>

				{!this.props.isLastPage && (
					<ScrollGate
						completion={scrollGateNextProgress}
						direction="down"
						onNavigate={this.handleGateNextClick}
					/>
				)}
			</section>
		)
	}
}
