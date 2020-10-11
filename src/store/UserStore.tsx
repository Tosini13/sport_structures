import React from "react";
import { observable, action, decorate } from "mobx";
import User from "../models/user";
import { userRightsConst } from "../const/userConst";

const user = new User(1, "admin", "admin", userRightsConst.premium);

export class UserStore {
  users: User[] = [user];

  loggedIn?: User = user;

  addUser = (user: User) => {
    this.users = [...this.users, user];
  };
}

decorate(UserStore, {
  users: observable,
  addUser: action,
});

export const userStore = new UserStore();

export const UserStoreContext = React.createContext(userStore);
export const UserStoreProvider: React.FC<{}> = ({ children }) => {
  return (
    <UserStoreContext.Provider value={userStore}>
      {children}
    </UserStoreContext.Provider>
  );
};
