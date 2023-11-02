/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./index.html', './src/**/*.vue'],
	future: { hoverOnlyWhenSupported: true },
	theme: {
		extend: {
			outlineWidth: {
				3: '3px',
			},
			spacing: {
				inherit: 'inherit',
			},
			colors: {
				steel: '#7b8e8e',
				charcoal: '#2c3a3a',
				darkCyan: '#5ba4a4',
				lilacWhite: '#effafa',
				whiteSmoke: '#eef6f6',
			},
			fontFamily: {
				'league-spartan': ['League Spartan', 'Arial', 'Helvetica', ...defaultTheme.fontFamily.sans],
			},
		},
	},
};
