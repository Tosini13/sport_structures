import React, { useState } from "react";

import { menuPlayOffsConst } from "../../../const/menuConst";
import PlayOffsBracket from "./PlayOffsBracket";
import PlayOffsRound from "./PlayOffsRound";

const PlayOffsDashboard = () => {
  const [view, setView] = useState(menuPlayOffsConst.bracket);

  return (
    <div>
      <div>
        <p onClick={() => setView(menuPlayOffsConst.round)}>Round</p>
        <p onClick={() => setView(menuPlayOffsConst.bracket)}>Bracket</p>
      </div>
      {view === menuPlayOffsConst.round ? <PlayOffsRound /> : null}
      {view === menuPlayOffsConst.bracket ? <PlayOffsBracket /> : null}
    </div>
  );
};

export default PlayOffsDashboard;
