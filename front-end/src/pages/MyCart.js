import styled from "styled-components";
import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { formatPrice } from "../utils/utilityFunctions";
import UserContext from "../context/UserContext";
import Swal from "sweetalert2";
import { FaOutdent, FaUserAlt, FaGrinWink, FaCartArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SendMessages from "../components/sendMessage/SendMessage";
import { CartFood,RemoveFood,CleanCart } from "../components/Loaders/productLoaders";

export default function MyCart(){
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState(false);
    const [total, setTotal] = useState(0);
    const [loadRemoveFood, setLoadRemoveFood] = useState({});
    const [loadCleanCart, setLoadCleanCart] = useState(false);

    const { 
        token,
        name,
        email,
        CEP,
        district,
        road,
        number,
        productsInCart,
        setProductsInCart 
    } = useContext(UserContext);

    const myRequest = {
        name,
        email,
        CEP,
        district,
        road,
        number,
        total,
        products
    }

    const navigate = useNavigate();

    useEffect(() => {

        if(!name){
            navigate("/initialpage");
        }

        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/cart/list`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            console.log(res.data[0])
            setTotal(formatPrice(res.data[1]));
            const hashtable = {};
            for(let i = 0; i < res.data.length; i++){
                hashtable[res.data[i].id] = false;
            }
            setLoadRemoveFood(hashtable);
            setProducts(res.data[0]);
            setProductsInCart(res.data[0].length);
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
        const hashtable = {...loadRemoveFood};
        hashtable[id] = true;
        setLoadRemoveFood({...hashtable});
        const promise = 
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cart/remove?product=${productId}&item=${id}&quantity=${quantity}`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            hashtable[id] = false;
            setLoadRemoveFood({...hashtable});
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
            hashtable[id] = false;
            setLoadRemoveFood({...hashtable});
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
                {
                    loadRemoveFood[product.id] ? <RemoveFood />
                    :
                    <>
                        <img src={product.products.imageURL} alt="" srcset="" />
                        <div className="productInfo">
                            <h1>{product.products.name}</h1>
                            <h2>{formatPrice(product.products.price)}</h2>
                            <h2>Quantidade: {product.quantity}</h2>
                            <h1>Valor total: {formatPrice(product.products.price * product.quantity)}
                            </h1>
                        </div>
                        <div className="remove" onClick={() => removeFromCart(product.productId,product.id,product.quantity)}>
                            <h4>Retirar do carrinho</h4>
                        </div>
                    </>
                }
            </Product>
        );
    };

    function cleanCart(){
        setLoadCleanCart(true);
        const promise = 
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cart/cancel`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setLoadCleanCart(false);
            setProductsInCart(0);
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
            setLoadCleanCart(false);
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
        <Container products={products}>
            {
                order ?
                <SendMessages messageData={myRequest} />
                :
                <>
                    <FaOutdent
                        color="#ffffff"
                        size={30}
                        onClick={() => navigate("/initialpage")}
                        className="icon return"   
                    />
                    {
                        loadCleanCart ? <CleanCart />
                        :
                        <>
                            <Products product={productsInCart}>
                                {
                                    products.length > 0 ? renderProduct(products) 
                                    :
                                    <>
                                        <CartFood />
                                        <h1 className="empty">Seu carrinho está vazio!</h1>
                                    </> 
                                    
                                }
                                <div className="cleanCart">
                                    <FaCartArrowDown
                                        size={30}
                                        color="#ffffff"
                                        onClick={cleanCart}
                                    />
                                </div>
                            </Products>
                        </>
                    }
                    <FaUserAlt
                        color="#ffffff"
                        size={30}
                        onClick={() => navigate("/user")}
                        className="icon"  
                    />
                    <div className="buy" onClick={() => setOrder(true)}>
                        <h5>Finalizar Pedido</h5>
                        <FaGrinWink size={30} />
                    </div>
                    
                </>
            }
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #211A22;
    padding: 8px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .empty{
        text-align: center;
        font-size: 20px;
        font-weight: 700;
    }

    .icon{
        &:hover{
            cursor: pointer;
        }
    }

    .return{
        position: absolute;
        top: 14px;
        left: 14px;
    }

    > * {
        &:nth-child(3) {
            position: absolute;
            top: 14px;
            right: 14px;
        }
    }

    .buy{
        display: ${props => props.products.length > 0 ? "flex" : "none"};
        justify-content: center;
        align-items: center;
        background-color: #7ED321;
        margin-top: 20px;
        width: 300px;
        height: 40px;
        color: #ffffff;
        border-radius: 12px;

        h5{
            margin-right: 20px;
            font-size: 20px;
            font-style: italic;
            font-weight: 700;
        }

        &:hover{
            cursor: pointer;
        }
    }
`

const Products = styled.div`
    width: 100%;
    max-width: 600px;
    height: 80vh;
    background-color: #ffffff;
    margin-top: 60px;
    overflow-y: scroll;
    padding: 8px;
    position: relative;

    .cleanCart{
        display: ${props => props.product > 0 ? "flex" : "none"};
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        position: sticky;
        background-color: crimson;
        bottom: 6px;
        left: 90%;

        &:hover{
            cursor: pointer;
        }
    }
`

const Product = styled.div`
    height: 140px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    position: relative;

    .productInfo{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 166px;
        padding: 6px;

        h1{
            width: 100%;
            height: 30px;
            display: block;
            font-size: 16px;
            font-style: italic;
            font-weight: 700;
            overflow-y: scroll;
            margin-bottom: 8px;
        }

        h2{
            display: block;
            font-size: 14px;
            font-style: italic;
            font-weight: 200;
            text-overflow:hidden;
            white-space: nowrap;
            overflow: hidden;
            margin-bottom: 8px;
        }
    }

    img{
        width: 50%;
        height: 100%;
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

            &:hover{
                cursor: pointer;
            }
        }
    }

    @media (min-width: 760px) {
        height: 30vh;
        justify-content: start;
        
        .productInfo{
            width: 50%;
            padding: 30px;
        }
    }
`