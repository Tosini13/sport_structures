import React from "react";
import { observer } from "mobx-react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { BracketNavSelectStyled } from "../../../styled/styledBracket";
import { Options } from "../../../models/bracket";

type Props = {
  options: Options;
  setOptions: (options: Options) => void;
};

const PlayOffsChooseLastMatchPlace: React.FC<Props> = observer(
  ({ options, setOptions }) => {
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      const placeMatchesQtt = event.target.value as number;
      if (options.rounds && placeMatchesQtt < options.rounds * 2) {
        setOptions({
          ...options,
          placeMatchesQtt: event.target.value as number,
        });
      }
    };

    let places = [];
    if (options.rounds) {
      for (let i = 1; i < options.rounds * 2; i += 2) {
        places.push(i);
      }
    }
    return (
      <BracketNavSelectStyled>
        <InputLabel>Places:</InputLabel>
        <Select
          color="secondary"
          value={options.placeMatchesQtt}
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
  }
);

export default PlayOffsChooseLastMatchPlace;
