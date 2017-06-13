/// <reference path="../typings/index.d.ts" />

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { App } from './App';

const doRender = (App: React.ComponentClass<{}>) => {
	render(
		<AppContainer>
			<App />
		</AppContainer>,
		document.getElementById('root')
	)
};

doRender(App);

declare const module: any;
if (module.hot)
	module.hot.accept('./App', () => { doRender(App) })