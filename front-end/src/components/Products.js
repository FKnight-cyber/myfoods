import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "./Product";
import axios from "axios";
import { useEffect,useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import Swal from "sweetalert2";

export default function Products({category,openMenu}){

    const { token,setToken } = useContext(UserContext);
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    function formatPrice(price){
        return (price).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          });
    }

    useEffect(() => {
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/products?category=${category}`,{
            headers:{'x-access-token': `${token}` }
        });

        promise.then(res => {
            setProducts(res.data);
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
                    if(Error.response.status === 401){
                        localStorage.setItem("authToken", "")
                        setToken("");
                        navigate("/");
                    }
                }
            })
        });
    },[category]);

    return(
        <Container openMenu={openMenu}>
            <Swiper>
                {
                products.map((product,index) => 
                    <SwiperSlide key={index}>
                        <Product 
                            image={product.imageURL} 
                            name={product.name}
                            price={formatPrice(product.price)}
                            description={product.description}
                            category={category} 
                        />
                    </SwiperSlide>
                )}
            </Swiper>
        </Container>
    )
}

const Container = styled.div`
    display: ${props => props.openMenu ? "none" : "value"};
    width: 94%;
    height: 346px;
    background-color: #ffffff;
    margin-top: 40px;
    border-radius: 6px;
`