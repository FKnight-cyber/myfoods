import { useState } from "react";
import styled from "styled-components";
import Categories from "./components/Categories";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import Products from "./components/Products";

export default function ControlPage(){
    const [selectCategory, setSelectCategory] = useState(false);
    const [selectProduct, setSelectProduct] = useState(false);
    return(
        <Container>
            <div className="panel" onClick={() => setSelectCategory(!selectCategory)}>
                <h1>Categorias</h1>
                {
                    selectCategory ? 
                        <FaSortUp
                            size={30}
                            color="#ffffff"
                        />
                    :
                        <FaSortDown
                            size={30}
                            color="#ffffff"
                        />
                }    
            </div>
            <Categories 
                selectCategory={selectCategory}
            />
            <div className="panel" onClick={() => setSelectProduct(!selectProduct)}>
                <h1>Produtos</h1>
                {
                    selectProduct ? 
                        <FaSortUp
                            size={30}
                            color="#ffffff"
                        />
                    :
                        <FaSortDown
                            size={30}
                            color="#ffffff"
                        />
                }   
            </div>
            <Products 
                selectProduct={selectProduct}
            />
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
        justify-content: space-between;
        align-items: center;
        width: 90%;
        height: 10vh;
        margin-top: 20px;
        margin-bottom: 20px;
        padding-left: 10px;
        padding-right: 10px;
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