const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  experiments: {
    futureDefaults: true,
  },
  entry: {
    app: "./frontend/app.ts",
    serviceWorker: "./frontend/serviceWorker.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,

        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    // filename: "bundle.js",
    path: path.resolve(__dirname, "dist/bundle"),
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
