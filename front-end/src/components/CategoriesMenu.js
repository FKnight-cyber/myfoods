import styled from "styled-components";
import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import Swal from "sweetalert2";
import { LoadCategories } from "../components/Loaders/initialPageLoaders";

export default function CategoriesMenu({openMenu,setCategory,setOpenMenu,categoria}){
    const [categories, setCategories] = useState([]);

    const { token, setToken } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(1)
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/categories`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setCategories(res.data);
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

    },[]);

    function RenderCategories(categories){
        return categories.map((category, index) => 
            <Category
                selectedCategory={categoria} 
                currentCategory={category.name}
                key={index} 
                onClick={() => {
                    setCategory(category.name);
                    setOpenMenu(!openMenu);
                }}
            >
                <h1 className="icon">{category.name}</h1>
            </Category>
        )
    };

    return(
        <Container openMenu={openMenu}>
            {
                categories ? RenderCategories(categories) : <LoadCategories />
            }
        </Container>
    )
}

const Container = styled.div`
    display: ${props => props.openMenu ? "value" : "none"};
    width: 100%;
    height: 40vh;
    overflow-y: scroll;
    border-top: solid 1px #000000;
    background-color: #E34625;
`

const Category = styled.div`
    padding: 12px;
    color: ${props => props.currentCategory === props.selectedCategory ? "#FBD737" : "#ffffff"};
    font-style: italic;
    font-weight: 700;
    font-size: 20px;
`