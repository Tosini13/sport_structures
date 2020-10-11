import React from "react";

import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

import { Group } from "../../../models/group";
import MatchSummaryMock from "../../matches/MatchSummaryMock";
import { GroupTitleText, GroupTeamText } from "../../../styled/styledGroup";

export interface GroupListProps {
  groups: Group[];
  handleChooseGroup: (group: Group) => void;
}

const GroupList: React.FC<GroupListProps> = ({ groups, handleChooseGroup }) => {
  return (
    <List style={{ color: "white" }}>
      {groups.map((group) => (
        <div key={group.id}>
          <div
            onClick={() => {
              handleChooseGroup(group);
            }}
          >
            Add
          </div>
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
