import { Bracket } from "./bracket";

export class Tournament {
  bracket: Bracket;
  rounds: number = 16;
  matchPlace: number = 45;

  constructor() {
    this.bracket = new Bracket(this.rounds, this.matchPlace);
  }
}

export const tournament = new Tournament();
