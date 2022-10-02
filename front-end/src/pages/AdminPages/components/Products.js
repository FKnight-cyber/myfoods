import styled from "styled-components";
import axios from "axios";

export default function Products({selectProduct}){
    return(
        <Container selected={selectProduct}>
            
        </Container>
    )
};

const Container = styled.div`
    display: ${props => props.selected ? "flex" : "none"};
    flex-direction: column;
    width: 80%;
    height: 500px;
    background-color: crimson;
    overflow-y: scroll;
`