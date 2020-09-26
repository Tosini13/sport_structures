import { action, observable } from "mobx";
import moment from "moment";
import { bracketDbApi } from "./dbAPI/bracketData";
import { Bracket } from "./bracket";
import { Team } from "./team";
import { Id } from "../const/structures";
import { Group } from "./group";

const mockTeams = [
  { name: "FC Barcelona", id: 0 },
  { name: "Real Madrid", id: 1 },
  { name: "Atletico Madrid", id: 2 },
  { name: "Sevilla FC", id: 3 },
  { name: "Athletic Bilbao", id: 4 },
  { name: "Valencia", id: 5 },
  { name: "Getafe", id: 6},
  { name: "Eibar", id: 7 },
  { name: "Malaga", id: 8 },
  { name: "U.D. Las Palmas", id: 9 },
  { name: "Real Sociedad", id: 10 },
];

export class Tournament {
  id?: Id;
  date: string = moment().format();
  name: string;
  bracket?: Bracket;
  groups?: Group[];
  @observable teams: Team[] = mockTeams;
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
    this.createBracket(this.rounds, 1);
  };

  @action
  setMatchPlace = (matchPlace: number) => {
    if (this.rounds && matchPlace < this.rounds * 2) {
      this.matchPlace = matchPlace;
      this.createBracket(this.rounds, this.matchPlace);
    }
  };

  @action
  createBracket = (rounds: number, placeMatchesQtt: number) => {
    this.bracket = new Bracket(rounds, placeMatchesQtt);
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
