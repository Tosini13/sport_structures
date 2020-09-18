import { Team } from "./team";

export class Match {
  winnerMatch?: Match;
  loserMatch?: Match;
  previousMatchHome?: Match;
  previousMatchAway?: Match;
  home?: Team;
  away?: Team;
  round: string;

  constructor(round: string) {
    this.round = round;
  }
}
