import React from "react";
import { Game } from "../../models/game";
import { GameTitle } from "../../styled/styledGame";

type Props = {
  game: Game;
};

const GameSummaryRecursive: React.FC<Props> = ({ game }) => {
  const lastMatch =
  game.previousMatchHome?.loserMatch === game ||
    game.previousMatchAway?.loserMatch === game;
  return (
    <>
      <div>
        <GameTitle>id: {game.id} - {game.round}</GameTitle>
      </div>
      {!lastMatch && game.previousMatchHome ? (
        <GameSummaryRecursive game={game.previousMatchHome} />
      ) : null}
      {!lastMatch && game.previousMatchAway ? (
        <GameSummaryRecursive game={game.previousMatchAway} />
      ) : null}
    </>
  );
};

export default GameSummaryRecursive;
