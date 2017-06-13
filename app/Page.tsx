import Classnames from 'classnames';
import React from 'react';
import debounce from 'debounce';

import { PageKey } from './App';

import './Page.less';

interface PageProps {
	pageKey: PageKey;
}

export class Page extends React.Component<PageProps, {}> {
	render() {
		const { pageKey } = this.props;

		const pageName = PageKey[pageKey].toLowerCase();

		const classes = Classnames(
			'Page'
		);

		return (
			<section
				className={classes}
				data-pagekey={pageName}
			>
				<div
					className="Page-content"
				>
					{this.props.children}
				</div>
			</section>
		)
	}
}
