import React from "react";
import { Game } from "../../models/game";
import { Team } from "../../models/team";
import MatchSummaryMock from "../matches/MatchSummaryMock";

type Props = {
  game: Game;
  teams: Team[];
};
const GameSummaryRecursiveMock: React.FC<Props> = ({ game, teams }) => {
  const lastMatch =
    game.previousMatchHome?.loserMatch === game ||
    game.previousMatchAway?.loserMatch === game;
  return (
    <>
      <MatchSummaryMock match={game.match} teams={teams} />
      {!lastMatch && game.previousMatchHome ? (
        <GameSummaryRecursiveMock game={game.previousMatchHome} teams={teams} />
      ) : null}
      {!lastMatch && game.previousMatchAway ? (
        <GameSummaryRecursiveMock game={game.previousMatchAway} teams={teams} />
      ) : null}
    </>
  );
};

export default GameSummaryRecursiveMock;
