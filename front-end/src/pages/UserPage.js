import styled from "styled-components";
import { FaOutdent } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserPage(){
    const [name, setName] = useState('');
    const [CEP, setCEP] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [road, setRoad] = useState('');
    const [number, setNumber] = useState('');
    const [purchases, setPurchases] = useState(0);

    const navigate = useNavigate();

    const { token } = useContext(UserContext);

    useEffect(() => {
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/info`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setName(res.data.name);
            setCEP(res.data.cep);
            setCity(res.data.city);
            setDistrict(res.data.district);
            setRoad(res.data.road.split("Rua "));
            setNumber(res.data.houseNumber);
        });

        promise.catch(Error => {
            let timerInterval
            Swal.fire({
                title: 'Error!',
                icon: 'error',
                html: `${Error.response.data}`,
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                 if (result.dismiss === Swal.DismissReason.timer) {
                    return;
                }
            })
        });

    },[]);

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