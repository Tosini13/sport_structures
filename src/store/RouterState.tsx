import React from "react";
import { observable, action, decorate } from "mobx";
import { bottomMenuConst, menuSideBarConst } from "../const/menuConst";

export class RouterState {
  selectedRoute: bottomMenuConst | menuSideBarConst =
    bottomMenuConst.tournaments;

  selectRoute(routerChoice: bottomMenuConst | menuSideBarConst) {
    this.selectedRoute = routerChoice;
  }
}

decorate(RouterState, {
  selectedRoute: observable,
  selectRoute: action,
});

export const routerState = new RouterState();
export const RouterStateContext = React.createContext(routerState);
export const RouterStateProvider: React.FC<{}> = ({ children }) => {
  return (
    <RouterStateContext.Provider value={routerState}>
      {children}
    </RouterStateContext.Provider>
  );
};
