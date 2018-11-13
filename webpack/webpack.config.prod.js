const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: "./src/client.js",
  output: {
    path: path.resolve(__dirname, "../assets"),
    filename: "[name].js",
    publicPath: "/"
  },

  mode: "production",
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

  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
};
