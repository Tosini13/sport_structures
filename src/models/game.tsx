import { observable } from "mobx";
import { matchModeConst } from "../const/matchConst";
import { Id } from "../const/structures";
import { Match } from "./match";
import { Team } from "./team";

export class Game {
  id: Id;
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

  winnerTeam = (match: Match, returnMatch?: Match) => {
    if (match.result === undefined) return false;
    let home = match.result.home;
    let away = match.result.away;
    if (returnMatch?.result !== undefined) {
      home += returnMatch.result.away;
      away += returnMatch.result.home;
    }
    const result = home - away;
    if (result > 0) return match.home;
    if (result < 0) return match.away;
    if (result === 0) {
      if (returnMatch?.result !== undefined) {
        if (returnMatch.result.away > match.result.away) return match.home;
        if (returnMatch.result.away < match.result.away) return match.away;
        if (returnMatch.result.away === match.result.away) return false; //temporary
      } else {
        return false; //temporary
      }
    }
  };

  loserTeam = (winnerTeam: Team | false | undefined) => {
    if (winnerTeam === this.match.home) {
      return this.match.away;
    }
    if (winnerTeam === this.match.away) {
      return this.match.home;
    }
    return false;
  };

  promoteTeam = (team: Team | undefined) => {
    if (this.winnerMatch?.previousMatchHome === this) {
      this.winnerMatch.match.setHome(team);
      if (this.winnerMatch.returnMatch) {
        this.winnerMatch.returnMatch.setAway(team);
      }
    }
    if (this.winnerMatch?.previousMatchAway === this) {
      this.winnerMatch.match.setAway(team);
      if (this.winnerMatch.returnMatch) {
        this.winnerMatch.returnMatch.setHome(team);
      }
    }
  };

  demoteTeam = (team: Team | undefined) => {
    if (this.loserMatch?.previousMatchHome === this) {
      this.loserMatch.match.setHome(team);
      if (this.loserMatch.returnMatch) {
        this.loserMatch.returnMatch.setAway(team);
      }
    }
    if (this.loserMatch?.previousMatchAway === this) {
      this.loserMatch.match.setAway(team);
      if (this.loserMatch.returnMatch) {
        this.loserMatch.returnMatch.setHome(team);
      }
    }
  };

  isFinished = () => {
    let isFinished = this.match.mode === matchModeConst.finished;
    if (this.returnMatch && isFinished) {
      isFinished = this.returnMatch.mode === matchModeConst.finished;
    }
    if (isFinished && this.match.result) {
      const promoted = this.winnerTeam(this.match, this.returnMatch);
      const demoted = this.loserTeam(promoted);
      if (promoted) {
        this.promoteTeam(promoted);
      } else {
        this.promoteTeam(undefined);
      }
      if (demoted) {
        this.demoteTeam(demoted);
      } else {
        this.demoteTeam(undefined);
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
