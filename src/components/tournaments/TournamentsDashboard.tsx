import React, { useContext } from "react";

import { TournamentStoreContext } from "../../store/TournamentsStore";
import { NoContentTitle } from "../../styled/styledLayout";
import TournamentSummary from "./TournamentSummary";

const TournamentsDashboard = () => {
  const TournamentsStore = useContext(TournamentStoreContext);
  return (
    <div>
      {!TournamentsStore.tournaments.length ? (
        <NoContentTitle>Brak turniejów</NoContentTitle>
      ) : null}
      {TournamentsStore.tournaments.map((tournament) => (
        <TournamentSummary key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
};

export default TournamentsDashboard;
