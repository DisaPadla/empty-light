import React from 'react';
import { renderToString } from 'react-dom/server';
import { resetServerContext } from 'react-beautiful-dnd';
import { ServerStyleSheet } from 'styled-components';
import App from './App';
const context = {};

module.exports = function render(req) {
  const sheet = new ServerStyleSheet();
  resetServerContext();
  const content = renderToString(sheet.collectStyles(<App />));
  const styleTags = sheet.getStyleTags();
  return { content, context, styleTags };
};
