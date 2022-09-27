import { useState } from "react";
import styled from "styled-components";
import logo from "../assets/pizza.png";
import { Link } from "react-router-dom";

export default function Register(){
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    function signUp(event){
        event.preventDefault();

        const user = {
            name,
            address,
            email,
            password
        };

        console.log(user)
    }
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
                <input type="text"
                placeholder="Endereço"
                value={address}
                onChange={e => setAddress(e.target.value)}
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
            <Link to="/sign-in" style={{textDecoration:"none"}}>
                <h6>Já possui uma conta?</h6>
            </Link>
            <Link to="/sign-in" style={{textDecoration:"none"}}>
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
        }
    }

    h6{
        color: #ffffff;
        font-style: italic;
    }
`