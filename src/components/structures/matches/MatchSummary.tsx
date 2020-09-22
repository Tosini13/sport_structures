import React from "react";
import { Match } from "../../../models/match";

type Props = {
  match: Match;
};

const MatchSummary: React.FC<Props> = ({ match }) => {
  return (
    <div>
      {match.home ? match.home : match.placeholder.home} -{" "}
      {match.away ? match.away : match.placeholder.away}
    </div>
  );
};

export default MatchSummary;
