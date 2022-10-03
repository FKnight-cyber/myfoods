import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/myfoods.png";
import CategoriesBar from "../components/CategoriesBar";
import CategoriesMenu from "../components/CategoriesMenu";
import Products from "../components/Products";
import { FaSignOutAlt,FaUserAlt } from "react-icons/fa";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { LoadFood } from "../components/Loaders/initialPageLoaders";

export default function InitialPage(){
    const [category, setCategory] = useState("Pizzas");
    const [openMenu, setOpenMenu] = useState(false);
    const [loadFood, setLoadFood] = useState(false);
    const [loadCategory, setLoadCategory] = useState(true);

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

    if(token === ""){
        navigate('/');
    }

    useEffect(() => {
        setLoadFood(true);
        setLoadCategory(true);
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/info`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setLoadCategory(false);
            setName(res.data.name);
            setCEP(res.data.cep);
            setCity(res.data.city);
            setDistrict(res.data.district);
            setRoad(res.data.road.split("Rua "));
            setNumber(res.data.houseNumber);
        });

        promise.catch(Error => {
            setLoadFood(false);
            setLoadCategory(false);
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
            if(Error.response.status === 401){
                localStorage.setItem('authToken', '');
                setToken('');
                navigate('/');
            }
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
                    className="icon" 
                />
                <img src={logo} alt="pizza" srcset="" />
                <FaUserAlt
                    size={30}
                    color="#ffffff"
                    onClick={() => navigate("/user")}
                    className="icon" 
                />
            </header>
            <CategoriesBar 
                category={category}
                openMenu={openMenu} 
                setOpenMenu={setOpenMenu} 
                className="icon"
                loadCategory={loadCategory}
            />
            <CategoriesMenu
                openMenu={openMenu}
                categoria={category}
                setCategory={setCategory}
                setOpenMenu={setOpenMenu}
                className="icon" 
            />
            {
                loadFood ?
                <LoadFood />
                :
                <Products 
                    openMenu={openMenu} 
                    category={category}
                    setLoadFood={setLoadFood}
                />
            }
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

    .icon{
        &:hover{
            cursor: pointer;
        }
    }

    header{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 20px;
        position: relative;
        width: 100%;
        
        img{
            width: 200px;
            height: 200px;
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