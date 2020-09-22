import { Match } from "./match";

export class Game {
  winnerMatch?: Game;
  loserMatch?: Game;
  previousMatchHome?: Game;
  previousMatchAway?: Game;
  round: string;
  match: Match;
  returnMatch?: Match;

  set setWinnerMatch(winnerMatch: Game) {
    this.winnerMatch = winnerMatch;
  }

  set setLoserMatch(loserMatch: Game) {
    this.loserMatch = loserMatch;
  }

  set setPreviousMatchHome(previousMatchHome: Game) {
    this.previousMatchHome = previousMatchHome;
    this.setHomeString(`${previousMatchHome.round}`);
  }

  set setPreviousMatchAway(previousMatchAway: Game) {
    this.previousMatchAway = previousMatchAway;
    this.setAwayString(`${previousMatchAway.round}`);
  }

  setHomeString = (placeHolder: string) => {
    this.match.placeholder.home = placeHolder;
    if (this.returnMatch) {
      this.returnMatch.placeholder.away = placeHolder;
    }
  };

  setAwayString = (placeHolder: string) => {
    this.match.placeholder.away = placeHolder;
    if (this.returnMatch) {
      this.returnMatch.placeholder.home = placeHolder;
    }
  };

  constructor(round: string, returnMatch: boolean) {
    this.round = round;
    this.match = new Match(this.round);
    if (returnMatch) {
      this.returnMatch = new Match(`${this.round} - returnMatch`);
    }
  }
}
