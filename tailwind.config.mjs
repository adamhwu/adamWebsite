/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", "*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				navy: {
					700: '#1a2e4c',
					800: '#162440',
					900: '#111c30',
					950: '#0a1020',
				},
				blue: {
					300: '#5eaeff',
					400: '#3498ff',
					500: '#0a84ff',
					600: '#0074e4',
					700: '#0064c8',
				}
			}
		},
	},
	plugins: [],
}


