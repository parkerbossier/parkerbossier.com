import Classnames from 'classnames';
import React from 'react';

import './Flightplan.less';

interface FlightplanState {
	isAnimatingMe: boolean;
	isMounted: boolean;
}

export class Flightplan extends React.Component<{}, FlightplanState> {
	state = {
		isAnimatingMe: true
	} as FlightplanState;

	componentDidMount() {
		// without the timeout, the initial CSS doesn't have a chance to apply
		setTimeout(() => {
			this.setState({ isMounted: true });
		}, 0);
	}

	private restartMeAnimation = () => {
		this.setState(
			{ isAnimatingMe: false },
			() => {
				setTimeout(() => {
					this.setState({ isAnimatingMe: true });
				}, 0)
			}
		);
	}

	render() {
		return (
			<div className={Classnames('Flightplan', this.state.isMounted && 'Flightplan--mounted')}>
				<div className="Flightplan-mars">
					<div className="Flightplan-marsReadout">
						<div className="Flightplan-marsReadoutRow">
							<div
								className="Flightplan-marsReadoutCol"
								title="Approximate field of view of HiRISE at 300km altitude."
							>
								<span>fov:&nbsp;</span>
								<span>6km</span>
							</div>
							<div
								className="Flightplan-marsReadoutCol"
								title="Approximate red wavelength captured by HiRISE's red filter."
							>
								<span>λ:&nbsp;</span>
								<span>630nm</span>
							</div>
						</div>
						<div className="Flightplan-marsReadoutRow">
							<div
								className="Flightplan-marsReadoutCol"
								title="Approxmiate resulting zoom power for this UI."
							>
								<span>mag:&nbsp;</span>
								<span>15x</span>
							</div>
							<div
								className="Flightplan-marsReadoutCol"
								title="Approximate inclination of MRO."
							>
								<span>inc:&nbsp;</span>
								<span>93deg</span>
							</div>
						</div>
					</div>

					<div className="Flightplan-marsCrosses">
						<div className="Flightplan-marsCross"></div>
						<div className="Flightplan-marsCross"></div>
						<div className="Flightplan-marsCross"></div>
					</div>

					<div className="Flightplan-marsBio">
						I'm <strong>Parker Bossier</strong><br />
						> I build <strong>React+TypeScript</strong> apps;<br />
						> I explore the universe in <strong>KSP</strong>;<br />
						> I <strong>cycle</strong> around the SF Bay Area;
					</div>

					<div className="Flightplan-marsCrosses">
						<div className="Flightplan-marsCross"></div>
						<div className="Flightplan-marsCross"></div>
						<div className="Flightplan-marsCross"></div>
					</div>

					<div className="Flightplan-marsReadout">
						<div className="Flightplan-marsReadoutRow">
							<div
								className="Flightplan-marsReadoutCol"
								title="Photo taken by HiRISE over Ganges Chasma, Valles Marineris, Mars."
							>
								<span>lat:&nbsp;</span>
								<span>-8.000</span>
							</div>
							<div
								className="Flightplan-marsReadoutCol"
								title="Approximate orbital velocity around Mars at 300km altitude."
							>
								<span>v:&nbsp;</span>
								<span>3.414km/s</span>
							</div>
						</div>
						<div className="Flightplan-marsReadoutRow">
							<div
								className="Flightplan-marsReadoutCol"
								title="Photo taken by HiRISE over Ganges Chasma, Valles Marineris, Mars."
							>
								<span>lng:&nbsp;</span>
								<span>-48.100</span>
							</div>
							<div
								className="Flightplan-marsReadoutCol"
								title="Approximate HiRISE orbital altitude."
							>
								<span>alt:&nbsp;</span>
								<span>289km</span>
							</div>
						</div>
					</div>
				</div>

				<div className={Classnames('Flightplan-me', this.state.isAnimatingMe && 'Flightplan-me--animateFocus')}>
					<div className="Flightplan-meImageWrapper">
						<div className="Flightplan-meImage" onAnimationEnd={this.restartMeAnimation}></div>
					</div>

					<div className="Flightplan-meRing Flightplan-meRingOuter"></div>
					<div className="Flightplan-meRing Flightplan-meRingInner"></div>
				</div>
			</div>
		)
	}
}
