import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext";
import Swal from "sweetalert2";
import Product from "../../../components/Product";

export default function Products({selectProduct}){
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [products, setProducts] = useState([]);
    const [callUseEffect, setCallUseEffect] = useState(0);

    const { token } = useContext(UserContext);
    
    /*useEffect(() => {

        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`,{
            headers:{'x-access-token': `${token}`}
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
                    return;
                }
            })
        });

    },[callUseEffect]); */

    function renderProducts(products){
        return products.map((product,index) => 
            <Product 
                key={index} 
                image={product.image} 
                name={product.name}
                price={product.name}
                description={product.description}
                id={product.id}
            />
        )
    };

    function createProduct(event){
        event.preventDefault();
    };

    return(
        <Container selected={selectProduct}>
            <CreateField onSubmit={createProduct}>
                <input type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    required 
                />
                <input type="text"
                    placeholder="Categoria do produto"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    required  
                />
                <input type="text"
                    placeholder="Nome do produto"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required  
                />
                <input type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required  
                />
                <input type="number"
                    placeholder="Quantidade"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    required  
                />
                <input type="number"
                    placeholder="Valor"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required 
                />
                <button type="submit">Create</button>
            </CreateField>
            
        </Container>
    )
};

const Container = styled.div`
    display: ${props => props.selected ? "flex" : "none"};
    align-items: center;
    flex-direction: column;
    width: 80%;
    height: 500px;
    background-color: crimson;
    overflow-y: scroll;
`

const CreateField = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 98%;
    height: 260px;
    background-color: #ffffff;
    overflow-y: scroll;
    padding: 12px;
    border-radius: 10px;
    border: solid 2px black;
    margin-top: 4px;
    margin-bottom: 20px;

    img{
        width: 100%;
        height: 140px;
        margin-bottom: 12px;
    }

    input{
        border: solid 1px black;
        height: 30px;
        width: 90%;
        padding-left: 4px;
        margin-bottom: 8px;
    }

    button{
        width: 60%;
        height: 30px;
        background-color: green;
        color: #ffffff;
        font-size: 20px;
        font-style: italic;
        font-weight: 700;
    }
`