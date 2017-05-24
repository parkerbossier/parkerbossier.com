import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Html } from './Html';

interface GenerateStaticHTML {
	(html: string): string;
}


const entry = (path: string, props: {}, callback: GenerateStaticHTML) => {
	console.log('HIHIHI', path, props, callback);
	(1 as any).toWat();

	callback(renderToStaticMarkup(<Html />))
};

export default entry;