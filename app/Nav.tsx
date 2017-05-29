import Classnames from 'classnames';
import React from 'react';

import { PageKey } from './App';

import './Nav.less';

interface NavProps {
	activePage: PageKey;
	onNavigate: (toPage: PageKey) => void;
}

export class Nav extends React.Component<NavProps, {}> {
	render() {
		const { activePage } = this.props;

		const renderNavItem = (pageKey: PageKey, label: string) => {
			return (
				<li className={Classnames('Nav-item', activePage === pageKey && 'Nav-item--active')}>
					<a className="Nav-link" href="javascript://" onClick={() => { this.props.onNavigate(pageKey); }}>
						{label}
					</a>
				</li>
			);
		};

		return (
			<nav className="Nav">
				<ul>
					{renderNavItem(PageKey.Flightplan, 'Flightplan')}
					{renderNavItem(PageKey.Zazzle, 'Zazzle')}
					{renderNavItem(PageKey.SecondaryMissions, 'Secondary missions')}
					{renderNavItem(PageKey.Resume, 'Resume')}
					{renderNavItem(PageKey.Contact, 'Contact')}
				</ul>
			</nav>
		);
	}
}