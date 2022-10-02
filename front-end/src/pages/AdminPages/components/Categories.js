import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserContext from "../../../context/UserContext";
import { FaEdit, FaRegMinusSquare } from "react-icons/fa"

export default function Categories({selected}){
    const [categories, setCategories] = useState([]);

    const { token } = useContext(UserContext);

    useEffect(() => {
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/categories`,{
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

    },[]);

    return(
        <Container selected={selected}>
            <div className="category">
                <h1>Pizzasssssssssssssssssssssssssssssssssssssssssssssssssss</h1>
                <div className="buttons">
                    <FaEdit 
                        size={24} 
                    />
                    <FaRegMinusSquare 
                        size={24} 
                    />
                </div>
            </div>
            <div className="category">
                <h1>Pizzas</h1>
                <div className="buttons">
                    <FaEdit 
                        size={24} 
                    />
                    <FaRegMinusSquare 
                        size={24} 
                    />
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: ${props => props.selected ? "flex" : "none"};
    flex-direction: column;
    padding: 12px;
    width: 80%;
    height: 200px;
    background-color: crimson;
    margin-bottom: 20px;
    overflow-y: scroll;
    color: #ffffff;
    font-size: 20px;
    font-weight: 400;

    h1{
         overflow-x: hidden;
         width: 60%;
    }

    .category,.buttons{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }

    .buttons{
        width: 70px;
    }
`