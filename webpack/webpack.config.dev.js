const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  entry: ["webpack-hot-middleware/client", "./src/client.js"],
  output: {
    path: path.resolve(__dirname, "../assets"),
    filename: "[name].js",
    publicPath: "/"
  },

  mode: "development",
  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  plugins: [new webpack.HotModuleReplacementPlugin()]
};