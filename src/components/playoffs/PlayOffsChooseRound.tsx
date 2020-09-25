import React from "react";
import { observer } from "mobx-react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { tournament } from "../../models/tournament";
import {
  roundMatchesTitle,
} from "../../const/structures";
import { BracketNavSelectStyled } from "../../styled/styledBracket";

const PlayOffsChooseRound = observer(() => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    tournament.setRounds(event.target.value as number);
  };

  return (
    <BracketNavSelectStyled>
      <InputLabel id="demo-simple-select-label">Rounds:</InputLabel>
      <Select
        id="demo-simple-select"
        value={tournament.rounds}
        onChange={handleChange}
      >
        {Array.from(roundMatchesTitle.keys()).map((round) => {
          return (
            <MenuItem key={round} value={round}>
              {roundMatchesTitle.get(round)}
            </MenuItem>
          );
        })}
      </Select>
    </BracketNavSelectStyled>
  );
});

export default PlayOffsChooseRound;
