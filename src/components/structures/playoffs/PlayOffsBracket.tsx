import React from "react";
import { observer } from "mobx-react";


import { roundMatchesTitle } from "../../../const/structures";
import GameSummaryRecursive from "../games/GameSummaryRecursive";
import { tournament } from "../../../models/tournament";
import {
  BracketSectionContainerStyled,
  WholeBracketContainerStyled,
} from "../../../styled/styledBracket";

const PlayOffsBracket = observer(() => {
  return (
    <>
      {tournament.rounds ? <p>Rounds: {roundMatchesTitle.get(tournament.rounds)}</p> : null}
      {tournament.matchPlace ? <p>Match Places: {tournament.matchPlace}</p> : null}
      <WholeBracketContainerStyled>
        {tournament.bracket?.placeMatches.map((game) => (
          <BracketSectionContainerStyled key={game.round}>
            <GameSummaryRecursive game={game} />
          </BracketSectionContainerStyled>
        ))}
      </WholeBracketContainerStyled>
    </>
  );
});

export default PlayOffsBracket;
