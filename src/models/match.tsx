import { Team } from "./team";
import { Result, TeamsPlaceholder } from "../const/structures";

export class Match {
  home?: Team | string;
  away?: Team | string;
  placeholder: TeamsPlaceholder;
  result?: Result;
  round: string;

  constructor(round: string) {
    this.round = round;
    this.placeholder = {
      home: "no team",
      away: "no team",
    };
  }
}

export type MatchData = {
  home?: Team | string;
  away?: Team | string;
  placeholder: TeamsPlaceholder;
  result?: Result;
  round: string;
};
