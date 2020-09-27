import React from "react";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DialogActions from "@material-ui/core/DialogActions";

import { Match } from "../../models/match";
import { matchModeConst } from "../../const/matchConst";
import { observer } from "mobx-react";

type Props = {
  match: Match;
  gameIsFinished?: () => boolean;
};

const MatchDetailsDashboard: React.FC<Props> = observer(
  ({ match, gameIsFinished }) => {
    const changeMatchMode = (mode: matchModeConst) => {
      switch (mode) {
        case matchModeConst.live:
          if (match.mode === matchModeConst.finished) {
            match.continueMatch();
          } else {
            match.startMatch();
          }
          break;
        case matchModeConst.finished:
          match.finishMatch();
          break;
        case matchModeConst.notStarted:
          match.resetMatch();
          break;
        default:
          match.continueMatch();
      }
      if (gameIsFinished) {
        gameIsFinished();
      }
    };

    return (
      <DialogActions>
        {match.mode === matchModeConst.notStarted ? (
          <Button onClick={() => changeMatchMode(matchModeConst.live)}>
            Start
          </Button>
        ) : null}

        {match.mode === matchModeConst.live ? (
          <>
            <IconButton onClick={match.homeScored}>+</IconButton>
            <IconButton onClick={match.homeResultLess}>-</IconButton>
            <Button onClick={() => changeMatchMode(matchModeConst.finished)}>
              Finish
            </Button>
            <IconButton onClick={match.awayResultLess}>-</IconButton>
            <IconButton onClick={match.awayScored}>+</IconButton>
          </>
        ) : null}

        {match.mode === matchModeConst.finished ? (
          <>
            <Button onClick={() => changeMatchMode(matchModeConst.live)}>
              Continue
            </Button>
            <Button onClick={() => changeMatchMode(matchModeConst.notStarted)}>
              Reset
            </Button>
          </>
        ) : null}
      </DialogActions>
    );
  }
);

export default MatchDetailsDashboard;
