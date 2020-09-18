import { Team } from "./team";

export class Game {
    winnerMatch?: Game;
    loserMatch?: Game;
    previousMatchHome?: Game;
    previousMatchAway?: Game;
    home?: Team;
    away?: Team;
    round: string;
  
    constructor(round: string) {
      this.round = round;
    }
  }
  