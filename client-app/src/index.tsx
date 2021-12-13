import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { StoreProvider } from "./app/stores";
import reportWebVitals from "./reportWebVitals";
import App from "./app/layout/App";

import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "./app/styles/global";

ReactDOM.render(
  <StoreProvider>
    <BrowserRouter>
      <App />
      <GlobalStyles />
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById("root")
);

reportWebVitals();
