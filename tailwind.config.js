/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./index.html', './src/**/*.vue'],
	future: { hoverOnlyWhenSupported: true },
	theme: {
		extend: {
			fontFamily: {
				'league-spartan': ['League Spartan', 'Arial', 'Helvetica', ...defaultTheme.fontFamily.sans],
			},
		},
	},
};
