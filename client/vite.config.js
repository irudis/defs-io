import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	publicDir: "./public",
	build: {
		outDir: "./build",
		assetsInlineLimit: 0
	},
//	publicDir: "src/assets"
	optimizeDeps: {
		include: ["protobufjs/minimal"],
	},
	server: {
		proxy: {
			'/api': 'http://127.0.0.1:1235'
		},
		host: true,
		port: 443
	}
})
