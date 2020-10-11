import React, { useState } from "react";
import { observer } from "mobx-react";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { Tournament } from "../../../models/tournament";
import {
  ButtonErrorStyled,
  ButtonHorizontalContainerStyled,
  ButtonSuccessStyled,
} from "../../../styled/styledButtons";
import GroupsCreate from "../../groups/create/GroupsCreate";
import { GroupStage } from "../../../models/groupStage";
import GroupList from "../../groups/GroupsList";

type Props = {
  tournament: Tournament;
};

const TournamentGroups: React.FC<Props> = observer(({ tournament }) => {
  const [create, setCreate] = useState<boolean>(false);

  const toggleCreate = () => {
    if (!create) {
      tournament.groupStage = new GroupStage();
    }
    setCreate(!create);
  };

  const deleteGroups = () => {
    tournament.deleteGroups();
  };

  if (tournament.groupStage?.groups.length && !create) {
    return (
      <>
        <GroupList groups={tournament.groupStage.groups} />
        <ButtonHorizontalContainerStyled>
          <ButtonErrorStyled
            onClick={deleteGroups}
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Usuń fazę grupową
          </ButtonErrorStyled>
        </ButtonHorizontalContainerStyled>
      </>
    );
  }
  if (create) {
    return <GroupsCreate tournament={tournament} toggleCreate={toggleCreate} />;
  }
  return (
    <ButtonHorizontalContainerStyled>
      <ButtonSuccessStyled
        onClick={toggleCreate}
        variant="outlined"
        color="secondary"
        startIcon={<AddIcon />}
      >
        Stwórz fazę grupową
      </ButtonSuccessStyled>
    </ButtonHorizontalContainerStyled>
  );
});

export default TournamentGroups;
