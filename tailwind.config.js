import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.vue'],
	future: { hoverOnlyWhenSupported: true },
	theme: {
		extend: {
			ringWidth: {
				3: '3px',
			},
			borderWidth: {
				3: '3px',
			},
			spacing: {
				inherit: 'inherit',
			},
			width: {
				'88%': '88%',
				18: '4.5rem' /* 72px */,
				22: '5.5rem' /* 88px */,
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
