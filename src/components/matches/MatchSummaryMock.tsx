import React from "react";

import { Team } from "../../models/team";
import { Match } from "../../models/match";
import {
  MatchContainerStyled,
  MatchRoundTitleStyled,
  MatchMockTeamsContainerStyled,
} from "../../styled/styledMatch";

type Props = {
  match: Match;
  teams: Team[];
};

const MatchSummaryMock: React.FC<Props> = ({ match, teams }) => {
  const home = teams.find((team) => team.id === match.home?.id);
  const away = teams.find((team) => team.id === match.away?.id);
  return (
    <MatchContainerStyled>
      {match.round ? (
        <MatchRoundTitleStyled live={false}>
          Round {match.round}
        </MatchRoundTitleStyled>
      ) : null}
      <MatchMockTeamsContainerStyled>
        <p>{home ? home.name : match.placeholder.home}</p>
        <p>vs</p>
        <p>{away ? away.name : match.placeholder.away}</p>
      </MatchMockTeamsContainerStyled>
    </MatchContainerStyled>
  );
};

export default MatchSummaryMock;
