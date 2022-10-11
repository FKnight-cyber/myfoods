import { useState } from "react";
import styled from "styled-components";
import logo from "../assets/myfoods.png";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import Food from "../components/Loaders/authLoaders";

export default function Register(){
    const [name,setName] = useState('');
    const [cep,setCep] = useState('');
    const [houseNumber,setHouseNumber] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [load, setLoad] = useState(false);

    const navigate = useNavigate();

    async function signUp(event){
        event.preventDefault();
        setLoad(true);

        const body = {
            name,
            cep,
            houseNumber,
            email,
            password
        };
                
        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-up`,body);
                
        promise.then(res => {
            setLoad(false);
            navigate("/");
        });
                
        promise.catch(Error => {
            setLoad(false);
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
    };

    return(
        <RegisterContainer>
            {
                load ?
                <Food />
                :
                <>
                    <header>
                        <img src={logo} alt="pizza" srcset="" />
                    </header>
                    <form onSubmit={signUp}>
                        <input
                            data-cy="cy-name" 
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            data-cy="cy-cep" 
                            type="number"
                            placeholder="CEP"
                            onChange={e => {
                                if(e.target.value.toString().length > 8){
                                    return;
                                }else{
                                    setCep(e.target.value);
                                }       
                            }}
                            value={cep}
                        />
                        <input 
                            type="number"
                            data-cy="cy-house-number"
                            placeholder="Número da casa"
                            maxLength="10"
                            value={houseNumber}
                            onChange={e => {
                                if(e.target.value.toString().length > 10){
                                    return;
                                }else{
                                    setHouseNumber(e.target.value);
                                }       
                            }}
                        />
                        <input 
                            type="email"
                            data-cy="cy-email"
                            placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input 
                            type="password"
                            data-cy="cy-pass"
                            placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button data-cy="cy-submit-register" type="submit">Register</button>
                    </form>
                    <Link to="/" style={{textDecoration:"none"}}>
                        <h6>Já possui uma conta?</h6>
                    </Link>
                    <Link to="/" style={{textDecoration:"none"}}>
                        <h6>Clique aqui e faça seu login!</h6> 
                    </Link>  
                </>
            } 
        </RegisterContainer>
    )
};

export const RegisterContainer = styled.div`
    width: 100%;
    min-height: 636px;
    height: 100vh;
    background-color: #211A22;
    padding: 40px 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;

    header{
        width: 100%;
        min-height: 200px;
        max-height: 20vh;
        display: flex;
        justify-content: center;
        margin-bottom: 5vh;

        img{
            width: 200px;
            height: 200px;
        }
    }

    form,input{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    form{
        width: 90%;
        height: 400px;
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

            &:hover{
                cursor: pointer;
            }
        }
    }

    h6{
        color: #ffffff;
        font-style: italic;
    }
`