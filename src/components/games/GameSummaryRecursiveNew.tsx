import React from "react";
import { Game } from "../../models/game";
import { Team } from "../../models/team";
import MatchMock from "../matches/MatchMock";

type Props = {
  game: Game;
  teams: Team[];
};
const GameSummaryRecursiveNew: React.FC<Props> = ({ game, teams }) => {
  const lastMatch =
    game.previousMatchHome?.loserMatch === game ||
    game.previousMatchAway?.loserMatch === game;
  return (
    <>
      <MatchMock match={game.match} teams={teams} />
      {!lastMatch && game.previousMatchHome ? (
        <GameSummaryRecursiveNew game={game.previousMatchHome} teams={teams} />
      ) : null}
      {!lastMatch && game.previousMatchAway ? (
        <GameSummaryRecursiveNew game={game.previousMatchAway} teams={teams} />
      ) : null}
    </>
  );
};

export default GameSummaryRecursiveNew;
