import React, { useState } from "react";
import { observer } from "mobx-react";

import { roundMatchesTitle } from "../../../const/structures";
import { Game } from "../../../models/game";
import { tournament } from "../../../models/tournament";
import GameSummaryLinks from "../games/GameSummaryLinks";

const PlayOffsRound = observer(() => {
  const [currentMatch, setCurrentMatch] = useState<Game | undefined>(
    tournament.bracket?.placeMatches[1]
  );

  return (
    <div>
      {tournament.rounds ? <p>Rounds: {roundMatchesTitle.get(tournament.rounds)}</p> : null}
      {tournament.matchPlace ? <p>Match Places: {tournament.matchPlace}</p> : null}
      {currentMatch ? (
        <GameSummaryLinks
          game={currentMatch}
          setCurrentMatch={setCurrentMatch}
        />
      ) : null}
    </div>
  );
});

export default PlayOffsRound;
