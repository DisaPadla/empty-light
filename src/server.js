import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { resetServerContext } from "react-beautiful-dnd";
import { ServerStyleSheet } from "styled-components";
import App from "./App";
const context = {};

module.exports = function render(req) {
  const sheet = new ServerStyleSheet();
  resetServerContext();
  const content = renderToString(
    sheet.collectStyles(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )
  );
  const styleTags = sheet.getStyleTags();
  return { content, context, styleTags };
};
