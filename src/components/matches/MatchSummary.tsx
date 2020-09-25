import React, { useState } from "react";
import { Match } from "../../models/match";

import MatchDetails from "./MatchDetails";

type Props = {
  match: Match;
  gameIsFinished: () => boolean;
};

const MatchSummary: React.FC<Props> = ({ match, gameIsFinished }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div onClick={handleClickOpen}>
        {match.home ? match.home.name : match.placeholder.home} -{" "}
        {match.away ? match.away.name : match.placeholder.away}
        {match.result ? ` ${match.result.home} : ${match.result.away}` : null}
      </div>
      <MatchDetails open={open} setOpen={setOpen} match={match} gameIsFinished={gameIsFinished} />
    </>
  );
};

export default MatchSummary;
