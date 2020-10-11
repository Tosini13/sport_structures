import React from "react";
import { observable, action, decorate } from "mobx";
import { Tournament, TournamentData } from "../models/tournament";
import User from "../models/user";
const tournamentData: TournamentData = {
  name: "zero",
  owner: "admin",
};
const tournament = new Tournament(tournamentData);
tournament.id = 1;
const tournament2 = new Tournament({
  name: "one",
  owner: "other",
});
tournament2.id = 2;
export class TournamentStore {
  tournaments: Tournament[] = [tournament, tournament2];

  selectedTournament?: Tournament;

  addTournament = (tournament: Tournament) => {
    this.tournaments = [...this.tournaments, tournament];
  };

  getUsersTournaments = (user: User) => {
    return this.tournaments.filter(
      (tournament) => tournament.owner === user.login
    );
  };

  getUsersFavoriteTournaments = (user: User) => {
    return this.tournaments.filter(
      (tournament) =>
        tournament.id && user.favoriteTournaments.includes(tournament.id)
    );
  };
}

decorate(TournamentStore, {
  tournaments: observable,
  addTournament: action,
});

export const tournamentStore = new TournamentStore();

export const TournamentStoreContext = React.createContext(tournamentStore);
export const TournamentStoreProvider: React.FC<{}> = ({ children }) => {
  return (
    <TournamentStoreContext.Provider value={tournamentStore}>
      {children}
    </TournamentStoreContext.Provider>
  );
};
