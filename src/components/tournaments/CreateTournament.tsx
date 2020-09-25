import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";

import TextField from "@material-ui/core/TextField";

import { Tournament } from "../../models/tournament";
import { TournamentStoreContext } from "../../store/TournamentsStore";
import { RouterStateContext } from "../../store/RouterState";
import { routerConstString, bottomMenuConst } from "../../const/menuConst";

const CreateTournament = observer(() => {
  const history = useHistory();
  const TournamentsStore = useContext(TournamentStoreContext);
  const routerState = useContext(RouterStateContext);
  const { handleSubmit, register, errors } = useForm();
  
  const onSubmit = (values: any) => {
    const tournament = new Tournament(values.name);
    tournament.id = TournamentsStore.tournaments.length.toString(); //temporary
    TournamentsStore.addTournament(tournament);
    routerState.selectRoute(bottomMenuConst.tournaments);
    history.push(routerConstString.tournaments);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Title"
        inputProps={{
          name: "name",
          ref: register({ required: "Required", maxLength: 255, minLength: 2 }),
        }}
        helperText={errors.name && "Title must have at least 2 signs!"}
        error={Boolean(errors.name)}
      />
      ;{errors.username && errors.username.message}
      <button type="submit">Create</button>
    </form>
  );
});

export default CreateTournament;
