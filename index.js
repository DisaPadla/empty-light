const express = require("express"),
  app = express(),
  template = require("./views/template");
path = require("path");
const webpack = require("webpack");
const webpackConfig = require("./webpack/webpack.config");
const compiler = webpack(webpackConfig);

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);
app.use(require("webpack-hot-middleware")(compiler));
app.use("/assets", express.static(path.resolve(__dirname, "assets")));

// hide powered by express
app.disable("x-powered-by");
// start the server
app.listen(process.env.PORT || 7052);

//SSR function import
const ssr = require("./views/server");
// server rendered home page
app.get("*", (req, res) => {
  const { content, context, styleTags } = ssr(req);
  const response = template(content, styleTags);
  res.setHeader("Cache-Control", "assets, max-age=604800");
  res.write(response);
  res.end();
});
