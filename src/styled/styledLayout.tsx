import styled from "styled-components";

import { styledColors } from "./styledConst";

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
  background-color: ${styledColors.primary.dark};
`;

export const NoContentTitle = styled.p`
  text-align: center;
  color: ${styledColors.secondary.dark};
`;
