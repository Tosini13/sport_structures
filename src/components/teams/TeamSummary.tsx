import React from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { Team } from "../../models/team";
import { TeamListElementStyled } from "../../styled/styledTeams";
import { ListItemTextStyled } from "../../styled/styledBracket";

type Props = {
  team: Team;
  handleDeleteTeam: (team: Team) => void;
  handleEditTeam: (team: Team) => void;
};

const TeamSummary: React.FC<Props> = ({
  team,
  handleDeleteTeam,
  handleEditTeam,
}) => {
  const handleDelete = () => {
    handleDeleteTeam(team);
  };

  return (
    <TeamListElementStyled button>
      <ListItemTextStyled primary={team.name} />
      <ListItemSecondaryAction>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
        <IconButton>
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </TeamListElementStyled>
  );
};

export default TeamSummary;
