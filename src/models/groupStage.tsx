import { action, observable } from "mobx";
import moment, { Moment } from "moment";
import { Group } from "./group";
import { Team } from "./team";
import { Tournament } from "./tournament";

export class GroupStage {
  @observable groups: Group[] = [];
  matchCounter: number = 0;

  @action
  createGroups = (teams: Team[], groupsQtt: number) => {
    if (teams.length / groupsQtt < 2) {
      return false;
    } else if (groupsQtt < 1) {
      return false;
    }
    let groups: Group[] = [];
    const teamsQtt = teams.length;
    let restTeams = 0; //in one group!
    let add = 0;
    if (groupsQtt !== 1) {
      restTeams = teamsQtt % groupsQtt;
    }
    for (let i = 0; i < groupsQtt; i++) {
      if (restTeams !== 0) {
        add = 1;
        restTeams--;
      } else {
        add = 0;
      }
      let teamsInGroup = Math.floor(teamsQtt / groupsQtt) + add;
      const groupName = "Group " + String.fromCharCode(65 + i);
      groups.push(
        new Group({
          id: i + 1,
          name: groupName,
          teamsQtt: teamsInGroup,
        })
      );
    }
    this.groups = groups;
  };

  initPromoted(groupName: string, teamsQtt: number) {
    let promoted = [];
    for (let i = 0; i < teamsQtt; i++) {
      promoted[i] = groupName + " - " + (i + 1) + " miejsce";
    }
    return promoted;
  }

  @action
  createRandomGroups = (
    teams: Team[],
    groupsQtt: number,
    tournament: Tournament,
    returnGames: boolean
  ) => {
    return this.createGroupsAuto(
      this.shuffle(teams),
      groupsQtt,
      tournament,
      returnGames
    );
  };

  shuffle(arr: any[]) {
    let indexes: any[] = [];
    let newArr = [];
    while (indexes.length < arr.length) {
      const j = Math.floor(Math.random() * arr.length);
      if (!indexes.includes(j)) {
        indexes.push(j);
        newArr.push(arr[j]);
      }
    }
    return newArr;
  }

  createGroupsAuto = (
    teams: Team[],
    groupsQtt: number,
    tournament: Tournament,
    returnGames: boolean
  ) => {
    if (teams.length / groupsQtt < 2) {
      return false;
    }
    let leftTeams = [...teams];
    let restTeams = 0; //in one group!
    let add = 0;
    const teamsQtt = teams.length;
    let groups = [];
    if (groupsQtt !== 1) {
      restTeams = teamsQtt % groupsQtt;
    }
    for (let i = 0; i < groupsQtt; i++) {
      //check if it will be the same amount of teams or not
      if (restTeams !== 0) {
        add = 1;
        restTeams--;
      } else {
        add = 0;
      }
      let teamsInGroup = Math.floor(teamsQtt / groupsQtt) + add;
      let groupTeams: Team[] = [];
      for (let j = 0; j < teamsInGroup; j++) {
        const addedTeam = leftTeams.shift();
        if (addedTeam) {
          groupTeams.push(addedTeam);
        }
      }
      const groupName = "Group " + String.fromCharCode(65 + i);
      groups.push(
        new Group({
          id: i + 1,
          name: groupName,
          teams: groupTeams,
          promoted: this.initPromoted(groupName, teamsInGroup),
        })
      );
    }
    this.initGroupMatches(teams, groups, tournament, returnGames);
    this.groups = groups;
  };

  initGroupMatches = (
    teams: Team[],
    groups: Group[],
    tournament: Tournament,
    returnGames: boolean
  ) => {
    groups.forEach((group, i) => {
      const matches = this.createGroupMatches(group.teams, returnGames);
      matches.sort(this.compareMatches);
      group.matches = matches;
    });
    groups = this.setMatchesTime(tournament, groups);
    return groups;
  };

  compareMatches = (match1: any, match2: any) => {
    return match1.round - match2.round;
  };

  createGroupMatches = (teams: Team[], returnGames: boolean) => {
    if (teams.length > 3) {
      return this.bergerAlgorithm(teams, returnGames);
    } else if (teams.length === 3) {
      let matches = [];
      matches.push(this.initMatch(teams[0], teams[1], 1));
      matches.push(this.initMatch(teams[1], teams[2], 2));
      matches.push(this.initMatch(teams[2], teams[0], 3));
      if (returnGames) {
        matches.push(this.initMatch(teams[1], teams[0], 4));
        matches.push(this.initMatch(teams[2], teams[1], 5));
        matches.push(this.initMatch(teams[0], teams[2], 6));
      }
      return matches;
    } else if (teams.length === 2) {
      let matches = [];
      matches.push(this.initMatch(teams[0], teams[1], 1));
      if (returnGames) {
        matches.push(this.initMatch(teams[0], teams[1], 1));
      }
      return matches;
    } else {
      return [];
    }
  };

