import React from "react";
import { Game } from "../../models/game";
import {
  GamesContainerStyled,
  CurrentGameStyled,
  GameStyled,
  PreviousGamesContainerStyled,
  NextGamesContainerStyled,
  GameCaption,
  GameTitle,
} from "../../styled/styledGame";
import MatchSummary from "../matches/MatchSummary";

type Props = {
  game: Game;
  setCurrentMatch: (match: Game) => void;
};

const GameSummaryLinks: React.FC<Props> = ({ game, setCurrentMatch }) => {
  const getLink = (match: Game | undefined, title: string) => {
    return match ? (
      <GameStyled onClick={() => setCurrentMatch(match)}>
        <GameCaption>{title}:</GameCaption>
        <GameTitle>{match.round}</GameTitle>
      </GameStyled>
    ) : null;
  };

  return (
    <GamesContainerStyled>
      <PreviousGamesContainerStyled>
        {getLink(game.previousMatchHome, "Previous match home")}
        {getLink(game.previousMatchAway, "Previous match away")}
      </PreviousGamesContainerStyled>
      <CurrentGameStyled>
        <GameTitle>{game.round}</GameTitle>
        {/* <MatchSummary match={game.match} gameIsFinished={game.isFinished} /> */}
      </CurrentGameStyled>
      <NextGamesContainerStyled>
        {getLink(game.winnerMatch, "Winner match")}
        {getLink(game.loserMatch, "Loser match")}
      </NextGamesContainerStyled>
    </GamesContainerStyled>
  );
};

export default GameSummaryLinks;
