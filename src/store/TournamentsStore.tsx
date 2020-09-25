import React from "react";
import { observable, action, decorate } from "mobx";
import { Tournament } from "../models/tournament";
const tournament = new Tournament("zero");
tournament.id = 0;
const tournament2 = new Tournament("one");
tournament2.id = 1;
export class TournamentStore {
  tournaments: Tournament[] = [tournament, tournament2];

  selectedTournament?: Tournament;

  addTournament = (tournament: Tournament) => {
    this.tournaments = [...this.tournaments, tournament];
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
