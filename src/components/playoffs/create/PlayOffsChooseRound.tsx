import React from "react";
import { observer } from "mobx-react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { roundMatchesTitle } from "../../../const/structures";
import { BracketNavSelectStyled } from "../../../styled/styledBracket";
import { Options } from "../../../models/bracket";

type Props = {
  options: Options;
  setOptions: (options: Options) => void;
};

const PlayOffsChooseRound: React.FC<Props> = observer(
  ({ options, setOptions }) => {
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      const rounds = event.target.value as number;
      let placeMatchesQtt = options.placeMatchesQtt;
      if (placeMatchesQtt && rounds * 2 < placeMatchesQtt) {
        placeMatchesQtt = rounds * 2 - 1;
      }
      setOptions({
        placeMatchesQtt,
        rounds,
      });
    };

    return (
      <BracketNavSelectStyled>
        <InputLabel>Rounds:</InputLabel>
        <Select
          color="secondary"
          value={options.rounds}
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
  }
);

export default PlayOffsChooseRound;
