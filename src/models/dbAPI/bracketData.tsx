import { Game } from "../game";
import { GameDataDb, gameDbApi } from "./gameData";

export class BracketDbApi {
  games: GameDataDb[] = []; //unbound games store

  getGamesRecursive = (game: Game) => {
    let games: GameDataDb[] = [];
    games = [...games, gameDbApi.convertGameToDb(game)];
    if (game.previousMatchHome && game.previousMatchHome.loserMatch !== game) {
      const previousHomeGames: GameDataDb[] = this.getGamesRecursive(
        game.previousMatchHome
      );
      games = [...games, ...previousHomeGames];
    }
    if (game.previousMatchAway && game.previousMatchAway.loserMatch !== game) {
      const previousAwayGames: GameDataDb[] = this.getGamesRecursive(
        game.previousMatchAway
      );
      games = [...games, ...previousAwayGames];
    }
    return games;
  };

  convertGames = (placeGames: Game[]) => {
    let gamesDb: GameDataDb[] = [];
    placeGames.forEach((placeGame) => {
      const finalGames = this.getGamesRecursive(placeGame);
      gamesDb = [...gamesDb, ...finalGames];
    });
    return gamesDb;
  };

  convertBracket = (bracket: BracketDataApp) => {
    const bracketDb: BracketDataDb = {
      games: this.convertGames(bracket.placeMatches),
      placeMatchesQtt: bracket.placeMatchesQtt,
      bracketLastRound: bracket.bracketLastRound,
    };
    return bracketDb;
  };
}

export const bracketDbApi = new BracketDbApi();

export type BracketDataApp = {
  placeMatches: Game[];
  placeMatchesQtt: number;
  bracketLastRound: number;
};

export type BracketDataDb = {
  games: GameDataDb[];
  placeMatchesQtt: number;
  bracketLastRound: number;
};
