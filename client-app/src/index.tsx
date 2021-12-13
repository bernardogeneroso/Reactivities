import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { StoreProvider } from "./app/stores";
import reportWebVitals from "./reportWebVitals";
import App from "./app/layout/App";

import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import GlobalStyles from "./app/styles/global";

export const history = createBrowserHistory();

ReactDOM.render(
  <StoreProvider>
    <Router {...{ history }}>
      <App />
      <GlobalStyles />
    </Router>
  </StoreProvider>,
  document.getElementById("root")
);

reportWebVitals();
