import { observable } from "mobx";
import { matchModeConst } from "../const/matchConst";
import { Match } from "./match";

export class Game {
  id: number;
  winnerMatch?: Game;
  loserMatch?: Game;
  previousMatchHome?: Game;
  previousMatchAway?: Game;
  round: string;
  @observable match: Match;
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

  isFinished = () => {
    let isFinished = this.match.mode === matchModeConst.finished;
    if (this.returnMatch && isFinished) {
      isFinished = this.returnMatch.mode === matchModeConst.finished;
    }
    if (isFinished && this.match.result) {
      if (this.match.result.home > this.match.result.away) {
        console.log(this.match.home?.name);
        if (this.winnerMatch?.previousMatchHome === this) {
          // this.winnerMatch.match.home = this.match.home;
        }
      } else {
        console.log(this.match.away?.name);
      }
    }
    return isFinished;
  };

  constructor(id: number, round: string, returnMatch: boolean) {
    this.id = id;
    this.round = round;
    this.match = new Match(this.round);
    if (returnMatch) {
      this.returnMatch = new Match(`${this.round} - returnMatch`);
    }
  }
}
