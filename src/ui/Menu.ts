import { styled } from "styled-components";

export const Menu = styled.nav`
    padding: 2em 0;

    > * {
        text-decoration: none;
        margin-right: 2em;
        color: black;
    }

    > *:hover {
        color: grey;
    }

    > *:active {
        color: lightgrey;
    }
`