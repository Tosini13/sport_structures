import { action, observable } from "mobx";
import { Bracket } from "./bracket";
import { Team } from "./team";

const mockTeamNames = [
  "Barca",
  "Real",
  "Atletico",
  "Sevilla",
  "Valencia",
  "PSG",
  "Lyon",
  "Juve",
  "Inter",
  "Milan",
  "Napoli",
  "Lazio",
  "Atalanta",
  "Roma",
  "Manchester City",
  "Liverpool",
  "Manchester United",
  "Chelsea",
  "Arsenal",
  "Tottenham",
];

export class Tournament {
  bracket?: Bracket;
  @observable rounds?: number;
  @observable matchPlace?: number;

  @action
  setRounds = (rounds: number) => {
    this.rounds = rounds;
    this.createBracket();
  };

  @action
  setMatchPlace = (matchPlace: number) => {
    if (this.rounds && matchPlace < this.rounds * 2) {
      this.matchPlace = matchPlace;
      this.createBracket();
    }
  };

  createBracket = () => {
    if (this.rounds && this.matchPlace) {
      this.bracket = new Bracket(this.rounds, this.matchPlace);
    }
  };

  constructor() {
    this.rounds = 8;
    this.matchPlace = 15;
    this.createBracket();
    //temporary
    const teams: Team[] = mockTeamNames.map((team) => new Team(team));
    this.bracket?.initBracketWithMatches(teams);
  }
}

export const tournament = new Tournament();

export type TournamentData = {
  bracket?: Bracket;
  rounds?: number;
  matchPlace?: number;
};
