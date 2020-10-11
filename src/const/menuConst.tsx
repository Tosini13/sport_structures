export enum menuPlayOffsConst {
  bracket = "BRACKET",
  round = "ROUND",
}

export enum menuTournamentConst {
  info = "INFO",
  groups = "GROUPS",
  playoffs = "PLAYOFFS",
  teams = "TEAMS",
}

export enum menuSideBarConst {
  create = "CREATE",
  login = "LOGIN",
  logout = "LOGOUT",
  signUp = "SIGNUP",
}

export enum bottomMenuConst {
  tournaments = "TOURNAMENTS",
  live = "LIVE",
  my = "MY",
  favorites = "FAVORITES",
}

export enum routerConstString {
  create = "/create",
  login = "/login",
  logout = "/logout",
  signUp = "/signup",
  tournaments = "/",
  tournament = "/tournament",
  live = "/live",
  my = "/my",
  favorites = "/favorites",
}

export let bottomMenuTitleConst = new Map();
bottomMenuTitleConst.set(bottomMenuConst.tournaments, "Turnieje");
bottomMenuTitleConst.set(bottomMenuConst.live, "Na żywo");
bottomMenuTitleConst.set(bottomMenuConst.my, "Moje");
bottomMenuTitleConst.set(bottomMenuConst.favorites, "Ulubione");

export let routerConst = new Map();
routerConst.set(routerConstString.create, menuSideBarConst.create);
routerConst.set(routerConstString.login, menuSideBarConst.login);
routerConst.set(routerConstString.logout, menuSideBarConst.logout);
routerConst.set(routerConstString.signUp, menuSideBarConst.signUp);
routerConst.set(routerConstString.tournaments, bottomMenuConst.tournaments);
routerConst.set(routerConstString.live, bottomMenuConst.live);
routerConst.set(routerConstString.my, bottomMenuConst.my);
routerConst.set(routerConstString.favorites, bottomMenuConst.favorites);
