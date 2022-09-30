import styled from "styled-components";
import { FaMinusCircle,FaPlusCircle,FaCartPlus } from "react-icons/fa";
import { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UserContext from "../context/UserContext";
import { formatPrice } from "../utils/utilityFunctions";

export default function Product({image,name,price,description,category,id}){
    const [quantity, setQuantity] = useState(0);
    const [selected, setSelected] = useState(false);

    const { token } = useContext(UserContext);

    function addToCart(quantity,productId){

        const body = {
            quantity,
            productId
        };

        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/cart/add`,body,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(()=>{
            console.log("added!");
            setSelected(false);
            setQuantity(0);
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
    }

    return(
        <Container>
            <img src={image} alt={category} srcset="" />
            <h1>{name}</h1>
            <h1>
                {
                    quantity <= 1 ? formatPrice(price) : formatPrice(price * Number(quantity))
                }
            </h1>
            <h3>{description}</h3>
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
                    onClick={()=>addToCart(quantity,id)}
                 />
            </div>  
        </Container> 
    )
}

const Container = styled.div`
    h1{
        font-weight: 700;
        font-size: 20px;
        margin-top: 6px;
        margin-left: 6px;
    }

    h3{
        margin-top: 6px;
        margin-left: 6px;
        height: 30px;
        overflow-y: scroll;
    }

    .buttons,.order{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .buttons{
        padding-right: 10px;
    }

    .order{
        width: 80px;
        margin-top: 6px;
        margin-left: 6px;
    }

    input{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        padding-left: 8px;
        border: none;
    }
`