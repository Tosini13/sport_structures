import React from "react";
import { Game } from "../../../models/game";
import { GameTitle } from "../../../styled/styledGame";

type Props = {
  match: Game;
};

const GameSummaryRecursive: React.FC<Props> = ({ match }) => {
  return (
    <>
      <div>
        <GameTitle>{match.round}</GameTitle>
      </div>
      {match.previousMatchHome ? (
        <GameSummaryRecursive match={match.previousMatchHome} />
      ) : null}
      {match.previousMatchAway ? (
        <GameSummaryRecursive match={match.previousMatchAway} />
      ) : null}
    </>
  );
};

export default GameSummaryRecursive;
