import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { StylesProvider } from "@material-ui/core/styles";
import { TournamentStoreProvider } from "./store/TournamentsStore";
import { RouterStateProvider } from "./store/RouterState";

ReactDOM.render(
  // <React.StrictMode>
  <RouterStateProvider>
    <TournamentStoreProvider>
      <StylesProvider injectFirst>
        <App />
      </StylesProvider>
    </TournamentStoreProvider>
  </RouterStateProvider>,
  // </React.StrictMode>
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// serviceWorker.register();
