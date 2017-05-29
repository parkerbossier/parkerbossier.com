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
					<table className="Flightplan-marsReadout">
						<tbody>
							<tr>
								<td>fov:&nbsp;</td>
								<td>5km</td>
								<td>λ:&nbsp;</td>
								<td>630nm</td>
							</tr>
							<tr>
								<td>mag:&nbsp;</td>
								<td>10x</td>
								<td>inc:&nbsp;</td>
								<td>93&deg;</td>
							</tr>
						</tbody>
					</table>

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

					<table className="Flightplan-marsReadout">
						<tbody>
							<tr>
								<td>lat:&nbsp;</td>
								<td>-8.000</td>
								<td>v:&nbsp;</td>
								<td>3.414km/s</td>
							</tr>
							<tr>
								<td>lng:&nbsp;</td>
								<td>-48.100</td>
								<td>alt:&nbsp;</td>
								<td>289km</td>
							</tr>
						</tbody>
					</table>
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
