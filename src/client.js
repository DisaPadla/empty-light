import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("container")
);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NewApp = require("./App").default;
    hydrate(
      <BrowserRouter>
        <NewApp />
      </BrowserRouter>,
      document.getElementById("container")
    );
  });
}
