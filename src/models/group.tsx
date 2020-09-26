import { Id } from "../const/structures";

export class Group {
  name: string;
  id?: Id = 0;
  constructor(name: string) {
    this.name = name;
  }
}
