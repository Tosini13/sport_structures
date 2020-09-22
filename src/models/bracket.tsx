import { placeMatchesTitle, roundMatchesTitle } from "../const/structures";
import { Game } from "./game";

export class Bracket {
  placeMatches: Game[] = [];
  placeMatchesQtt: number;
  bracketLastRound: number;

  //from 9th -> Quarter-final C -> previous away goes wrong (to the same as home)
  createBracket = () => {
    let placeMatch = 1;
    for (
      let matchCounter = 1, smallTitleCounter = 0;
      matchCounter <= this.placeMatchesQtt;
      matchCounter += 2
    ) {
      if (matchCounter !== 1) {
        placeMatch = matchCounter;
        const lastRound = this.countSmallLastRound(matchCounter);
        const lastSmallRound = lastRound / 2;
        if ((matchCounter - 1) % 4 === 0) {
          smallTitleCounter++;
        }
        this.placeMatches[placeMatch] = this.createRound(
          lastRound,
          String.fromCharCode(65 + smallTitleCounter),
          placeMatch
        );
        for (let j = 0; j < lastRound; j++) {
          const linkSmallMatchIndex = Math.floor(j / 2);
          const linkMatch = this.linkSmallBracket(
            this.placeMatches[placeMatch - lastRound],
            lastRound,
            j
          );
          const linkSmallMatch = this.linkSmallBracket(
            this.placeMatches[placeMatch],
            lastSmallRound,
            linkSmallMatchIndex
          );
          linkMatch.setLoserMatch = linkSmallMatch;
          if (j % 2 === 0) {
            linkSmallMatch.setPreviousMatchHome = linkMatch;
          } else {
            linkSmallMatch.setPreviousMatchAway = linkMatch;
          }
        }
      } else {
        this.placeMatches[placeMatch] = this.createRound(this.bracketLastRound);
      }
    }
  };

  linkSmallBracket = (
    rootGame: Game,
    totalMatches: number,
    currentMatch: number
  ) => {
    let match = rootGame; //get final
    let roundCounter = totalMatches;
    let partMatches = totalMatches / 2;
    currentMatch++;
    while (
      match.previousMatchHome &&
      match.previousMatchAway &&
      roundCounter > 1
    ) {
      if (currentMatch <= partMatches) {
        match = match.previousMatchHome;
        partMatches = partMatches - roundCounter / 4;
      } else {
        match = match.previousMatchAway;
        partMatches = partMatches + roundCounter / 4;
      }
      roundCounter /= 2;
    }
    return match;
  };

  countSmallLastRound = (placeMatch: number) => {
    let matchPlace = 3;
    for (let multiple = 2; multiple < 64; multiple *= 2) {
      let asc = true;
      matchPlace = multiple + 1;
      for (
        let lastSmallRound = 2, matchCounter = 0;
        matchCounter < multiple / 2;
        matchCounter++, matchPlace += 2
      ) {
        if (matchCounter === 0 && matchPlace === placeMatch) {
          lastSmallRound *= 2;
          return multiple;
        } else if (matchCounter % 2 === 1) {
          if (matchPlace === placeMatch) {
            return 2;
          }
        } else {
          if (lastSmallRound === multiple / 2) asc = false;
          if (matchPlace === placeMatch) {
            return lastSmallRound;
          }
          if (asc) {
            lastSmallRound *= 2;
          }
          if (!asc && lastSmallRound > 2) {
            lastSmallRound /= 2;
          }
        }
      }
    }
    return 2;
  };

  getPlaceRoundTitle = (round: number) => {
    let title = placeMatchesTitle.get(round);
    if (title) return title;
    return `${round}th place`;
  };

  createRound = (
    lastRound: number,
    smallTitle?: string,
    round: number = 1,
    winnerMatch?: Game,
    matchNo: number = 0
  ) => {
    const returnMatch = false; //temporary
    const match = new Game(
      `${
        round % 2 === 1
          ? this.getPlaceRoundTitle(round)
          : roundMatchesTitle.get(round)
      }${smallTitle && matchNo ? ` ${smallTitle}` : ""} ${
        matchNo ? ` ${matchNo}` : ""
      }`,
      returnMatch
    );
    if (matchNo !== 0) matchNo = matchNo * 2 - 2;
    if (round !== 1 && round % 2 === 1) round = 1;
    if (winnerMatch) match.setWinnerMatch = winnerMatch;
    if (lastRound >= round) {
      match.setPreviousMatchHome = this.createRound(
        lastRound,
        smallTitle,
        round * 2,
        match,
        ++matchNo
      );
      match.setPreviousMatchAway = this.createRound(
        lastRound,
        smallTitle,
        round * 2,
        match,
        ++matchNo
      );
    }
    return match;
  };

  countPlaceMatches = (placeMatches: number) => {
    let placeMatchesArray: Game[] = [];
    for (let i = 1; i <= placeMatches; i += 2) {
      const title = placeMatchesTitle.has(i)
        ? placeMatchesTitle.get(i)
        : `${i}th place`;
      const returnMatch = false;
      placeMatchesArray.push(new Game(title, returnMatch));
    }
    return placeMatchesArray;
  };

  toValidPlaceMatches = (bracketLastRound: number, placeMatches: number) => {
    if (placeMatches % 2 === 0) return 1;
    while (bracketLastRound * 2 - 1 < placeMatches) {
      placeMatches -= 2;
    }
    return placeMatches;
  };

  constructor(bracketLastRound: number, placeMatches: number) {
    this.bracketLastRound = bracketLastRound / 2;
    this.placeMatchesQtt = this.toValidPlaceMatches(
      bracketLastRound,
      placeMatches
    );
    this.createBracket();
  }
}

export type BracketData = {
  placeMatches: Game[];
  placeMatchesQtt: number;
  bracketLastRound: number;
}