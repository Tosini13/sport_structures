import React, { useEffect, useState } from "react";
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
    });
    const [bracket, setBracket] = useState(
      new Bracket(options.rounds, options.placeMatchesQtt)
    );
    const [chosenTeams, setChosenTeams] = useState<Team[] | PromotedTeam[]>(
      tournament.teams.slice(0, options.rounds * 2)
    );

    const validRounds = (round: number) => {
      let i = 0;
      while (i < round * 2) {
        i *= 2;
      }
      return i;
    };

    const setRounds = (newRounds: number) => {
      const rounds = validRounds(newRounds);
      const chosen = tournament.teams.slice(0, rounds * 2);
      let placeMatchesQtt = options.placeMatchesQtt;
      if (placeMatchesQtt >= rounds * 2) {
        placeMatchesQtt = rounds * 2 - 1;
      }
      const newBracket = new Bracket(rounds, placeMatchesQtt);
      newBracket.initBracketWithTeams(chosen);
      setOptions({
        rounds,
        placeMatchesQtt,
      });
      setChosenTeams(chosen);
      setBracket(newBracket);
    };

    const setPlaceMatchesQtt = (placeMatchesQtt: number) => {
      console.log(placeMatchesQtt);
      if (placeMatchesQtt % 2) {
        console.log(placeMatchesQtt);
        setOptions({
          rounds: options.rounds,
          placeMatchesQtt,
        });
      }
    };

    const handleSetChosenTeams = (teams: Team[] | PromotedTeam[]) => {
      const rounds = validRounds(teams.length);
      let placeMatchesQtt = options.placeMatchesQtt;
      if (placeMatchesQtt >= rounds * 2) {
        placeMatchesQtt = rounds * 2 - 1;
      }
      const newBracket = new Bracket(rounds, placeMatchesQtt);
      newBracket.initBracketWithTeams(teams);
      setOptions({
        rounds,
        placeMatchesQtt,
      });
      setChosenTeams(teams);
      setBracket(newBracket);
    };

    // useEffect(() => {
    //   const newBracket = new Bracket(rounds, placeMatchesQtt);
    //   const chosen = tournament.teams.slice(0, rounds * 2);
    //   newBracket.initBracketWithTeams(chosen);
    //   setBracket(newBracket);
    //   setChosenTeams(chosen);
    // }, [tournament.teams]);

    const submitBracket = () => {
      tournament.bracket = bracket;
    };

    return (
      <div>
        <PlayOffsCreateMenu
          toggleCreate={toggleCreate}
          options={options}
          setRounds={setRounds}
          setPlaceMatchesQtt={setPlaceMatchesQtt}
          submitBracket={submitBracket}
        />
        <PlayOffsChooseList
          list={tournament.groups ? tournament.groups : tournament.teams}
          chosenTeams={chosenTeams}
          setChosenTeams={handleSetChosenTeams}
        />
        <PlayOffsCreateBracketMock bracket={bracket} teams={tournament.teams} />
      </div>
    );
  }
);

export default PlayOffsCreateDashboard;
