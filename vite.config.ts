import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [svgr(), react(), tsconfigPaths()],
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          // target: 'http://localhost:9000/api/v1',
          target: 'http://120.79.169.245/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    esbuild: {
      // drop: ['console', 'debugger'],
    },
  })
}
