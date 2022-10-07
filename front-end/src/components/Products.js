import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { useEffect,useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Products({category,openMenu,setLoadFood}){

    const { token,setToken } = useContext(UserContext);
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/products?category=${category}`,{
            headers:{'x-access-token': `${token}` }
        });

        promise.then(res => {
            setProducts(res.data);
            setLoadFood(false);
        });

        promise.catch(Error => {
            setLoadFood(false);
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
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                delay: 30000,
                disableOnInteraction: true,
                }}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {
                products.map((product,index) => 
                    <SwiperSlide key={index}>
                        <Product 
                            image={product.imageURL} 
                            name={product.name}
                            price={product.price}
                            description={product.description}
                            category={category}
                            id={product.id} 
                        />
                    </SwiperSlide>
                )}
            </Swiper>
            <Swiper
                slidesPerView={3}
                centeredSlides={true}
                spaceBetween={180}
                grabCursor={true}
                pagination={{
                clickable: true,
                }}
                modules={[Pagination]}
            >
                {
                    products.map((product,index) => 
                        <SwiperSlide key={index}>
                            <Product 
                                image={product.imageURL} 
                                name={product.name}
                                price={product.price}
                                description={product.description}
                                category={category}
                                id={product.id} 
                            />
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </Container>
    )
}

const Container = styled.div`
    display: ${props => props.openMenu ? "none" : "value"};
    width: 94%;
    height: 54vh;
    background-color: #ffffff;
    margin-top: 20px;
    border-radius: 6px;

    > * {
        &:last-child{
            display: none;
        }
    }

    @media (min-width: 760px){
        width:80%;
        > * {
            &:first-child{
                display: none;
            }

            &:last-child{
                display: flex;
            }
        }
    }
`