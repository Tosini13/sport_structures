import { observable } from "mobx";
import { Moment } from "moment";
import { Id } from "../const/structures";
import { Match } from "./match";
import { Team } from "./team";

export class Group {
  @observable name: string;
  id?: Id;
  @observable teams: Team[] = [];
  @observable matches: Match[] = [];
  @observable promoted: string[] = [];
  @observable finishAt?: Moment | string;
  @observable promotedQtt: number = 0;
  @observable teamsQtt?: number;

  constructor(data: GroupData) {
    this.name = data.name;
    this.finishAt = data.finishAt;
    this.teamsQtt = data.teamsQtt;
    if (data.teams) this.teams = data.teams;
    if (data.matches) this.matches = data.matches;
    if (data.promoted) this.promoted = data.promoted;
    if (data.promotedQtt) this.promotedQtt = data.promotedQtt;
    if (data.id) this.id = data.id;
  }
}

export interface GroupData {
  name: string;
  id?: Id;
  teams?: Team[];
  matches?: Match[];
  promoted?: string[];
  finishAt?: Moment;
  promotedQtt?: number;
  teamsQtt?: number;
}
