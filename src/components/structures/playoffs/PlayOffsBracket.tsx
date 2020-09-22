import React from "react";
import { roundMatchesTitle } from "../../../const/structures";

import GameSummaryRecursive from "../games/GameSummaryRecursive";
import { tournament } from "../../../models/tournament";
import {
  BracketSectionContainerStyled,
  WholeBracketContainerStyled,
} from "../../../styled/styledBracket";

const PlayOffsBracket = () => {
  console.log(tournament.bracket.placeMatches);
  return (
    <>
      <p>Rounds: {roundMatchesTitle.get(tournament.rounds * 2)}</p>
      <p>Match Places: {tournament.matchPlace}</p>
      <WholeBracketContainerStyled>
        {tournament.bracket.placeMatches.map((match) => (
          <BracketSectionContainerStyled key={match.round}>
            <GameSummaryRecursive match={match} />
          </BracketSectionContainerStyled>
        ))}
      </WholeBracketContainerStyled>
    </>
  );
};

export default PlayOffsBracket;
