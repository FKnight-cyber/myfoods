import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext";
import Swal from "sweetalert2";
import { formatPrice } from "../../../utils/utilityFunctions";
import { FaMinusCircle, FaEdit } from "react-icons/fa";

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
    
    useEffect(() => {

        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/all`,{
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

    },[callUseEffect]); 

    function renderProducts(products){
        return products.map((product,index) =>
            <Product key={index}>
                <img src={product.imageURL} alt="" srcset="" />
                <div className="info">
                    <h1>{product.name}</h1>
                    <h3>{product.description}</h3>
                    <h2>Quantidade: {product.quantity}</h2>
                    <h1>Preço: {formatPrice(product.price)}</h1>
                </div>
                <FaMinusCircle
                    size={30}
                    color="crimson"
                    onClick={() => deleteProduct(product.id)}
                />
                <FaEdit
                    size={30}
                    color="#7ED321" 
                />
            </Product>
        )
    };

    function createProduct(event){
        event.preventDefault();

        const body = {
            name,
            category,
            image,
            description,
            price: Number(price),
            quantity: Number(quantity)
        }

        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/products/create`,body,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setName('');
            setCategory('');
            setImage('');
            setDescription('');
            setPrice('');
            setQuantity('');
            setCallUseEffect(callUseEffect + 1);

            let timerInterval
            Swal.fire({
                icon: 'success',
                html: `Produto adicionado!`,
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
    };

    function deleteProduct(id){
        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/products/delete/${id}`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setCallUseEffect(callUseEffect + 1);

            let timerInterval
            Swal.fire({
                icon: 'success',
                html: `Produto deletado!`,
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
            <section>
                {
                    products.length > 0 ? renderProducts(products) : ''
                }
            </section> 
        </Container>
    )
};

const Container = styled.div`
    display: ${props => props.selected ? "flex" : "none"};
    align-items: center;
    flex-direction: column;
    width: 80%;
    height: 70vh;
    overflow-y: scroll !important;
    background-color: crimson;
    
    section{
        width: 96%;
        height: 340px;
        background-color: crimson;
    }
`

const CreateField = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 98%;
    background-color: #ffffff;
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

const Product = styled.div`
    width: 98%;
    height: 320px;
    margin-bottom: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    border: solid 2px black;
    position: relative;

    img{
        width: 100%;
        height: 50%;
        object-fit: cover;
    }

    .info{
        padding: 8px;

        h1{
            font-size: 18px;
            font-style: italic;
            font-weight: 700;
        }

        h1,h2{
            margin-bottom: 8px;
        }

        h3{
            margin-bottom: 12px;
        }

        h3 {
            word-break: break-all;
            overflow-y: scroll;
            height: 60px;
            border: solid 1px black;
        }
    }

    > * {
        &:nth-last-child(2){
            position: absolute;
            right: 60px;
            bottom: 8px;
        }
        &:last-child{
            position: absolute;
            right: 10px;
            bottom: 10px;
        }
    }
`