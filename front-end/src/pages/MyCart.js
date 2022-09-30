import styled from "styled-components";
import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { formatPrice } from "../utils/utilityFunctions";
import UserContext from "../context/UserContext";
import Swal from "sweetalert2";
import { FaOutdent, FaUserAlt, FaGrinWink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MyCart(){
    const [products, setProducts] = useState([]);
    const [productsInCart, setProductsInCart] = useState(0);

    const { token } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/cart/list`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setProducts(res.data);
            setProductsInCart(res.data.length);
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

    },[productsInCart]);

    function removeFromCart(productId,id,quantity){
        const promise = 
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cart/remove?product=${productId}&item=${id}&quantity=${quantity}`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setProductsInCart(productsInCart - 1);
            let timerInterval
            Swal.fire({
                icon: 'success',
                html: "Removido do carrinho!",
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

    function renderProduct(products){
        return products.map((product,index) =>
            <Product key={index}>
                <img src={product.products.imageURL} alt="" srcset="" />
                <div className="productInfo">
                    <h1>{product.products.name}</h1>
                    <h2>{formatPrice(product.products.price)}</h2>
                    <h2>Quantidade: {product.quantity}</h2>
                    <h1>Valor total: 
                        {formatPrice(product.products.price * product.quantity)}
                    </h1>
                </div>
                <div className="remove" onClick={() => removeFromCart(product.productId,product.id,product.quantity)}>
                    <h4>Retirar do carrinho</h4>
                </div>
            </Product>
        );
    };

    return(
        <Container>
            <FaOutdent
                color="#ffffff"
                size={30}
                onClick={() => navigate("/initialpage")} 
            />
            <Products>
                {
                    products.length > 0 ? renderProduct(products) : ""
                }
            </Products>
            <FaUserAlt
                color="#ffffff"
                size={30}
                onClick={() => navigate("/user")}  
            />
            <div className="buy">
                <h5>Finalizar Pedido</h5>
                <FaGrinWink size={30} />
            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #211A22;
    padding: 8px;
    position: relative;

    > * {
        &:first-child {
            position: absolute;
            top: 14px;
            left: 14px;
        }

        &:nth-child(3) {
            position: absolute;
            top: 14px;
            right: 14px;
        }
    }

    .buy{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #7ED321;
        margin-top: 20px;
        height: 40px;
        color: #ffffff;
        border-radius: 12px;

        h5{
            margin-right: 20px;
            font-size: 20px;
            font-style: italic;
            font-weight: 700;
        }
    }
`

const Products = styled.div`
    width: 100%;
    height: 80vh;
    background-color: #ffffff;
    margin-top: 60px;
    overflow-y: scroll;
    padding: 8px;
`

const Product = styled.div`
    height: 100px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    position: relative;

    .productInfo{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 166px;
        padding: 6px;

        h1{
            display: block;
            font-size: 16px;
            font-style: italic;
            font-weight: 700;
            text-overflow:ellipsis;
            white-space: nowrap;
            overflow: hidden
        }

        h2{
            display: block;
            font-size: 14px;
            font-style: italic;
            font-weight: 200;
            text-overflow:hidden;
            white-space: nowrap;
            overflow: hidden
        }
    }

    img{
        width: 160px;
        height: 100px;
        object-fit: cover;
    }

    > * {
        &:last-child {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            width: 100%;
            height: 26px;
            bottom: -26px;
            background-color: crimson;
            color: #ffffff;
        }
    }
`