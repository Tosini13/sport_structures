import { matchModeConst } from "../../const/matchConst";
import { Id, Result, TeamsPlaceholder } from "../../const/structures";
import { Team } from "../team";

export class MatchDbApi {
  convertGameToDb = (match: MatchDataApp) => {
    const matchDb: MatchDataDb = {
      home: match.home?.id,
      away: match.away?.id,
      placeholder: match.placeholder,
      result: match.result,
      round: match.round,
      mode: match.mode,
    };
    return matchDb;
  };
}

export const matchDbApi = new MatchDbApi();

export type MatchDataApp = {
  home?: Team;
  away?: Team;
  placeholder: TeamsPlaceholder;
  result?: Result;
  round: string;
  mode: matchModeConst;
};

export type MatchDataDb = {
  home?: Id;
  away?: Id;
  placeholder: TeamsPlaceholder;
  result?: Result;
  round: string;
  mode: matchModeConst;
};
