import { useState } from "react";
import logo from "../assets/pizza.png";
import { Link } from "react-router-dom";
import { RegisterContainer } from "./Register"

export default function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    function signIn(event){
        event.preventDefault();

        const user = {
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
            <form onSubmit={signIn}>
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
                <button type="submit">Login</button>
            </form>
            <Link to="/sign-up" style={{textDecoration:"none"}}>
                <h6>Primeira vez?</h6>
            </Link>
            <Link to="/sign-up" style={{textDecoration:"none"}}>
                <h6>Clique aqui e faça seu cadastro!</h6> 
            </Link>   
        </RegisterContainer>
    )
};