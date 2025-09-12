import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig(({ watch }) => [
  {
    name: "client",
    entry: ["static/ts/main.ts"],
    outDir: "static/bundle",
    tsconfig: "static/tsconfig.json",
    treeshake: true,
    format: "esm",
    platform: "browser",
    esbuildPlugins: [sassPlugin()]
  },
  {
    name: "server",
    entry: ["server/src/index.ts"],
    outDir: "server/dist",
    tsconfig: "server/tsconfig.json",
    format: "esm",
    platform: "node",
    treeshake: true,
    removeNodeProtocol: false,
    onSuccess: watch ? "npm run start" : void 0
  }
]);