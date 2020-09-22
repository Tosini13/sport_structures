import React from "react";
import { Game } from "../../../models/game";
import { GameTitle } from "../../../styled/styledGame";

type Props = {
  match: Game;
};

const GameSummaryRecursive: React.FC<Props> = ({ match }) => {
  const lastMatch =
    match.previousMatchHome?.loserMatch === match ||
    match.previousMatchAway?.loserMatch === match;
  return (
    <>
      <div>
        <GameTitle>{match.round}</GameTitle>
      </div>
      {!lastMatch && match.previousMatchHome ? (
        <GameSummaryRecursive match={match.previousMatchHome} />
      ) : null}
      {!lastMatch && match.previousMatchAway ? (
        <GameSummaryRecursive match={match.previousMatchAway} />
      ) : null}
    </>
  );
};

export default GameSummaryRecursive;
