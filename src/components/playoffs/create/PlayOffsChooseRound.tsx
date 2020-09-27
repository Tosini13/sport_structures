import React from "react";
import { observer } from "mobx-react";

import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { roundMatchesTitle } from "../../../const/structures";
import { BracketNavSelectStyled } from "../../../styled/styledBracket";
import { Options } from "../../../models/bracket";

const style = {
  formControlLabel: {
    flexGrow: 1,
  },
  select: {
    width: "100%",
  },
};

type Props = {
  options: Options;
  setRounds: (rounds: number) => void;
  toggleRoundsActive: () => void;
};

const PlayOffsChooseRound: React.FC<Props> = observer(
  ({ options, setRounds, toggleRoundsActive }) => {
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      const rounds = event.target.value as number;
      setRounds(rounds);
    };

    return (
      <BracketNavSelectStyled row>
        <FormLabel component="legend">Rounds:</FormLabel>
        <FormControlLabel
          control={
            <Switch
              checked={options.roundsActive}
              onChange={toggleRoundsActive}
              name="roundsActive"
              color="secondary"
            />
          }
          label=""
          labelPlacement="start"
        />
        <FormControlLabel
          style={style.formControlLabel}
          disabled={!options.roundsActive}
          control={
            <Select
              style={style.select}
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
          }
          label=""
          labelPlacement="start"
        />
      </BracketNavSelectStyled>
    );
  }
);

export default PlayOffsChooseRound;
