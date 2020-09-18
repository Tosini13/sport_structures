import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PlayOffs from "./components/structures/PlayOffs";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={PlayOffs} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
