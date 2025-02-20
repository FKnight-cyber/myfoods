import styled from "styled-components";
import { FaMinusCircle,FaPlusCircle,FaCartPlus } from "react-icons/fa";
import { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UserContext from "../context/UserContext";
import { formatPrice } from "../utils/utilityFunctions";
import { BuyFood } from "./Loaders/productLoaders";
import Checkbox from "./Checkbox";

export default function Product({image,name,price,description,category,id}){
    const [quantity, setQuantity] = useState(0);
    const [edgeValue, setEdgeValue] = useState(0);
    const [edgeId, setEdgeId] = useState(0);
    const [selected, setSelected] = useState(false);
    const [loadBuyFood, setLoadBuyFood] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const { token, productsInCart ,setProductsInCart } = useContext(UserContext);

    function addToCart(quantity,productId){
        setLoadBuyFood(true);
        
        const body = {
            quantity,
            productId,
            edgeId
        };

        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/cart/add`,body,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setSelected(false);
            setLoadBuyFood(false);
            setProductsInCart(productsInCart + 1);
            setQuantity(0);
            let timerInterval
            Swal.fire({
                icon: 'success',
                html: "Adicionado ao carrinho!",
                timer: 1500,
                timerProgressBar: false,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
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

        promise.catch(Error => {
            setLoadBuyFood(false);
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
        <Container>
            <img src={image} alt={category} srcset="" />
            <div className="info">
                <h1>{name}</h1>
                {
                    isChecked ?
                    <label className="unmark">
                        <input 
                            type="checkbox"
                            onChange={() => {
                                setEdgeValue(0);
                                setEdgeId(0);
                                setIsChecked(false);
                            }
                            }
                        />
                        <span>Sem borda</span>
                    </label>
                    :
                    ''
                    
                }
                {
                    category === 'Pizzas' ? 
                    <Checkbox 
                        setEdgeValue={setEdgeValue} 
                        setEdgeId={setEdgeId} 
                        id={id}
                        isChecked={isChecked}
                        setIsChecked={setIsChecked} 
                    /> : ''
                }
                <h3>{description}</h3>
                <h1>
                    {
                        quantity <= 1 ? formatPrice(price + edgeValue) : formatPrice((price + edgeValue) * Number(quantity))
                    }
                </h1>
                {
                    loadBuyFood ? 
                    <BuyFood />
                    :
                    <>
                    <div className="buttons">
                        <div className="order">
                            <FaMinusCircle 
                            size={24} 
                            color="#E45727"
                            onClick={()=>{
                                const control = quantity - 1;
                                if(control === 0){
                                    setSelected(false);
                                }
                                if(quantity > 0){
                                    setQuantity(control);
                                    if(quantity === 0){
                                        setSelected(false);
                                    }
                                }
                            }}
                            />
                            <input type="number"
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
                            />
                            <FaPlusCircle 
                            size={24} 
                            color="#65B362"
                            onClick={()=>{
                                const control = quantity +1;
                                if(control > 0){
                                    if(!selected){
                                        setSelected(true);
                                    }
                                }
                                setQuantity(control)
                                if(quantity > 0){
                                    setSelected(true);
                                }
                            }}
                            />
                        </div>
                        <FaCartPlus 
                            size={30} 
                            color="#7ED321"
                            display={selected ? "flex" : "none"}
                            onClick={()=>{
                                addToCart(quantity,id)
                            }}
                            className="icon" 
                        />
                    </div>
                    </>
                }
            </div>  
        </Container> 
    )
}

const Container = styled.div`
    width: 314px;
    height: 100%;
    padding-bottom: 2px;
    border: solid 2px gray;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    background-color: #ffffff;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .info{
        position: relative;
    }

    .unmark{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0;
        top: 4px;
    }
    
    img{
        width: 100%;
        height: 26vh !important;
    }

    h1{
        font-weight: 700;
        font-size: 3vh;
        margin-top: 2px;
        margin-bottom: 4px;
        margin-left: 6px;
    }

    h3{
        margin-top: 4px;
        margin-left: 6px;
        height: 6vh;
        word-break: break-all;
        overflow-y: scroll;
        padding: 4px;
    }

    .buttons,.order{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .buttons{
        width: 100% !important;
        padding-right: 10px;
        margin-top: 10px !important;
    }

    .order{
        width: 100px; 
        margin-top: 6px;
        margin-left: 6px;

        > * {
            &:first-child,&:last-child{
                &:hover{
                    cursor: pointer;
                }
            }
        }
    }

    input{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 24px;
        padding-left: 8px;
        border: none;
    }

    @media (min-width: 760px){
        width: 320px;
    }
`