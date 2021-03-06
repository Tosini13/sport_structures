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

type Props = {
  match: Game;
  setCurrentMatch: (match: Game) => void;
};

const MatchSummary: React.FC<Props> = ({ match, setCurrentMatch }) => {
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
        {getLink(match.previousMatchHome, "Previous match home")}
        {getLink(match.previousMatchAway, "Previous match away")}
      </PreviousGamesContainerStyled>
      <CurrentGameStyled>
        <GameTitle>{match.round}</GameTitle>
      </CurrentGameStyled>
      <NextGamesContainerStyled>
        {getLink(match.winnerMatch, "Winner match")}
        {getLink(match.loserMatch, "Loser match")}
      </NextGamesContainerStyled>
    </GamesContainerStyled>
  );
};

export default MatchSummary;
