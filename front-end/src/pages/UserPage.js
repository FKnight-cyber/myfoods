import styled from "styled-components";
import { FaOutdent } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserPage(){
    const [purchases, setPurchases] = useState(0);

    const navigate = useNavigate();

    const { 
        token,
        name,
        CEP,
        city,
        district,
        road,
        number 
    } = useContext(UserContext);

    return(
        <Container>
            <h1>Nome</h1>
            <h2>{name}</h2>
            <h1>CEP</h1>
            <h2>{CEP}</h2>
            <h1>Cidade</h1>
            <h2>{city}</h2>
            <h1>Bairro</h1>
            <h2>{district}</h2>
            <h1>Rua</h1>
            <h2>{road}</h2>
            <h1>Número da casa</h1>
            <h2>{number}</h2>
            <h1>Total de pedidos: {purchases}</h1>
            <h3>Mais x pedidos para ganhar desconto de 30 reais!</h3>
            <FaOutdent
                size={30}
                color="#ffffff"
                onClick={() => navigate(-1)}
            />
        </Container>
    )
};

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #211A22;
    padding: 14px;
    position: relative;

    h1,h2,h3{
        color: #ffffff;
    }

    h1{
        font-style: italic;
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 6px;
    }

    h2{
        margin-bottom: 20px;
        font-size: 16px;
    }

    h3{
        font-size: 14px;
    }

    > * {
        &:last-child {
            position: absolute;
            top: 14px;
            right: 14px;
        }
    }
`