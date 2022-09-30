import { useContext, useState } from "react";
import styled from "styled-components";
import logo from "../assets/pizza.png";
import CategoriesBar from "../components/CategoriesBar";
import CategoriesMenu from "../components/CategoriesMenu";
import Products from "../components/Products";
import { FaSignOutAlt,FaUserAlt } from "react-icons/fa";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function InitialPage(){
    const [category, setCategory] = useState("Pizzas");
    const [openMenu, setOpenMenu] = useState(false);

    const { setToken } = useContext(UserContext);
    const navigate = useNavigate();

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