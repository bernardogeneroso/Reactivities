import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";

import "semantic-ui-css/semantic.min.css";
import GlobalStyles from "./app/styles/global";
import { StoreProvider } from "./app/stores";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
      <GlobalStyles />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(console.log);
