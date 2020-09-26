import React from "react";

import { Team } from "../../models/team";
import { Match } from "../../models/match";
import {
  BracketMatchContainerStyled,
  BracketMatchTeamsContainerStyled,
  BracketRoundTitleStyled,
} from "../../styled/styledBracket";

type Props = {
  match: Match;
  teams: Team[];
};

const MatchMock: React.FC<Props> = ({ match, teams }) => {
  let i = 0;
  const home = teams.find((team) => team.id === match.home);
  const away = teams.find((team) => team.id === match.away);
  return (
    <BracketMatchContainerStyled key={i++}>
      {match.round ? (
        <BracketRoundTitleStyled>{match.round}</BracketRoundTitleStyled>
      ) : null}
      <BracketMatchTeamsContainerStyled>
        <p>{match.home ? match.home.name : match.placeholder.home}</p>
        <p>vs</p>
        <p>{match.away ? match.away.name : match.placeholder.away}</p>
      </BracketMatchTeamsContainerStyled>
    </BracketMatchContainerStyled>
  );
};

export default MatchMock;
