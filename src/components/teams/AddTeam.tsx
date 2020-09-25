import React, { useState } from "react";
import { useForm } from "react-hook-form";

import AddIcon from "@material-ui/icons/Add";

import { Team } from "../../models/team";
import { Tournament } from "../../models/tournament";
import { IconButtonStyled } from "../../styled/styledButtons";
import {
  AddTeamFormStyled,
  AddTeamTextFieldStyled,
} from "../../styled/styledTeams";

type Props = {
  tournament: Tournament;
};

const AddTeam: React.FC<Props> = ({ tournament }) => {
  const { handleSubmit, register, errors } = useForm();
  const [name, setName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = (e: any) => {
    console.log(e);
    if (/[\S]/.test(name)) {
      tournament.addTeam(new Team(name));
      setName("");
    } else {
      console.log("wrong string");
    }
  };
  return (
    <>
      <AddTeamFormStyled onSubmit={handleSubmit(onSubmit)}>
        <AddTeamTextFieldStyled
          label="Nazwa"
          onChange={handleChange}
          value={name}
          inputProps={{
            name: "name",
            ref: register({
              required: "Required",
              maxLength: 255,
              minLength: 2,
            }),
          }}
          helperText={
            errors.name && "Nazwa musi zawierać przynajmniej 2 znaki!"
          }
          error={Boolean(errors.name)}
        />
        {errors.username && errors.username.message}
        <IconButtonStyled aria-label="add" type="submit">
          <AddIcon />
        </IconButtonStyled>
      </AddTeamFormStyled>
    </>
  );
};

export default AddTeam;
