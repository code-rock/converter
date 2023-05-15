import { styled } from "styled-components";

export const Button = styled.button`
    font-size: 14px;
    background: #2684ff;
    border: 1px solid #2684ff;
    padding: 10px 16px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background: #2277e7;
        border: 1px solid #2277e7;
    }

    &:active {
        background: #1e61b9;
        border: 1px solid #1e61b9;
    }
`