import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";

import { Tournament } from "../../../models/tournament";
import {
  ButtonHorizontalContainerStyled,
  ButtonSuccessStyled,
} from "../../../styled/styledButtons";
import PlayOffsCreateDashboard from "../../playoffs/create/PlayOffsCreateDashboard";
import { observer } from "mobx-react";
import PlayOffsCreateBracketMock from "../../playoffs/create/PlayOffsCreateBracketMock";

type Props = {
  tournament: Tournament;
};

const TournamentPlayOffs: React.FC<Props> = observer(({ tournament }) => {
  const [create, setCreate] = useState<boolean>(false);

  const toggleCreate = () => {
    setCreate(!create);
  };

  if (tournament.bracket) {
    return (
      <PlayOffsCreateBracketMock
        bracket={tournament.bracket}
        teams={tournament.teams}
      />
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
