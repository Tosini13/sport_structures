import React from "react";
import { observer } from "mobx-react";

import { Team } from "../../models/team";
import { Tournament } from "../../models/tournament";
import { TeamListStyled } from "../../styled/styledTeams";

import TeamSummary from "./TeamSummary";

type Props = {
  tournament: Tournament;
};

const TeamList: React.FC<Props> = observer(({ tournament }) => {
  const handleDeleteTeam = (team: Team) => {
    tournament.deleteTeam(team);
  };

  const handleEditTeam = (team: Team) => {
    tournament.editTeam(team);
  };

  return (
    <TeamListStyled>
      {tournament.teams.map((team: Team) => {
        return (
          <TeamSummary
            key={team.id}
            team={team}
            handleDeleteTeam={handleDeleteTeam}
            handleEditTeam={handleEditTeam}
          />
        );
      })}
    </TeamListStyled>
  );
});

export default TeamList;
