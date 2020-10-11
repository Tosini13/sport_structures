import React, { useContext } from "react";
import { observer } from "mobx-react";
import { routerConstString } from "../../const/menuConst";
import { Tournament } from "../../models/tournament";

import { TournamentStoreContext } from "../../store/TournamentsStore";
import { UserStoreContext } from "../../store/UserStore";
import { NoContentTitle } from "../../styled/styledLayout";
import TournamentSummary from "./TournamentSummary";

type Props = {
  view?: routerConstString;
};

const TournamentsDashboard: React.FC<Props> = observer(({ view }) => {
  const usersStore = useContext(UserStoreContext);
  const tournamentsStore = useContext(TournamentStoreContext);

  const filterTournaments = () => {
    switch (view) {
      case routerConstString.live:
        return [];
      case routerConstString.my:
        if (usersStore.loggedIn) {
          return tournamentsStore.getUsersTournaments(usersStore.loggedIn);
        } else {
          return [];
        }
      case routerConstString.favorites:
        if (usersStore.loggedIn) {
          return tournamentsStore.getUsersFavoriteTournaments(
            usersStore.loggedIn
          );
        } else {
          return [];
        }
      default:
        return tournamentsStore.tournaments;
    }
  };
  const tournaments: Tournament[] = filterTournaments();
  return (
    <div>
      {!tournaments.length ? (
        <NoContentTitle>Brak turniejów</NoContentTitle>
      ) : null}
      {tournaments.map((tournament: Tournament) => (
        <TournamentSummary key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
});

export default TournamentsDashboard;
