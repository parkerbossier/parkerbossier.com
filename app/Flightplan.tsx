import React from 'react';

import './Flightplan.less';

export class Flightplan extends React.Component<{}, {}> {
	render() {
		return (
			<div className="Flightplan">
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
						> I build <strong>React+Typescript</strong> Flightplans;<br />
						> I explore the universe in <strong>KSP</strong>;<br />
						> I <strong>cycle</strong> through the SF Bay Area;
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

				<div className="Flightplan-me Flightplan-me--animateFocus">
					<div className="Flightplan-meImageWrFlightplaner">
						<div className="Flightplan-meImage"></div>
					</div>

					<div className="Flightplan-meRing Flightplan-meRingOuter"></div>
					<div className="Flightplan-meRing Flightplan-meRingInner"></div>
				</div>
			</div>
		)
	}
}
