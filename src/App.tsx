import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PlayOffsDashboard from "./components/structures/playoffs/PlayOffsDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={PlayOffsDashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
