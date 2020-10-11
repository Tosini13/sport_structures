import { action, observable } from "mobx";
import { Id } from "../const/structures";
import { Login, Password, userRightsConst } from "../const/userConst";

class User {
  id: Id;
  login: Login;
  password: Password;
  rights: userRightsConst;

  @observable
  favoriteTournaments: Id[] = [];

  @action
  addFavoriteTournament = (tournamentId: Id) => {
    this.favoriteTournaments = [...this.favoriteTournaments, tournamentId];
  };

  @action
  removeFavoriteTournament = (tournamentId: Id) => {
    this.favoriteTournaments = this.favoriteTournaments.filter(
      (id) => id !== tournamentId
    );
  };

  constructor(
    id: Id,
    login: Login,
    password: Password,
    rights: userRightsConst
  ) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.rights = rights;
  }
}

export default User;
