import React from "react";

import { Team } from "../../models/team";
import { Match } from "../../models/match";
import { BracketRoundTitleStyled } from "../../styled/styledBracket";
import {
  BracketMatchContainerStyled,
  BracketMatchMockTeamsContainerStyled,
} from "../../styled/styledMatches";

type Props = {
  match: Match;
  teams: Team[];
};

const MatchSummaryMock: React.FC<Props> = ({ match, teams }) => {
  const home = teams.find((team) => team.id === match.home?.id);
  const away = teams.find((team) => team.id === match.away?.id);
  return (
    <BracketMatchContainerStyled>
      {match.round ? (
        <BracketRoundTitleStyled live={false}>
          {match.round}
        </BracketRoundTitleStyled>
      ) : null}
      <BracketMatchMockTeamsContainerStyled>
        <p>{home ? home.name : match.placeholder.home}</p>
        <p>vs</p>
        <p>{away ? away.name : match.placeholder.away}</p>
      </BracketMatchMockTeamsContainerStyled>
    </BracketMatchContainerStyled>
  );
};

export default MatchSummaryMock;
