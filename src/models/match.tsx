import { Team } from "./team";
import { Result, TeamsPlaceholder } from "../const/structures";
import { matchModeConst } from "../const/matchConst";
import { action, observable } from "mobx";

export class Match {
  home?: Team;
  away?: Team;
  placeholder: TeamsPlaceholder;
  @observable result?: Result;
  round: string;
  @observable mode: matchModeConst;

  @action
  homeScored = () => {
    if (this.mode === matchModeConst.live && this.result) {
      this.result.home++;
    }
  };

  @action
  awayScored = () => {
    if (this.mode === matchModeConst.live && this.result) {
      this.result.away++;
    }
  };

  @action
  homeResultLess = () => {
    if (
      this.mode === matchModeConst.live &&
      this.result &&
      this.result.home > 0
    ) {
      this.result.home--;
    }
  };

  @action
  awayResultLess = () => {
    if (
      this.mode === matchModeConst.live &&
      this.result &&
      this.result.away > 0
    ) {
      this.result.away--;
    }
  };

  @action
  finishMatch = () => {
    this.mode = matchModeConst.finished;
  };

  @action
  startMatch = () => {
    this.mode = matchModeConst.live;
    this.result = {
      home: 0,
      away: 0,
    };
  };

  @action
  continueMatch = () => {
    this.mode = matchModeConst.live;
    if (!this.result) {
      this.result = {
        home: 0,
        away: 0,
      };
    }
  };

  @action
  resetMatch = () => {
    this.mode = matchModeConst.notStarted;
    this.result = undefined;
  };

  constructor(round: string) {
    this.round = round;
    this.placeholder = {
      home: "no team",
      away: "no team",
    };
    this.mode = matchModeConst.notStarted;
  }
}

export type MatchData = {
  home?: Team | string;
  away?: Team | string;
  placeholder: TeamsPlaceholder;
  result?: Result;
  round: string;
};
