import styled from "styled-components";
import { Link } from "react-router-dom";

import BottomNavigation from "@material-ui/core/BottomNavigation";

import { styledColors } from "./styledConst";

export const MenuSideBarContainerStyled = styled.div<{ opened: boolean }>`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 80vw;
  z-index: 10;
  transition: transform 0.3s, box-shadow 0.5s;
  background-color: ${styledColors.primary.main};
  color: ${styledColors.secondary.main};

  transform: ${(props) =>
    props.opened
      ? `translateX(0%);
        box-shadow: 0px 0px 10px rgba(0,0,0,0.6);`
      : `translateX(-100%);
        box-shadow: none;`};
`;

export const NavBarStyled = styled.nav`
  position: relative;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  height: 40px;
`;

export const NavContainerStyled = styled.div`
  width: 100%;
  background-color: ${styledColors.primary.main};
  color: ${styledColors.secondary.main};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  z-index: 10;
`;

export const MenuLinkStyled = styled(Link)`
  color: inherit;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

export const BottomNavigationStyled = styled(BottomNavigation)`
  background-color: ${styledColors.primary.main};
  color: ${styledColors.secondary.main};
  max-width: 100vw;
  overflow: hidden;
  filter: drop-shadow(0px -4px 4px rgba(0, 0, 0, 0.25));
`;

export const BottomNavigationActionLinkStyled = styled(Link)`
  min-width: 0px;
  &.MuiBottomNavigationAction-root.Mui-selected {
    color: ${styledColors.secondary.main};
  }
  .MuiBottomNavigationAction-label.Mui-selected {
    font-size: 0.575rem;
  }
`;
