import { action, observable } from "mobx";
import moment from "moment";
import { bracketDbApi } from "./dbAPI/bracketData";
import { Bracket } from "./bracket";
import { Team } from "./team";
import { Id } from "../const/structures";
import { GroupStage } from "./groupStage";
import { Login } from "../const/userConst";

const mockTeams = [
  { name: "FC Barcelona", id: 0 },
  { name: "Real Madrid", id: 1 },
  { name: "Atletico Madrid", id: 2 },
  { name: "Sevilla FC", id: 3 },
  { name: "Athletic Bilbao", id: 4 },
  { name: "Valencia", id: 5 },
  { name: "Getafe", id: 6 },
  { name: "Eibar", id: 7 },
  { name: "Malaga", id: 8 },
  { name: "U.D. Las Palmas", id: 9 },
  { name: "Real Sociedad", id: 10 },
];

export class Tournament {
  id?: Id;
  owner: Login;
  date: string = moment().format();
  name: string;
  @observable bracket?: Bracket;
  @observable groupStage?: GroupStage;
  @observable teams: Team[] = mockTeams;
  matchTimeInGroup?: number = 5;
  breakTimeInGroup?: number = 1;
  matchTimeInBracket?: number = 6;
  breakTimeInBracket?: number = 2;
  fields: number = 3;

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
  deleteGroups = () => {
    this.groupStage = undefined;
  };

  @action
  deletePlayOffs = () => {
    this.bracket = undefined;
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

  constructor(tournament: TournamentData) {
    this.name = tournament.name;
    this.owner = tournament.owner;
  }
}

const tournamentData: TournamentData = {
  name: "no one",
  owner: "admin",
};
export const tournament: Tournament = new Tournament(tournamentData);

export type TournamentData = {
  name: string;
  owner: Login;
  bracket?: Bracket;
  rounds?: number;
  matchPlace?: number;
  matchTimeInGroup?: number;
  breakTimeInGroup?: number;
  matchTimeInBracket?: number;
  breakTimeInBracket?: number;
  fields?: number;
};
