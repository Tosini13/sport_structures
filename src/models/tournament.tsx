import { action, observable } from "mobx";
import moment from "moment";
import { bracketDbApi } from "./dbAPI/bracketData";
import { Bracket } from "./bracket";
import { Team } from "./team";
import { Id } from "../const/structures";

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
  id?: Id;
  date: string = moment().format();
  name: string;
  bracket?: Bracket;
  @observable teams: Team[] = [];
  @observable rounds?: number;
  @observable matchPlace?: number;

  @action
  addTeam = (team: Team) => {
    this.teams = [...this.teams, team];
  };

  @action
  deleteTeam = (teamToDelete: Team) => {
    const teams = this.teams.filter((team) => team.id !== teamToDelete.id);
    this.teams = [...teams];
  };

  @action
  editTeam = (teamToEdit: Team) => {
    this.teams.forEach((team) => {
      if (team.id === teamToEdit.id) {
        team = teamToEdit;
      }
    });
  };

  @action
  setRounds = (rounds: number) => {
    if (this.matchPlace && rounds * 2 < this.matchPlace) {
      this.matchPlace = rounds * 2 - 1;
    }
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

  convertBracket = () => {
    if (this.bracket) {
      return bracketDbApi.convertBracket(this.bracket);
    }
  };

  constructor(name: string) {
    this.name = name;
    // this.rounds = 8;
    // this.matchPlace = 15;
    // this.createBracket();
    // //temporary
    // const teams: Team[] = mockTeamNames.map((team) => new Team(team));
    // this.bracket?.initBracketWithMatches(teams);
  }
}

export const tournament = new Tournament("no one");

export type TournamentData = {
  bracket?: Bracket;
  rounds?: number;
  matchPlace?: number;
};
