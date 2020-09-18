import React, { useState } from "react";
import { roundMatchesTitle } from "../../const/structures";
import { Match } from "../../models/match";

import { tournament } from "../../models/tournament";
import MatchSummary from "./MatchSummary";

const PlayOffs = () => {
  const [currentMatch, setCurrentMatch] = useState<Match>(
    tournament.bracket.placeMatches[1]
  );

  console.log(tournament.bracket.placeMatches);
  return (
    <div>
      <p>Rounds: {roundMatchesTitle.get(tournament.rounds * 2)}</p>
      <p>Match Places: {tournament.matchPlace}</p>
      <MatchSummary match={currentMatch} setCurrentMatch={setCurrentMatch} />
    </div>
  );
};

export default PlayOffs;
