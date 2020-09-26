import React from "react";

import { Team } from "../../../models/team";
import { ChooseListStyled } from "../../../styled/styledBracket";
import { PromotedTeam } from "../../../const/groupConst";
import PlayOffsChooseListElement from "./PlayOffsChooseListElement";

type Props = {
  list: Team[] | PromotedTeam[];
  chosenTeams: Team[] | PromotedTeam[];
  setChosenTeams: (teams: Team[] | PromotedTeam[]) => void;
};

const PlayOffsChooseList: React.FC<Props> = ({
  list,
  chosenTeams,
  setChosenTeams,
}) => {
  const addToChosenTeams = (element: Team | PromotedTeam) => {
    if (chosenTeams.includes(element)) {
      setChosenTeams([...chosenTeams.filter((chosen) => chosen !== element)]);
    } else {
      setChosenTeams([...chosenTeams, element]);
    }
  };

  return (
    <ChooseListStyled>
      {list.map((element) => (
        <PlayOffsChooseListElement
          key={element.id}
          element={element}
          selected={chosenTeams.includes(element)}
          addToChosenTeams={addToChosenTeams}
        />
      ))}
    </ChooseListStyled>
  );
};

export default PlayOffsChooseList;
