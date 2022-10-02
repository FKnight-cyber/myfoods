import styled from "styled-components"
import Categories from "./components/Categories"

export default function ControlPage(){
    return(
        <Container>
            <div className="panel">
                <h1>Categorias</h1>
            </div>
            <Categories />
            <div className="panel">
                <h1>Produtos</h1>
            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #211A22;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;

    .panel{
        display: flex;
        align-items: center;
        width: 90%;
        height: 10vh;
        margin-bottom: 20px;
        padding-left: 10px;
        border-radius: 12px;

        background-color: crimson;
        color: #ffffff;

        font-size: 20px;
        font-style: italic;
        font-weight: 700;
        
        &:hover{
            cursor: pointer;
        }
    }
`