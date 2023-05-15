import { styled } from "styled-components";

export const Input = styled.input`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    color: hsl(0, 0%, 20%);
    outline: 0!important;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    padding: 1px 10px;
    font-size: 16px;
    appearance: none;

    &:focus {
        border: 2px solid #2684ff;
        padding: 0px 9px;
        box-sizing: border-box;
        appearance: none;
    }
    &:hover {
        appearance: none;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    &[type='number'] {
        -moz-appearance:textfield;
    }
`