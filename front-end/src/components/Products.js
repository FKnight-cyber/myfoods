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
            if(Error.response.status === 404){
                setLoadFood(false);
                return;
            }
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
        <FlexContainer>
            {
                products.map((product, index) => 
                    <ProductWrapper key={index}>
                        <Product 
                            image={product.imageURL} 
                            name={product.name}
                            price={product.price}
                            description={product.description}
                            category={category}
                            id={product.id} 
                        />
                    </ProductWrapper>
                )
            }
        </FlexContainer>
    </Container>
    )
}

const Container = styled.div`
    display: ${props => props.openMenu ? "none" : "block"};
    width: 94%;
    height: 56vh !important;
    margin-top: 20px;
    border-radius: 6px;
    overflow-y: scroll;

    @media (min-width: 760px){
        width: 98%;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    padding: 12px;
`;

const ProductWrapper = styled.div`/* Adjust this value to control the number of items per row */
    box-sizing: border-box;
`;