  bergerAlgorithm = (teams: Team[], returnGames: boolean) => {
    const isOdd = Boolean(teams.length % 2);
    const teamsQtt = isOdd ? teams.length + 1 : teams.length;
    const matchesInRound = teamsQtt / 2;
    const ghost = isOdd ? teams[teamsQtt - 2] : teams[teamsQtt - 1];
    let roundsQtt = 1;
    let matches = [];
    let hostTeams = teams.slice(0, teamsQtt / 2).reverse();
    let awayTeams = teams.slice(
      teamsQtt / 2,
      isOdd ? teamsQtt - 2 : teamsQtt - 1
    );
    while (roundsQtt < teamsQtt) {
      let newHost: any = [];
      let newAway: any = [];
      for (let i = 0; i < matchesInRound; i++) {
        let home = null;
        let away = null;
        if (i === 0 && roundsQtt % 2 === 0) {
          away = hostTeams.pop();
          home = ghost;
          newHost.push(away);
        } else if (i === 0 && roundsQtt % 2 === 1) {
          home = hostTeams.pop();
          away = ghost;
          newHost.push(home);
        } else {
          home = hostTeams.pop();
          away = awayTeams.pop();
          newHost.push(away);
          newAway.push(home);
        }
        if (home && away) {
          const match = this.initMatch(home, away, roundsQtt);
          matches.push(match);
        }
      }
      hostTeams = newHost;
      awayTeams = newAway;
      roundsQtt++;
    }
    if (returnGames) {
      roundsQtt--;
      let returnMatches: any[] = [];
      matches.forEach((match) => {
        returnMatches.push(
          this.initMatch(match.away, match.home, match.round + roundsQtt)
        );
      });
      matches = [...matches, ...returnMatches];
    }
    return matches;
  };

  initMatch = (home: Team, away: Team, round: number) => {
    return {
      id: ++this.matchCounter,
      home,
      away,
      mode: "NOT_STARTED",
      result: {
        home: 0,
        away: 0,
      },
      round,
    };
  };

  setMatchesTime = (tournament: Tournament, groups: Group[]) => {
    if (
      tournament.matchTimeInGroup === undefined ||
      tournament.breakTimeInGroup === undefined ||
      tournament.matchTimeInBracket === undefined ||
      tournament.breakTimeInBracket === undefined
    ) {
      return groups;
    }
    const timeUnit =
      tournament.matchTimeInBracket + tournament.breakTimeInBracket;
    let timeCounter: Moment = moment(tournament.date);
    let timeTeamsCounter: any[] = [];
    let matchesQtt = 0;
    groups.forEach((group) => {
      if (matchesQtt < group.matches.length) {
        matchesQtt = group.matches.length;
      }
    });

    let fieldCounter = 1;
    for (let i = 0; i < matchesQtt + 1; i++) {
      for (let j = 0; j < groups.length; j++) {
        if (i < groups[j].matches.length) {
          if (
            timeTeamsCounter.includes(groups[j].matches[i].home) ||
            timeTeamsCounter.includes(groups[j].matches[i].away)
          ) {
            timeCounter = moment(timeCounter).add(timeUnit, "minutes");
            fieldCounter = 1;
            timeTeamsCounter = [];
          }
          groups[j].matches[i].date = moment(timeCounter).format(
            "YYYY-MM-DD HH:mm"
          );
          timeTeamsCounter = [
            ...timeTeamsCounter,
            groups[j].matches[i].home,
            groups[j].matches[i].away,
          ];
          if (!(fieldCounter % tournament.fields)) {
            timeCounter = moment(timeCounter).add(timeUnit, "minutes");
            fieldCounter = 0;
            timeTeamsCounter = [];
          }
          fieldCounter++;
        } else if (i === groups[j].matches.length && i !== 0) {
          groups[j].finishAt = moment(
            groups[j].matches[groups[j].matches.length - 1].date
          )
            .add(timeUnit, "minutes")
            .format("YYYY-MM-DD HH:mm");
        }
      }
    }
    return groups;
  };
}
