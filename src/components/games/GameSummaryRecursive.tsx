import React from "react";
import { Game } from "../../models/game";
import { Team } from "../../models/team";
import MatchSummary from "../matches/MatchSummary";

type Props = {
  game: Game;
  teams: Team[];
};
const GameSummaryRecursive: React.FC<Props> = ({ game, teams }) => {
  const lastMatch =
    game.previousMatchHome?.loserMatch === game ||
    game.previousMatchAway?.loserMatch === game;
  return (
    <>
      <MatchSummary match={game.match} teams={teams} game={game} />
      {!lastMatch && game.previousMatchHome ? (
        <GameSummaryRecursive game={game.previousMatchHome} teams={teams} />
      ) : null}
      {!lastMatch && game.previousMatchAway ? (
        <GameSummaryRecursive game={game.previousMatchAway} teams={teams} />
      ) : null}
    </>
  );
};

export default GameSummaryRecursive;
