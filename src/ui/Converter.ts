import { styled } from "styled-components";
import Select from 'react-select';
import { Input } from "./Input";
import { ReactComponent as Transfer } from '../icons/transfer.svg';

export const Converter = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas: 
        "llabel icon rlabel" 
        "lselect icon rselect"
        "linput icon rinput"
        "lspan . rspan";
    column-gap: 10px;
    row-gap: 10px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: repeat(9, 50px);
        grid-template-areas: 
        ". llabel ."
        ". lselect ."
        ". linput ."
        ". lspan ."
        ". icon ."
        ". rlabel ." 
        ". rselect ."
        ". rinput ."
        ". rspan .";
    }
`  
export const ConverterLable =  styled.label`
    color: silver;
`

export const Llabel = styled(ConverterLable)`
    grid-area: llabel;
    align-self: self-end;
`;

export const Rlablel = styled(ConverterLable)`
    grid-area: rlabel;
    align-self: self-end;
`;

export const Lselect = styled(Select)`
    grid-area: lselect;
`;

export const Rselect = styled(Select)`
    grid-area: rselect;
`;

export const Linput = styled(Input)`
    grid-area: linput;
`;

export const Rinput = styled(Input)`
    grid-area: rinput;
`;

export const CenterIcon = styled(Transfer)`
    grid-area: icon;
    width: 60px;
    align-self: center;
    justify-self: center;

    @media (max-width: 768px) {
        transform: rotate(90deg); 
    }
`

export const Rspan = styled(ConverterLable)`
    grid-area: rspan;
    font-size: 0.8rem
`;

export const Lspan = styled(ConverterLable)`
    grid-area: lspan;
    font-size: 0.8rem;
`;
