import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { menuTournamentConst } from "../../../const/menuConst";
import { TournamentStoreContext } from "../../../store/TournamentsStore";
import TournamentTeams from "./TournamentTeams";
import TournamentMenu from "./TournamentMenu";
import TournamentPlayOffs from "./TournamentPlayOffs";
import { ContentContainerStyled } from "../../../styled/styledLayout";

const TournamentDetails = () => {
  const [view, setView] = useState<menuTournamentConst>(
    menuTournamentConst.playoffs
  );
  const { id } = useParams<{ id: string }>();
  const tournamentsStore = useContext(TournamentStoreContext);
  const tournament = tournamentsStore.tournaments.find(
    (tournament) => tournament.id?.toString() === id.toString()
  );
  return (
    <>
      <TournamentMenu id={tournament?.id} view={view} setView={setView} />
      <ContentContainerStyled>
        {view === menuTournamentConst.playoffs && tournament ? (
          <TournamentPlayOffs tournament={tournament} />
        ) : null}
        {view === menuTournamentConst.teams && tournament ? (
          <TournamentTeams tournament={tournament} />
        ) : null}
      </ContentContainerStyled>
    </>
  );
};

export default TournamentDetails;
