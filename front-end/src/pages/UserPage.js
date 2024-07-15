import styled from "styled-components";
import { FaOutdent } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserPage() {
    const [purchases, setPurchases] = useState(0);

    const navigate = useNavigate();

    const { 
        token,
        name,
        email,
        CEP,
        city,
        district,
        road,
        number 
    } = useContext(UserContext);

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }

        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/purchase/info`, {
            headers: { 'x-access-token': `${token}` }
        });

        promise.then(res => {
            setPurchases(res.data.length);
        });

        promise.catch(Error => {
            let timerInterval;
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
                return;
            });
            if (Error.response.status === 401) {
                localStorage.setItem('authToken', '');
                navigate('/');
            }
        });
    }, [token, navigate]);

    return (
        <Container>
            <h1>Nome</h1>
            <h2>{name || 'N/A'}</h2>
            <h1>Email</h1>
            <h2>{email || 'N/A'}</h2>
            <h1>CEP</h1>
            <h2>{CEP || 'N/A'}</h2>
            <h1>Cidade</h1>
            <h2>{city || 'N/A'}</h2>
            <h1>Bairro</h1>
            <h2>{district || 'N/A'}</h2>
            <h1>Rua</h1>
            <h2>{road || 'N/A'}</h2>
            <h1>Número da casa</h1>
            <h2>{number || 'N/A'}</h2>
            <h1>Total de pedidos: {purchases}</h1>
            <FaOutdent
                size={30}
                color="#ffffff"
                onClick={() => navigate(-1)}
                className="icon"
            />
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #211A22;
    padding: 14px;
    position: relative;

    .icon{
        &:hover{
            cursor: pointer;
        }
    }

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
