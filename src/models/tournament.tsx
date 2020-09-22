import { action, observable } from "mobx";
import { Bracket } from "./bracket";

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
}

export const tournament = new Tournament();

export type TournamentData = {
  bracket?: Bracket;
  rounds?: number;
  matchPlace?: number;
};
