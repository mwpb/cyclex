let isDev = false;
if (process.argv.includes("dev")) isDev = true;

require("esbuild").build({
  entryPoints: ["frontend/app.ts"],
  outfile: "dist/bundle/app.js",
  bundle: true,
  format: "esm",
  minify: !isDev,
  watch: isDev,
  sourcemap: isDev
});

require("esbuild").build({
  entryPoints: ["frontend/serviceWorker.ts"],
  outfile: "dist/bundle/serviceWorker.js",
  bundle: true,
  format: "esm",
  minify: !isDev,
  watch: isDev,
  sourcemap: isDev
});
