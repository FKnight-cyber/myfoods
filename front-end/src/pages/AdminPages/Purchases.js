import styled from "styled-components"
import React, { useContext, useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import UserContext from "../../context/UserContext";

export default function Purchases(){
    const [date, setDate] = useState(new Date());
    const [formatedDate, setFormatedDate] = useState(formatDate(new Date()));
    const [purchases,setPurchases] = useState(0);

    const { token } = useContext(UserContext);

    const navigate = useNavigate();

    function renderPurchases(){
        const tomorrow = new Date(date);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const body = {
            dateInit: formatedDate,
            dateEnd: tomorrow.toISOString().split('T')[0]
        }

        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/admin/purchase/info`,body,{
            headers:{'x-access-token': `${token}`}
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
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                 return;
            });
            if(Error.response.status === 401){
                localStorage.setItem('authToken', '');
                navigate('/');
            }
        });
    }

    function formatDate(date){
        return date.toISOString().split('T')[0];
    };

    return(
        <Container>
            <h1>Verificar pedidos no dia: {date.getDate()}</h1>
            <StyledCalendar
                value={date} 
                onChange={(date) => {
                    setDate(date);
                    setFormatedDate(formatDate(date));
                }}
            />
            <FaBackward 
                size={40} 
                color="crimson"
                className="icon"
                onClick={() => navigate(-1)}
            />
            <button className="check" onClick={renderPurchases}>
                Visualizar
            </button>
            {
                purchases > 0 ? <h2>Foram feitos {purchases} pedidos nesse dia.</h2> 
                : <h2>Nenhum pedido foi feito ;(</h2>
            }
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #211A22;
    position: relative;
    text-align: center;

    .icon{
        position: absolute;
        left: 18px;
        top: 18px;

        &:hover{
            cursor: pointer;
        }
    }

    h1{
        width: 90%;
        font-size: 36px;
        color: crimson;
        margin-bottom: 20px;    
    }

    h2{
        width: 90%;
        font-size: 30px;
        color: crimson;
        margin-top: 40px;
        font-weight: 700;
    }

    .check{
        width: 200px;
        height: 60px;
        border: solid 2px #ffffff;
        margin-top: 20px;
        background-color: crimson;
        color: #ffffff;
        font-size: 24px;
        border-radius: 12px;
        
        &:hover{
            cursor: pointer;
        }
    }
`

const StyledCalendar = styled(Calendar)`
  --moedim-primary: blue;
    width: 90%;
    height: 40vh;
`;