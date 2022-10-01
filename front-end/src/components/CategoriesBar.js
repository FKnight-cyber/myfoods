import styled from "styled-components";
import { FaBars,FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function CategoriesBar({category, setOpenMenu, openMenu}){
    const navigate = useNavigate();

    const { productsInCart } = useContext(UserContext);

    return(
        <Container products={productsInCart}>
            <div className="categorySelector">
                <FaBars 
                    size={30} 
                    color="#ffffff"
                    onClick={() => setOpenMenu(!openMenu)}
                />
                <h2>{category}</h2>
            </div>
            <div className="cart">
                <FaShoppingCart 
                    size={30} 
                    color="#ffffff" 
                    onClick={() => navigate("/cart")}
                />
                <h6 className="productsCount">{productsInCart}</h6>
            </div> 
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 48px;
    background-color: #E34625;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px;

    .cart,.productsCount{
        justify-content: center;
        align-items: center;
    }

    .cart{
        display: flex;
        position: relative;

        .productsCount{
            display: ${props => props.products > 0 ? "flex" : "none"};
            position: absolute;
            top: -6px;
            right: -12px;
            color: #ffffff;
            background-color: #7ED321;
            width: 24px;
            height: 24px;
            border-radius: 50%;
        }
    }

    .categorySelector{
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2{
            color: #ffffff;
            font-style: italic;
            font-weight: 600;
            font-size: 20px;
            margin-left: 10px;
        }
    }
`