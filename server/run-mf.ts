import esbuild, { BuildOptions } from "esbuild"
import { Miniflare } from "miniflare"

const workerFile = "./server/worker.ts"
const bundledFile = "./dist/server/index.mjs"

const esbuildConfig: BuildOptions = {
  banner: {
    js: `(() => {globalThis.navigator = { userAgent: "Cloudflare-Workers" };})();`,
  },
  external: ["__STATIC_CONTENT_MANIFEST"],
  sourcemap: "inline",
  entryPoints: [workerFile],
  write: true,
  bundle: true,
  allowOverwrite: true,
  platform: "node",
  format: "esm",
  target: "es2020",
  outfile: bundledFile,
}

await esbuild.build(esbuildConfig)

const mf = new Miniflare({
  scriptPath: bundledFile,
  modules: true,
  port: 3000,
})

await mf.startServer()
