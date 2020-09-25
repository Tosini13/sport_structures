import styled from "styled-components";

import IconButton from '@material-ui/core/IconButton';

export const IconButtonBackStyled = styled(IconButton)`
    display: flex;
    align-items: center;
    opacity: 0;
    transform: translate(-100px, 0px);
    transition: transform 0.3s, opacity 0.3s;
    color: black;
    &.btn-back-show {
        transform: translate(0px, 0px);
        opacity: 1;
    }
`

export const IconButtonStyled = styled(IconButton)`
    padding: 5px;
    margin: 0px 2px;
    height: fit-content;
    width: fit-content;
`