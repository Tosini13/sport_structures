import styled from "styled-components";

import { styledColors } from "./styledConst";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";

export const AddTeamFormStyled = styled.form`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AddTeamTextFieldStyled = styled(TextField)`
  flex-grow: 1;
`;

export const TeamListStyled = styled(List)`
  padding: 2px 0px;
  margin: 5px 0px;
  width: 100%;
  div:last-child {
    border: none;
  }
`;

export const TeamListElementStyled = styled(ListItem)`
  color: ${styledColors.secondary.main};
  padding: 5px;
`;

export const TeamListNameStyled = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin: 0px 10px;
`;
