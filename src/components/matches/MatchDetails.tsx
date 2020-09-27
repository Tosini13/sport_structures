import React from "react";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Match } from "../../models/match";
import { observer } from "mobx-react";
import {
  MatchDetailsContainerStyled,
  MatchDetailsResultContainerStyled,
  MatchDetailsTeamsContainerStyled,
} from "../../styled/styledMatch";
import MatchDetailsDashboard from "./MatchDetailsDashboard";

type Props = {
  match: Match;
  open: boolean;
  setOpen: (open: boolean) => void;
  gameIsFinished?: () => boolean;
};

const MatchDetails: React.FC<Props> = observer(
  ({ match, open, setOpen, gameIsFinished }) => {
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <MatchDetailsContainerStyled
          color="primary"
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{match.round}</DialogTitle>
          <DialogContent>
            <MatchDetailsTeamsContainerStyled>
              {match.home ? match.home.name : match.placeholder.home} -{" "}
              {match.away ? match.away.name : match.placeholder.away}
            </MatchDetailsTeamsContainerStyled>
            {match.result ? (
              <MatchDetailsResultContainerStyled>
                {match.result.home} : {match.result.away}
              </MatchDetailsResultContainerStyled>
            ) : null}
          </DialogContent>
          <MatchDetailsDashboard
            match={match}
            gameIsFinished={gameIsFinished}
          />
        </MatchDetailsContainerStyled>
      </div>
    );
  }
);

export default MatchDetails;
