import { Id } from "../const/structures";

export class Team {
  name: string;
  id: Id = 0;
  constructor(name: string) {
    this.name = name;
  }
}
