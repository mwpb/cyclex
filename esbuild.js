let isDev = false;
if (process.argv.includes("dev")) isDev = true;

require("esbuild").buildSync({
  entryPoints: ["frontend/app.ts"],
  outfile: "dist/bundle/app.js",
  bundle: true,
  format: "esm",
  minify: !isDev,
  watch: isDev,
  sourcemap: isDev
});
