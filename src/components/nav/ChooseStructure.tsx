import React from "react";
import { observer } from "mobx-react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { appState } from "../../store/AppState";
import { structuresConst, structuresConstString } from "../../const/structures";

const ChooseStructure = observer(() => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    appState.selectStructure(event.target.value as structuresConst);
  };

  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Structure</InputLabel>
      <Select
        id="demo-simple-select"
        value={appState.selectedStructure}
        onChange={handleChange}
      >
        {Object.values(structuresConst).map((structure) => (
          <MenuItem key={structure} value={structure}>
            {structuresConstString.get(structure)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default ChooseStructure;
