import styled from "styled-components";
import { FaMinusCircle,FaPlusCircle,FaCartPlus } from "react-icons/fa";
import { useState } from "react";

export default function Product({image,name,price,description,category,id}){
    const [quantity, setQuantity] = useState(0);
    const [selected, setSelected] = useState(false);

    function formatPrice(price){
        return (price/100).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          });
    }

    function addToCart(quantity,productId,userId){
        return;
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