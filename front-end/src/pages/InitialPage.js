import { useState } from "react";
import styled from "styled-components";
import logo from "../assets/pizza.png";
import CategoriesBar from "../components/CategoriesBar";
import Products from "../components/Products";

export default function InitialPage(){
    const [category, setCategory] = useState("Pizzas")
    return(
        <InitialPageContainer>
            <header>
                <img src={logo} alt="pizza" srcset="" />
            </header>
            <CategoriesBar category={category} />
            <Products category={category} />
        </InitialPageContainer>
    )
};

const InitialPageContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #211A22;
    display: flex;
    flex-direction: column;
    align-items: center;

    header{
        padding-top: 40px;
        img{
            width: 106px;
            height: 106px;
        }
    }

`