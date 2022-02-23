import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { resolve } from "path"
import { defineConfig } from "vite"
import svgLoader from "vite-svg-loader"
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  // esbuild: {
  //   jsxFactory: "h",
  //   jsxFragment: "Fragment"
  // },
  plugins: [
    vue({
      script: {
        refSugar: true
      }
    }),
    vueJsx(),
    svgLoader()
  ],
  server: {
    proxy: {
      "/api": {
        // 目标 API 地址
        target: "http://localhost:7001",
        // target: "http://beauty.zeongit.cn/api",
        // 如果要代理 websockets
        ws: true,
        secure: false,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/")
      }
    }
  }
})
