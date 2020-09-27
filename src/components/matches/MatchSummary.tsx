import React, { useState } from "react";
import { observer } from "mobx-react";

import { Team } from "../../models/team";
import { Match } from "../../models/match";
import { BracketRoundTitleStyled } from "../../styled/styledBracket";
import MatchDetails from "./MatchDetails";
import { Game } from "../../models/game";
import {
  BracketMatchContainerStyled,
  BracketMatchTeamsContainerStyled,
  MatchResultContainerStyled,
  MatchResultScoreStyled,
  MatchTeamsAndResultStyled,
} from "../../styled/styledMatches";
import { matchModeConst } from "../../const/matchConst";

type Props = {
  game?: Game;
  match: Match;
  teams: Team[];
};

const MatchSummary: React.FC<Props> = observer(({ match, teams, game }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const home = teams.find((team) => team.id === match.home?.id);
  const away = teams.find((team) => team.id === match.away?.id);
  return (
    <>
      <BracketMatchContainerStyled onClick={handleOpen}>
        {match.round ? (
          <BracketRoundTitleStyled live={match.mode === matchModeConst.live}>
            {match.round}
          </BracketRoundTitleStyled>
        ) : null}
        <MatchTeamsAndResultStyled>
          <BracketMatchTeamsContainerStyled>
            <p>{home ? home.name : match.placeholder.home}</p>
            <p>vs</p>
            <p>{away ? away.name : match.placeholder.away}</p>
          </BracketMatchTeamsContainerStyled>
          <MatchResultContainerStyled>
            <MatchResultScoreStyled>
              {match.result?.home}
            </MatchResultScoreStyled>
            :
            <MatchResultScoreStyled>
              {match.result?.away}
            </MatchResultScoreStyled>
          </MatchResultContainerStyled>
        </MatchTeamsAndResultStyled>
      </BracketMatchContainerStyled>
      <MatchDetails
        match={match}
        open={open}
        setOpen={setOpen}
        gameIsFinished={game?.isFinished}
      />
    </>
  );
});

export default MatchSummary;
