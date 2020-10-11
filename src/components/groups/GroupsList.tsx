import React from "react";

import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import { Group } from "../../models/group";
import { GroupTeamText, GroupTitleText } from "../../styled/styledGroup";
import MatchSummaryMock from "../matches/MatchSummaryMock";

export interface GroupListProps {
  groups: Group[];
}

const GroupList: React.FC<GroupListProps> = ({ groups }) => {
  return (
    <List style={{ color: "white" }}>
      {groups.map((group) => (
        <div key={group.id}>
          <GroupTitleText>{group.name}</GroupTitleText>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="flex-start"
          >
            {group.teams.map((team) => (
              <GroupTeamText key={team.id}>{team.name}</GroupTeamText>
            ))}
          </Grid>
          <List>
            {group.matches.map((match) => (
              <div key={match.id}>
                <MatchSummaryMock match={match} teams={group.teams} />
              </div>
            ))}
          </List>
        </div>
      ))}
    </List>
  );
};

export default GroupList;
