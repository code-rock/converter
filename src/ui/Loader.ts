import { ReactComponent } from '../icons/loader.svg';
import styled from "styled-components";

export const Loader = styled(ReactComponent)`
    width: 40px;
    height: 40px;
    -webkit-animation: loader 1.5s infinite linear;
    animation: loader 1.5s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  
    @keyframes loader {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
`

export const LoaderContainer = styled.div`
    width: 100%;
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
`
