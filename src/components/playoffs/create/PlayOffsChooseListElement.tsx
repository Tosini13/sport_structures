import React from "react";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import { Team } from "../../../models/team";
import {
  ChooseListItemSecondaryActionStyled,
  ChooseListItemStyled,
  ListItemTextStyled,
} from "../../../styled/styledBracket";
import { PromotedTeam } from "../../../const/groupConst";

type Props = {
  element: Team | PromotedTeam;
  selected: boolean;
  addToChosenTeams: (chosenTeam: Team | PromotedTeam) => void;
};

const PlayOffsChooseListElement: React.FC<Props> = ({
  element,
  selected,
  addToChosenTeams,
}) => {
  return (
    <ChooseListItemStyled
      button
      key={element.id}
      selected={selected}
      onClick={() => {
        addToChosenTeams(element);
      }}
    >
      <ListItemTextStyled primary={element.name} />
      <ChooseListItemSecondaryActionStyled>
        <IconButton>{selected ? <RemoveIcon /> : <AddIcon />}</IconButton>
      </ChooseListItemSecondaryActionStyled>
    </ChooseListItemStyled>
  );
};

export default PlayOffsChooseListElement;
