import React from "react";

import { Tournament } from "../../../models/tournament";
import AddTeam from "../../teams/AddTeam";
import TeamList from "../../teams/TeamList";

type Props = {
  tournament: Tournament;
};

const TournamentTeams: React.FC<Props> = ({ tournament }) => {
  return (
    <>
      <TeamList tournament={tournament} />
      <AddTeam tournament={tournament} />
    </>
  );
};

export default TournamentTeams;
