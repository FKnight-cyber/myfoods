import { useState } from "react";
import styled from "styled-components";
import logo from "../assets/pizza.png";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

export default function Register(){
    const [name,setName] = useState('');
    const [cep,setCep] = useState('');
    const [houseNumber,setHouseNumber] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();

    async function signUp(event){
        event.preventDefault();

        const promise2 = axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        promise2.then(res => {
            if(res.data.localidade === "Fortaleza"){
                if(res.data.bairro !== "Parangaba"){
                    Swal.fire({
                        title: 'Error!',
                        icon: 'error',
                        html: "Desculpe, não entregamos na sua localidade ;(",
                        timer: 2000,
                        timerProgressBar: true,
                        }).then((result) => {
                            return;
                        })
                    }else{
                        const body = {
                            name,
                            cep,
                            houseNumber,
                            email,
                            password
                        };
                
                        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-up`,body);
                
                        promise.then(res => {
                            navigate("/");
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
                    }
                }
            });

        promise2.catch(Error => {
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
                if (result.dismiss === Swal.DismissReason.timer) {
                    return;
                }
            })
        });
    };

    return(
        <RegisterContainer>
            <header>
                <img src={logo} alt="pizza" srcset="" />
            </header>
            <form onSubmit={signUp}>
                <input type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                 />
                <input type="number"
                    placeholder="CEP"
                    maxLength={8}
                    value={cep}
                    onChange={e => setCep(e.target.value)}
                 />
                 <input type="number"
                    placeholder="Número da casa"
                    maxLength={10}
                    value={houseNumber}
                    onChange={e => setHouseNumber(e.target.value)}
                 />
                <input type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                 />
                <input type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                 />
                <button type="submit">Register</button>
            </form>
            <Link to="/" style={{textDecoration:"none"}}>
                <h6>Já possui uma conta?</h6>
            </Link>
            <Link to="/" style={{textDecoration:"none"}}>
                <h6>Clique aqui e faça seu login!</h6> 
            </Link>   
        </RegisterContainer>
    )
};

export const RegisterContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #211A22;
    padding: 40px 20px;
    display: flex;
    align-items: center;
    flex-direction: column;

    header{
        width: 100%;
        height: 20vh;
        display: flex;
        justify-content: center;

        img{
            width: 106px;
            height: 106px;
        }
    }

    form,input{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    form{
        width: 90%;
        height: 50vh;
        flex-direction: column;

        input, select, textarea{
            color: #ffffff;
            font-style: italic;
            font-weight: 200;
            font-size: 20px;
        }

        textarea:focus, input:focus {
            color: #ffffff;
            font-style: italic;
            font-weight: 200;
            font-size: 20px;
        }
       
        input{
            width: 100%;
            height: 44px;
            margin-bottom: 20px;
            background-color: #E34625;
            border-radius: 10px;
            padding-left: 8px;
            border: none;

            &::placeholder{
                color: #ffffff;
                font-style: italic;
                font-weight: 700;
                font-size: 20px;
            }
        }

        button{
            width: 200px;
            height: 60px;
            border-radius: 50%;
            background-color: #E34625;
            color: #ffffff;
            font-style: italic;
            font-weight: 700;
            font-size: 20px;
            border: none;
            margin-bottom: 20px;
        }
    }

    h6{
        color: #ffffff;
        font-style: italic;
    }
`