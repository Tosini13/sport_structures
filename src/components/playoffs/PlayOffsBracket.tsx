import React from "react";
import { observer } from "mobx-react";
import { Bracket } from "../../models/bracket";
import { Game } from "../../models/game";
import { BracketSectionContainerStyled } from "../../styled/styledBracket";
import GameSummaryRecursive from "../games/GameSummaryRecursive";
import { Team } from "../../models/team";

type Props = {
  bracket: Bracket;
  teams: Team[];
};

const PlayOffsBracket: React.FC<Props> = observer(({ bracket, teams }) => {
  return (
    <>
      {bracket.placeMatches.map((game: Game) => (
        <BracketSectionContainerStyled key={game.round}>
          <GameSummaryRecursive game={game} teams={teams} />
        </BracketSectionContainerStyled>
      ))}
    </>
  );
});

export default PlayOffsBracket;
