import React from "react";
import { Tournament } from "../../../models/tournament";

type Props = {
  tournament: Tournament;
};

const TournamentPlayOffs: React.FC<Props> = ({ tournament }) => {
  console.log(tournament.bracket);
  return (
    <div>
      {tournament.bracket ? <div>Pucharowa</div> : <div>Stworz pucharowa</div>}
    </div>
  );
};

export default TournamentPlayOffs;
