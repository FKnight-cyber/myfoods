import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/pizza.png";
import CategoriesBar from "../components/CategoriesBar";
import CategoriesMenu from "../components/CategoriesMenu";
import Products from "../components/Products";
import { FaSignOutAlt,FaUserAlt } from "react-icons/fa";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function InitialPage(){
    const [category, setCategory] = useState("Pizzas");
    const [openMenu, setOpenMenu] = useState(false);

    const { 
        token,
        setToken,
        setName,
        setCEP,
        setCity,
        setDistrict,
        setRoad,
        setNumber 
    } = useContext(UserContext);

    const navigate = useNavigate();

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
        <InitialPageContainer>
            <header>
                <FaSignOutAlt 
                    size={30} 
                    color="#ffffff"
                    onClick={()=>{
                        localStorage.setItem("authToken", "");
                        setToken("");
                        navigate("/");
                    }} 
                />
                <img src={logo} alt="pizza" srcset="" />
                <FaUserAlt
                    size={30}
                    color="#ffffff"
                    onClick={() => navigate("/user")} 
                />
            </header>
            <CategoriesBar 
                category={category}
                openMenu={openMenu} 
                setOpenMenu={setOpenMenu} 
            />
            <CategoriesMenu
                openMenu={openMenu}
                categoria={category}
                setCategory={setCategory}
                setOpenMenu={setOpenMenu} 
            />
            <Products 
                openMenu={openMenu} 
                category={category}
            />
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
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 40px;
        position: relative;
        width: 100%;
        
        img{
            width: 106px;
            height: 106px;
        }

        > * {
            &:first-child {
                position: absolute;
                top: 14px;
                left: 14px;
            }

            &:last-child {
                position: absolute;
                top: 14px;
                right: 14px;
            }
        }
    }

`