import styled from "styled-components";

import { mainTheme } from "./styledConst";

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
`;

export const MainContainer = styled.main`
  overflow-x: hidden;
  overflow-y: auto;
  flex-grow: 1;
  background-color: ${mainTheme.palette.primary.dark};
`;

export const NoContentTitle = styled.p`
  text-align: center;
  color: ${mainTheme.palette.secondary.dark};
`;

export const ContentContainerStyled = styled.div`
  padding: 5px;
`;
