import React from "react";
import { Game } from "../../../models/game";
import {
  GamesContainerStyled,
  CurrentGameStyled,
  GameStyled,
  PreviousGamesContainerStyled,
  NextGamesContainerStyled,
  GameCaption,
  GameTitle,
} from "../../../styled/styledGame";
import MatchSummary from "../matches/MatchSummary";

type Props = {
  match: Game;
  setCurrentMatch: (match: Game) => void;
};

const GameSummaryLinks: React.FC<Props> = ({ match, setCurrentMatch }) => {
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
        <MatchSummary match={match.match} />
      </CurrentGameStyled>
      <NextGamesContainerStyled>
        {getLink(match.winnerMatch, "Winner match")}
        {getLink(match.loserMatch, "Loser match")}
      </NextGamesContainerStyled>
    </GamesContainerStyled>
  );
};

export default GameSummaryLinks;
