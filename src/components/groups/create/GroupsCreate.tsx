import React, { useState } from "react";
import { observer } from "mobx-react";

import GroupsCreateCreateMenu from "./GroupsCreateCreateMenu";
import { Tournament } from "../../../models/tournament";
import { Team } from "../../../models/team";
import { PromotedTeam } from "../../../const/groupConst";
import GroupList from "./GroupsList";
import GroupsChooseTeamsList from "./GroupsChooseTeamsList";
import { Id } from "../../../const/structures";
import { Group } from "../../../models/group";

type Props = {
  tournament: Tournament;
  toggleCreate: () => void;
};

const GroupsCreate: React.FC<Props> = observer(
  ({ tournament, toggleCreate }) => {
    const [chosenTeams, setChosenTeams] = useState<Team[]>([]);
    const [chosenGroup, setChosenGroup] = useState<Group>();

    const submitGroups = () => {
      toggleCreate();
    };

    const cancelCreation = () => {
      toggleCreate();
    };

    const drawGroupsMatches = () => {
      if (tournament.groupStage?.groups.length) {
        tournament.groupStage?.createRandomGroups(
          tournament.teams,
          tournament.groupStage.groups.length,
          tournament,
          false
        );
      }
    };

    const addGroup = () => {
      if (
        tournament.groupStage &&
        tournament.groupStage.groups.length <
          Math.ceil(tournament.teams.length / 2) - 1
      ) {
        setChosenTeams([]);
        tournament.groupStage?.createGroups(
          tournament.teams,
          tournament.groupStage.groups.length + 1
        );
      }
    };

    const removeGroup = () => {
      if (tournament.groupStage && tournament.groupStage.groups.length > 1) {
        setChosenTeams([]);
        tournament.groupStage?.createGroups(
          tournament.teams,
          tournament.groupStage.groups.length - 1
        );
      }
    };

    const handleChooseTeam = (team: Team) => {
      if (
        chosenTeams.includes(team) &&
        chosenGroup?.teams &&
        !chosenGroup.teams.includes(team)
      ) {
      } else if (
        chosenTeams.includes(team) &&
        chosenGroup?.teams &&
        chosenGroup.teams.includes(team)
      ) {
        const groupTeams = [...chosenGroup.teams];
        chosenGroup.teams = groupTeams.filter(
          (groupTeam) => groupTeam.id !== team.id
        );
        setChosenTeams(
          chosenTeams.filter((chosenTeam) => chosenTeam.id !== team.id)
        );
      } else if (
        chosenGroup?.teamsQtt &&
        chosenGroup.teamsQtt > chosenGroup?.teams.length
      ) {
        chosenGroup?.teams.push(team);
        setChosenTeams([...chosenTeams, team]);
      }
    };

    const handleChooseGroup = (group: Group) => {
      setChosenGroup(group);
    };

    const handleAcceptTeams = () => {
      tournament.groupStage?.initGroupMatches(
        tournament.teams,
        tournament.groupStage.groups,
        tournament,
        false
      );
      setChosenGroup(undefined);
    };

    if (chosenGroup !== undefined) {
      return (
        <>
          {chosenGroup.name}
          <GroupsChooseTeamsList
            teams={tournament.teams}
            chosenTeams={chosenTeams}
            handleChooseTeam={handleChooseTeam}
            handleAcceptTeams={handleAcceptTeams}
          />
        </>
      );
    }

    return (
      <div>
        <GroupsCreateCreateMenu
          submitGroups={submitGroups}
          cancelCreation={cancelCreation}
          drawGroupsMatches={drawGroupsMatches}
          addGroup={addGroup}
          removeGroup={removeGroup}
        />
        {tournament.groupStage?.groups.length ? (
          <GroupList
            groups={tournament.groupStage.groups}
            handleChooseGroup={handleChooseGroup}
          />
        ) : null}
      </div>
    );
  }
);

export default GroupsCreate;
