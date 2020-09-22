import styled from "styled-components";

import FormControl from "@material-ui/core/FormControl";

export const BracketSectionContainerStyled = styled.div`
  margin: 5px 1px;
  width: fit-content;
  background-color: gray;
  padding: 5px 10px;
  border-radius: 5px;
  height: fit-content;
  min-width: fit-content;
  text-align: center;
`;

export const WholeBracketContainerStyled = styled.div`
  display: flex;
  overflow-x: auto;
`;

export const BracketNavStyled = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.2);
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
    background-color: rgba(0, 0, 0, 0.4);
  }
  ${(props) =>
    props.selected
      ? `
      background-color: rgba(0, 0, 0, 0.6);
      color: white;`
      : ``}
`;

export const BracketNavSelectStyled = styled(FormControl)`
    margin: 0px 5px;
    min-width: 100px;
`