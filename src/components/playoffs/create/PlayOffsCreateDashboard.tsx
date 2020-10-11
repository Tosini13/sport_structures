import React, { useState } from "react";
import { observer } from "mobx-react";
import { Bracket } from "../../../models/bracket";

import { Tournament } from "../../../models/tournament";
import PlayOffsChooseList from "./PlayOffsChooseList";
import PlayOffsCreateMenu from "./PlayOffsCreateMenu";
import { Options } from "../../../models/bracket";
import PlayOffsCreateBracketMock from "./PlayOffsCreateBracketMock";
import { Team } from "../../../models/team";
import { PromotedTeam } from "../../../const/groupConst";

type Props = {
  tournament: Tournament;
  toggleCreate: () => void;
};

const PlayOffsCreateDashboard: React.FC<Props> = observer(
  ({ tournament, toggleCreate }) => {
    const [options, setOptions] = useState<Options>({
      rounds: 4,
      placeMatchesQtt: 1,
      roundsActive: false,
    });
    const [chosenTeams, setChosenTeams] = useState<Team[] | PromotedTeam[]>(
      tournament.teams.slice(0, options.rounds * 2)
    );
    let bracketInit = new Bracket(options.rounds, options.placeMatchesQtt);
    bracketInit.initBracketWithTeams(chosenTeams);
    const [bracket, setBracket] = useState<Bracket>(bracketInit);

    const validRounds = (rounds: number) => {
      var i = 1;
      while (i * 2 < rounds) {
        i = i * 2;
      }
      return i;
    };

    const validPlaceMatches = (rounds: number, placeMatches: number) => {
      let placeMatchesQtt = placeMatches;
      if (placeMatchesQtt > rounds * 2) {
        placeMatchesQtt = rounds * 2 - 1;
      }
      return placeMatchesQtt;
    };

    const setRounds = (rounds: number) => {
      let placeMatchesQtt = options.placeMatchesQtt;
      if (placeMatchesQtt >= rounds * 2) {
        placeMatchesQtt = rounds * 2 - 1;
      }
      const chosen = tournament.teams.slice(0, rounds * 2);
      const bracket = new Bracket(rounds, placeMatchesQtt);
      bracket.initBracketWithTeams(chosen);
      setOptions({
        ...options,
        rounds,
      });
      setChosenTeams(chosen);
      setBracket(bracket);
    };

    const setPlaceMatchesQtt = (placeMatchesQtt: number) => {
      if (placeMatchesQtt % 2) {
        const chosen = tournament.teams.slice(0, options.rounds * 2);
        const bracket = new Bracket(options.rounds, placeMatchesQtt);
        bracket.initBracketWithTeams(chosen);
        setOptions({
          ...options,
          placeMatchesQtt,
        });
        setBracket(bracket);
      }
    };

    const toggleRoundsActive = () => {
      setOptions({
        ...options,
        roundsActive: !options.roundsActive,
      });
    };

    const handleSetChosenTeams = (teams: Team[] | PromotedTeam[]) => {
      const rounds = validRounds(teams.length);
      const placeMatchesQtt = validPlaceMatches(
        rounds,
        options.placeMatchesQtt
      );
      const bracket = new Bracket(rounds, placeMatchesQtt);
      bracket.initBracketWithTeams(teams);
      setOptions({
        roundsActive: false,
        rounds,
        placeMatchesQtt,
      });
      setChosenTeams(teams);
      setBracket(bracket);
    };

    const submitBracket = () => {
      tournament.bracket = bracket;
      toggleCreate();
    };

    return (
      <div>
        <PlayOffsCreateMenu
          toggleCreate={toggleCreate}
          options={options}
          setRounds={setRounds}
          setPlaceMatchesQtt={setPlaceMatchesQtt}
          toggleRoundsActive={toggleRoundsActive}
          submitBracket={submitBracket}
        />
        <PlayOffsChooseList
          list={tournament.teams}
          chosenTeams={chosenTeams}
          setChosenTeams={handleSetChosenTeams}
        />
        <PlayOffsCreateBracketMock bracket={bracket} teams={tournament.teams} />
      </div>
    );
  }
);

export default PlayOffsCreateDashboard;
