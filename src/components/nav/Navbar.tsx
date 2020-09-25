import React, { useState } from 'react'

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import MenuSideBar from './mainMenu/MenuSideBar'
import { NavBarStyled, NavContainerStyled } from '../../styled/styledNav';
import { IconButtonBackStyled } from '../../styled/styledButtons';
import { HamburgerStyled } from '../../styled/styledIcons';

const Navbar = () => {

    const [sideBarMenuOpened, setSideBarMenu] = useState(false)

    const toggleSideBarMenu = () => {
        setSideBarMenu(!sideBarMenuOpened);
    }

    return (
        <>
            <NavContainerStyled>
                <NavBarStyled>
                    <IconButtonBackStyled className='btn-back'>
                        <KeyboardArrowLeftIcon fontSize="large" />
                    </IconButtonBackStyled>
                    <HamburgerStyled open={sideBarMenuOpened} onClick={toggleSideBarMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </HamburgerStyled>
                </NavBarStyled>
            </NavContainerStyled>
            <MenuSideBar sideBarMenuOpened={sideBarMenuOpened} toggleSideBarMenu={toggleSideBarMenu} />
        </>
    )
}

export default Navbar;