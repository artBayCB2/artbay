import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "./store.jsx";
import App from "./App.jsx";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
