import React from 'react';
import { render } from 'react-dom';

import { Test } from './Test';

export const Html = (props: {}) => {
	return (
		<html lang="en">
			<head>
				<title>parkerbossier.com</title>

				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>

			<body>
				<Test />


				<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
				<script src="/app.js"></script>
			</body>
		</html>
	);
}
