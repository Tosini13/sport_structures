import React from "react";
import { observer } from "mobx-react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { tournament } from "../../../models/tournament";
import { BracketNavSelectStyled } from "../../../styled/styledBracket";

const PlayOffsChooseLastMatchPlace = observer(() => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    tournament.setMatchPlace(event.target.value as number);
  };

  let places = [];
  if (tournament.rounds) {
    for (let i = 1; i < tournament.rounds * 2; i += 2) {
      places.push(i);
    }
  }
  return (
    <BracketNavSelectStyled>
      <InputLabel id="demo-simple-select-label">Places:</InputLabel>
      <Select
        id="demo-simple-select"
        value={tournament.matchPlace}
        onChange={handleChange}
      >
        {places.map((place) => {
          return (
            <MenuItem key={place} value={place}>
              {place}
            </MenuItem>
          );
        })}
      </Select>
    </BracketNavSelectStyled>
  );
});

export default PlayOffsChooseLastMatchPlace;
