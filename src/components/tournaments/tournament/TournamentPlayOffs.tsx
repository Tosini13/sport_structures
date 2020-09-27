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
import PlayOffsCreateDashboard from "../../playoffs/create/PlayOffsCreateDashboard";
import PlayOffsBracket from "../../playoffs/PlayOffsBracket";

type Props = {
  tournament: Tournament;
};

const TournamentPlayOffs: React.FC<Props> = observer(({ tournament }) => {
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
        <PlayOffsBracket
          bracket={tournament.bracket}
          teams={tournament.teams}
        />
        <ButtonHorizontalContainerStyled>
          <ButtonErrorStyled
            onClick={deletePlayOffs}
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Usuń fazę pucharową
          </ButtonErrorStyled>
        </ButtonHorizontalContainerStyled>
      </>
    );
  }
  if (create) {
    return (
      <PlayOffsCreateDashboard
        tournament={tournament}
        toggleCreate={toggleCreate}
      />
    );
  }
  return (
    <ButtonHorizontalContainerStyled>
      <ButtonSuccessStyled
        onClick={toggleCreate}
        variant="outlined"
        color="secondary"
        startIcon={<AddIcon />}
      >
        Stwórz fazę pucharową
      </ButtonSuccessStyled>
    </ButtonHorizontalContainerStyled>
  );
});

export default TournamentPlayOffs;
