import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
	plugins: [vue()],
	server: {
		open: true,
		port: '3000',
		host: '127.0.0.1',
	},
	preview: {
		open: true,
		port: '8080',
		host: '127.0.0.1',
	},
	define: {
		__VUE_OPTIONS_API__: false,
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
