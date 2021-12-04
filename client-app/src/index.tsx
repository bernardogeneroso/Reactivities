import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";

import GlobalStyles from "./app/styles/global";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <GlobalStyles />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(console.log);
