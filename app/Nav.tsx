import Classnames from 'classnames';
import React from 'react';

import { PageKey } from './App';

import './Nav.less';

interface NavProps {
	activePage: PageKey;
	isMobile: boolean;
	onNavigate: (toPage: PageKey) => void;
}

interface NavState {
	isOpen: boolean;
}

export class Nav extends React.Component<NavProps, NavState> {
	state = {} as NavState;

	private handleNavigation = (e: React.MouseEvent<HTMLElement>, toPage: PageKey) => {
		e.preventDefault();
		this.props.onNavigate(toPage);

		if (this.props.isMobile)
			this.setState({ isOpen: false });
	}

	private toggleNav = () => {
		this.setState({ isOpen: !this.state.isOpen });
	}

	render() {
		const { activePage, isMobile } = this.props;
		const { isOpen } = this.state;

		let topLevelActivePage = activePage;
		if ([PageKey.RideWeather, PageKey.KSP].indexOf(activePage) > -1)
			topLevelActivePage = PageKey.SecondaryMissions;

		const renderNavItem = (pageKey: PageKey, label: string) => {
			const itemClassnames = Classnames(
				'Nav-item',
				{ 'Nav-item--active': topLevelActivePage === pageKey }
			);

			return (
				<li className={itemClassnames}>
					<a
						className="Nav-link"
						href={`#${PageKey[pageKey]}`}
						onClick={(e) => {
							this.handleNavigation(e, pageKey);
						}}
					>
						{label}
					</a>
				</li>
			);
		};

		const classnames = Classnames(
			'Nav',
			{
				'Nav--isMobile': isMobile,
				'Nav--isOpen': isOpen
			}
		);

		return (
			<nav className={classnames}>
				<ul>
					{renderNavItem(PageKey.Flightplan, 'Flightplan')}
					{renderNavItem(PageKey.Zazzle, 'Zazzle')}
					{renderNavItem(PageKey.SecondaryMissions, 'Secondary missions')}
					{renderNavItem(PageKey.Resume, 'Resume')}
					{renderNavItem(PageKey.Contact, 'Contact')}
				</ul>

				{isMobile && isOpen && (
					<div className="Nav-shield" onClick={this.toggleNav} />
				)}

				{isMobile && (
					<div className="Nav-hamburger" onClick={this.toggleNav}>
						<div className="Nav-hamburgerLine" />
						<div className="Nav-hamburgerLine" />
						<div className="Nav-hamburgerLine" />
					</div>
				)}
			</nav>
		);
	}
}