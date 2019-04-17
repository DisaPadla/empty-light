const express = require('express');
const app = express();
const template = require('./views/template');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack/webpack.config');
const compiler = webpack(webpackConfig);
const ssr = require('./views/server');
app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);
app.use(require('webpack-hot-middleware')(compiler));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

app.disable('x-powered-by');
app.listen(process.env.PORT || 7052);

app.get('*', (req, res) => {
  const { content, context, styleTags } = ssr(req);
  const response = template(content, styleTags);
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.write(response);
  res.end();
});
