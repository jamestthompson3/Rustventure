const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js"
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin(["index.html"]),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, ".")
    })
  ]
};
