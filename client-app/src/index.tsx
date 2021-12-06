import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { StoreProvider } from "./app/stores";
import reportWebVitals from "./reportWebVitals";
import App from "./app/layout/App";

import "semantic-ui-css/semantic.min.css";
import GlobalStyles from "./app/styles/global";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <App />
        <GlobalStyles />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(console.log);
