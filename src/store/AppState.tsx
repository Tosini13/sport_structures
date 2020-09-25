import { observable, action, decorate } from "mobx";
import { structuresConst } from "../const/structures";

export class AppState {
  structures = [structuresConst.groups, structuresConst.playOffs];

  selectedStructure = structuresConst.playOffs;

  selectStructure(structure: structuresConst) {
    this.selectedStructure = structure;
  }
}

decorate(AppState, {
  structures: observable,
  selectedStructure: observable,
  selectStructure: action,
});

export const appState = new AppState();