import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserContext from "../../../context/UserContext";
import { FaEdit, FaRegMinusSquare } from "react-icons/fa";

export default function Categories({selectCategory}){
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [callUseEffect, setCallUseEffect] = useState(0);

    const { token } = useContext(UserContext);

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

    },[callUseEffect]);

    function createCategory(event){
        event.preventDefault();

        const body = {
            name
        };

        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/categories/create`,body,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setName('');
            setCallUseEffect(callUseEffect + 1);

            let timerInterval
            Swal.fire({
                icon: 'success',
                html: `Categoria adicionada`,
                timer: 1000,
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
            });
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
            });
        });
    }

    function renderCategories(categories){
        return categories.map(category => 
            <div className="category">
                <h1>{category.name}</h1>
                <div className="buttons">
                    <FaEdit 
                        size={24} 
                    />
                    <FaRegMinusSquare 
                        size={24} 
                    />
                </div>
            </div>
            )
    }

    return(
        <Container selected={selectCategory}>
            <form onSubmit={createCategory}>
                <input 
                    type="text"
                    placeholder="Nome da categoria"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button type="submit" onClick={createCategory}>
                    +
                </button>
            </form>
            {
                categories.length > 0 ? renderCategories(categories) : ""
            }
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

    form{
        display: flex;
        justify-content: center; 
        align-items: center;
        margin-bottom: 12px;
    }

    input{
        width: 80%;
        height: 26px;
        border: none;
        padding-left: 6px;
    }

    button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border: none;
        background-color: crimson;
        font-size: 30px;
        color:#ffffff;
    }

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