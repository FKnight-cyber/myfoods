import { useContext, useState } from "react";
import styled from "styled-components";
import Categories from "./components/Categories";
import { FaSortDown, FaSortUp, FaSignOutAlt, FaInfoCircle } from "react-icons/fa";
import Products from "./components/Products";
import DeliveryDistricts from "./components/DeliveryArea";
import PizzaEdges from "./components/PizzaEdges";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ControlPage(){
    const [selectCategory, setSelectCategory] = useState(false);
    const [selectProduct, setSelectProduct] = useState(false);
    const [selectDistrict, setSelectDistrict] = useState(false);
    const [selectEdge, setSelectEdge] = useState(false);

    const { setToken } = useContext(UserContext);
    const navigate = useNavigate();

    function signOut(){
        localStorage.setItem('authToken', '');
        setToken('');
        navigate('/');
    }

    return(
        <Container>
            <div className="section">
            <div className="panel" onClick={() => setSelectCategory(!selectCategory)}>
                <h1>Categorias</h1>
                {
                    selectCategory ? 
                        <FaSortUp
                            size={30}
                            color="#ffffff"
                        />
                    :
                        <FaSortDown
                            size={30}
                            color="#ffffff"
                        />
                }    
            </div>
            <Categories 
                selectCategory={selectCategory}
            />
            <div className="panel" onClick={() => setSelectProduct(!selectProduct)}>
                <h1>Produtos</h1>
                {
                    selectProduct ? 
                        <FaSortUp
                            size={30}
                            color="#ffffff"
                        />
                    :
                        <FaSortDown
                            size={30}
                            color="#ffffff"
                        />
                }   
            </div>
            <Products 
                selectProduct={selectProduct}
            />
             <div className="panel" onClick={() => setSelectEdge(!selectEdge)}>
                <h1>Bordas</h1>
                {
                    selectEdge ? 
                        <FaSortUp
                            size={30}
                            color="#ffffff"
                        />
                    :
                        <FaSortDown
                            size={30}
                            color="#ffffff"
                        />
                }   
            </div>
            <PizzaEdges
                selectEdge={selectEdge}
            />
            <div className="panel" onClick={() => setSelectDistrict(!selectDistrict)}>
                <h1>Regiões/Bairros</h1>
                {
                    selectDistrict ? 
                        <FaSortUp
                            size={30}
                            color="#ffffff"
                        />
                    :
                        <FaSortDown
                            size={30}
                            color="#ffffff"
                        />
                }   
            </div>
            <DeliveryDistricts
                selectDistrict={selectDistrict}
            />
            </div>
            <FaSignOutAlt 
                className="iconOut"
                color="crimson"
                size={40}
                onClick={signOut}
            />
            <FaInfoCircle
                className="iconInfo"
                color="crimson"
                size={40}
                onClick={() => navigate('/purchase/info')}
            />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #211A22;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;

    .section{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        overflow-y: scroll;
        width: 100%;
        margin-top: 60px;
    }

    .iconOut,.iconInfo{
        &:hover{
            cursor: pointer;
        }
    }

    .iconOut{
        position: absolute;
        left: 18px;
        top: 18px;
    }

    .iconInfo{
        position: absolute;
        right: 18px;
        top: 18px;
    }

    .panel{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        height: 10vh;
        margin-top: 20px;
        margin-bottom: 20px;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 12px;

        background-color: crimson;
        color: #ffffff;

        font-size: 20px;
        font-style: italic;
        font-weight: 700;
        
        &:hover{
            cursor: pointer;
        }
    }
`