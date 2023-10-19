module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './components/**/*.css'],
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './components/**/*.css'],
	safelist: [
		'w-3',
		'h-3',
		'w-4',
		'h-5',
		'w-6',
		'h-6',
		'w-10',
		'h-10',
		'w-20',
		'h-20',
		'w-30',
		'h-30',
	],
	darkMode: 'media',
	variants: {
		opacity: ['hover'],
	},
	theme: {
		extend: {
			screens: {
				'xs': '360px',
			},
			spacing: {
				'1/3': '33%',
				'1/2': '50%',
				'16/9': '56.25%',
				full: '100%',
			},
			colors: {
				transparent: 'transparent',
				burgundy: '#9f3e52',
			},
			fontFamily: {
				body: ['Roboto', 'Open Sans', 'ui-sans-serif'],
				title: ['GT Sectra Bold', 'ui-serif'],
				serif: ['GT Sectra Regular', 'ui-serif'],
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp'), require('@rvxlab/tailwind-plugin-ios-full-height')],
	// plugins: [require('@tailwindcss/typography')],
}
