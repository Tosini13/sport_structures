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

type Props = {
  tournament: Tournament;
};

const TournamentGroups: React.FC<Props> = observer(({ tournament }) => {
  const [create, setCreate] = useState<boolean>(false);

  const toggleCreate = () => {
    setCreate(!create);
  };

  const deletePlayOffs = () => {
    tournament.deletePlayOffs();
  };

  if (tournament.bracket) {
    return (
      <>
        <div>Created groups</div>
        <ButtonHorizontalContainerStyled>
          <ButtonErrorStyled
            onClick={deletePlayOffs}
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
    return <div>Creation groups</div>;
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
