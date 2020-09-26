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
    const [chosenTeams, setChosenTeams] = useState<Team[] | PromotedTeam[]>([]);
    const [bracket, setBracket] = useState(
      new Bracket(options.rounds, options.placeMatchesQtt)
    );

    const countRound = (round: number) => {
      let i = 0;
      while (i < round * 2) {
        i *= 2;
      }
      return i;
    };

    useEffect(() => {
      const newBracket = new Bracket(options.rounds, options.placeMatchesQtt);
      const chosen = tournament.teams.slice(0, options.rounds * 2);
      newBracket.initBracketWithTeams(chosen);
      setBracket(newBracket);
      setChosenTeams(chosen);
    }, [options, tournament.teams]);

    const submitBracket = () => {
      tournament.bracket = bracket;
    };

    return (
      <div>
        <PlayOffsCreateMenu
          toggleCreate={toggleCreate}
          options={options}
          setOptions={setOptions}
          submitBracket={submitBracket}
        />
        <PlayOffsChooseList
          list={tournament.groups ? tournament.groups : tournament.teams}
          chosenTeams={chosenTeams}
          setChosenTeams={setChosenTeams}
        />
        <PlayOffsCreateBracketMock bracket={bracket} teams={tournament.teams} />
      </div>
    );
  }
);

export default PlayOffsCreateDashboard;
