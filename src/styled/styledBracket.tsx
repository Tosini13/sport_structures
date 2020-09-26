import styled from "styled-components";

import FormControl from "@material-ui/core/FormControl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { mainTheme } from "./styledConst";

export const BracketSectionContainerStyled = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

export const WholeBracketContainerStyled = styled.div`
  display: flex;
  overflow-x: auto;
`;

export const BracketNavStyled = styled.div`
  display: flex;
  background-color: ${mainTheme.palette.primary.dark};
  color: ${mainTheme.palette.secondary.main};
  padding: 5px;
  align-items: center;
  justify-content: space-between;
  overflow-y: auto;
`;

export const BracketNavMenuStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const BracketNavItemStyled = styled.p<{ selected: boolean }>`
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0px 2px;
  transition: background-color 0.3s;
  cursor: pointer;
  &:hover {
    background-color: ${mainTheme.palette.primary.main};
  }
  ${(props) =>
    props.selected
      ? `
      background-color: ${mainTheme.palette.primary.main};
      color: ${mainTheme.palette.secondary.main};`
      : ``}
`;

export const BracketNavSelectStyled = styled(FormControl)`
  margin: 0px 5px;
  min-width: 100px;
`;

export const ChooseListStyled = styled(List)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
`;

export const ChooseListItemStyled = styled(ListItem)`
  background-color: ${mainTheme.palette.secondary.main};
  border-radius: 3px;
  padding: 0px 5px;
`;

export const ChooseListItemSecondaryActionStyled = styled(
  ListItemSecondaryAction
)`
  right: 0px;
`;

export const ChooseListItemTextStyled = styled(ListItemText)`
  > .MuiTypography-body1 {
    font-size: 0.8rem;
  }
`;

export const BracketRoundTitleStyled = styled.div`
  font-size: 9px;
  color: ${mainTheme.palette.secondary.main};
`;

export const BracketMatchTeamsContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  > p:nth-child(1) {
    grid-column: 1/4;
    justify-content: flex-end;
    text-align: right;
  }
  > p:nth-child(2) {
    grid-column: 4/5;
  }
  > p:nth-child(3) {
    grid-column: 5/8;
    justify-content: flex-start;
  }
  > p {
    margin: 0px;
    padding: 0px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const BracketMatchContainerStyled = styled.div`
  background-color: ${mainTheme.palette.primary.main};
  margin: 3px 0px;
  padding: 5px;
  border-radius: 5px;
  box-sizing: border-box;
`;

export const BracketRoundsContainerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const BracketRoundContainerStyled = styled.div`
  text-align: center;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 3px;
  width: 100%;
  min-width: 270px;
  max-width: 325px;
`;
