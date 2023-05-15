import { styled } from "styled-components";

export const SelectContainer = styled.div`
    display: flex;
    align-items: center;

    > * {
        margin-right: 16px;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
    
    @media (max-width: 530px) {
        display: block;
    }
`