import styled from "styled-components";
import { FaBars,FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CategoriesBar({category, setOpenMenu, openMenu}){
    const navigate = useNavigate();
    return(
        <Container>
            <div className="categorySelector">
                <FaBars 
                    size={30} 
                    color="#ffffff"
                    onClick={() => setOpenMenu(!openMenu)}
                />
                <h2>{category}</h2>
            </div>
            <FaShoppingCart 
                size={30} 
                color="#ffffff" 
                onClick={() => navigate("/cart")}
            />
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