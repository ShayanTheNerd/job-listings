/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./index.html', './src/**/*.vue'],
	future: { hoverOnlyWhenSupported: true },
	theme: {
		extend: {
			width: {
				'88%': '88%',
			},
			outlineWidth: {
				3: '3px',
			},
			outlineOffset: {
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
				fountainBlue: '#63baba',
			},
			fontFamily: {
				'league-spartan': ['League Spartan', 'Arial', 'Helvetica', ...defaultTheme.fontFamily.sans],
			},
		},
	},
};
