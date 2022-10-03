import { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import logo from "../assets/myfoods.png";
import { Link,useNavigate } from "react-router-dom";
import { RegisterContainer } from "./Register";
import axios from "axios";
import Swal from 'sweetalert2';
import Food from "../components/Loaders/authLoaders";

export default function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [load, setLoad] = useState(false);

    const navigate = useNavigate();

    const { setToken } = useContext(UserContext);

    function signIn(event){
        event.preventDefault();
        setLoad(true);
        const body = {
            email,
            password
        };

        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-in`,body);

        promise.then(res => {
            setLoad(false);
            if(res.data.redirectTo){
                localStorage.setItem("authToken", res.data.token);
                setToken(res.data.token);
                window.location.href = `${res.data.redirectTo}`;
                return;
            }else{
                localStorage.setItem("authToken", res.data);
                setToken(res.data);
                navigate("/initialpage");
            }
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
    }
    return(
        <RegisterContainer>
            {
                load ?
                <Food size={10} />
                :
                <>
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
                </>
            }  
        </RegisterContainer>
    )
};