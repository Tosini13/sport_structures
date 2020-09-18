import { placeMatchesTitle, roundMatchesTitle } from "../const/structures";
import { Game } from "./game";

export class Bracket {
  placeMatches: Game[] = [];
  placeMatchesQtt: number;
  bracketLastRound: number;

  createBracket = () => {
    let placeMatch = 1;
    for (let i = 1; i <= this.placeMatchesQtt; i += 2) {
      if (i !== 1) {
        placeMatch = i;
        const lastRound = this.countSmallLastRound(i);
        const lastSmallRound = lastRound / 2;
        console.log(placeMatch, lastRound, placeMatch - lastRound);
        this.placeMatches[placeMatch] = this.createRound(
          lastRound,
          true,
          placeMatch
        );
        for (let j = 0; j < lastRound; j++) {
          const linkSmallMatchIndex = Math.floor(j / 2);
          const linkMatch = this.linkSmallBracket(
            this.placeMatches[placeMatch - lastRound], //matchPlaceEven doesn't match here
            lastRound,
            j
          );
          const linkSmallMatch = this.linkSmallBracket(
            this.placeMatches[placeMatch],
            lastSmallRound,
            linkSmallMatchIndex
          );
          linkMatch.loserMatch = linkSmallMatch;
          if (j % 2 === 0) {
            linkSmallMatch.previousMatchHome = linkMatch;
          } else {
            linkSmallMatch.previousMatchAway = linkMatch;
          }
        }
        if (placeMatch === 9) console.log(this.placeMatches[placeMatch]);
      } else {
        this.placeMatches[placeMatch] = this.createRound(this.bracketLastRound);
      }
    }
  };

  countSmallLastRound = (placeMatch: number) => {
    let matchPlace = 3;
    for (let multiple = 2; multiple < 64; multiple *= 2) {
      for (let lastSmallRound = multiple, i = 0; lastSmallRound >= 2; i++) {
        if (i % 2 === 1 && lastSmallRound !== 2) {
          if (matchPlace === placeMatch) {
            return 2;
          }
        } else if (i === multiple / 2) {
          if (matchPlace === placeMatch) {
            return lastSmallRound;
          }
          lastSmallRound /= 2;
        } else {
          if (matchPlace === placeMatch) {
            return lastSmallRound;
          }
          lastSmallRound /= 2;
        }
        matchPlace += 2;
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
    isSmall: boolean = false,
    round: number = 1,
    winnerMatch: Game | undefined = undefined,
    matchNo: number = 0
  ) => {
    const match = new Game(
      `${isSmall && matchNo ? "Small " : ""}${
        round % 2 === 1
          ? this.getPlaceRoundTitle(round)
          : roundMatchesTitle.get(round)
      } ${matchNo ? matchNo : ""}`
    );
    if (matchNo !== 0) matchNo = matchNo * 2 - 2;
    if (round !== 1 && round % 2 === 1) round = 1;
    if (winnerMatch) match.winnerMatch = winnerMatch;
    if (lastRound >= round) {
      match.previousMatchHome = this.createRound(
        lastRound,
        isSmall,
        round * 2,
        match,
        ++matchNo
      );
      match.previousMatchAway = this.createRound(
        lastRound,
        isSmall,
        round * 2,
        match,
        ++matchNo
      );
    }
    return match;
  };

  linkSmallBracket = (
    rootGame: Game,
    totalMatches: number,
    currentMatch: number
  ) => {
    let partMatches: number = totalMatches / 2;
    let match = rootGame; //get final
    let roundCounter = 1;
    while (
      match.previousMatchHome &&
      match.previousMatchAway &&
      roundCounter < totalMatches
    ) {
      if (currentMatch < partMatches) {
        match = match.previousMatchHome;
        partMatches = partMatches / 2;
      } else {
        match = match.previousMatchAway;
        partMatches = (partMatches * 3) / 2;
      }
      roundCounter *= 2;
    }
    return match;
  };

  countPlaceMatches = (placeMatches: number) => {
    let placeMatchesArray: Game[] = [];
    for (let i = 1; i <= placeMatches; i += 2) {
      const title = placeMatchesTitle.has(i)
        ? placeMatchesTitle.get(i)
        : `${i}th place`;
      placeMatchesArray.push(new Game(title));
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
    this.bracketLastRound = bracketLastRound;
    this.placeMatchesQtt = this.toValidPlaceMatches(
      bracketLastRound,
      placeMatches
    );
    this.createBracket();
  }
}
