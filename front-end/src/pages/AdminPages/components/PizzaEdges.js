import { Container } from "./Categories";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserContext from "../../../context/UserContext";
import { FaEdit, FaRegMinusSquare } from "react-icons/fa";
import { formatPrice } from "../../../utils/utilityFunctions";

export default function PizzaEdges({selectEdge}){
    const [edges, setEdges] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [callUseEffect, setCallUseEffect] = useState(0);

    const { token } = useContext(UserContext);

    useEffect(() => {
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/edges`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setEdges(res.data);
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

    function createEdge(event){
        event.preventDefault();

        const body = {
            name,
            price
        };

        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/edges/create`,body,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setName('');
            setPrice('');
            setCallUseEffect(callUseEffect + 1);

            let timerInterval
            Swal.fire({
                icon: 'success',
                html: `Borda adicionada`,
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

    function editEdge(price, name, id){
        const body = {
            price,
            name
        };

        const promise = axios.patch(`${process.env.REACT_APP_API_BASE_URL}/edges/${id}`,body,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setName('');
            setPrice('');
            setCallUseEffect(callUseEffect + 1);

            let timerInterval
            Swal.fire({
                icon: 'success',
                html: `Borda alterada!`,
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

    function deleteEdge(id){
        const promise = axios.delete(`${process.env.REACT_APP_API_BASE_URL}/edges/delete/${id}`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setCallUseEffect(callUseEffect + 1);

            let timerInterval
            Swal.fire({
                icon: 'success',
                html: `Categoria deletada!`,
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
    
    function renderEdges(edges){
        return edges.map((edge,index) => 
            <div className="category" key={index}>
                <div className="categoryName">
                    <div className="edgeInfo">
                        <h1>{edge.name}</h1>
                        <h1>{formatPrice(edge.price)}</h1>
                    </div>
                    <input type="text"
                        placeholder="Nome da borda"
                        onChange={e => {
                            edge.name = e.target.value
                       }}
                        onKeyDown={e => {
                            if(e.key === 'Enter'){
                                editEdge(edge.price, edge.name, edge.id);
                            }
                         }}
                        required 
                    />
                    <input type="number"
                        placeholder="Preço da borda"
                        onChange={e => {
                            edge.price = e.target.value
                       }}
                        onKeyDown={e => {
                            if(e.key === 'Enter'){
                                editEdge(edge.price, edge.name, edge.id);
                            }
                         }}
                        required 
                    />
                </div>   
                <div className="buttons">
                    <FaEdit 
                        size={24}
                        onClick={() => editEdge(edge.price, edge.name, edge.id)}
                        className="icon" 
                    />
                    <FaRegMinusSquare 
                        size={24}
                        className="icon"
                        onClick={() => deleteEdge(edge.id)}  
                    />
                </div>
            </div>
            )
    }

    return(
        <Container selected={selectEdge}>
            <form onSubmit={createEdge}>
                <input 
                    type="text"
                    placeholder="Nome da borda"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input 
                    type="number"
                    placeholder="Preço da borda"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <button className="icon" type="submit" onClick={createEdge}>
                    +
                </button>
            </form>
            {
                edges.length > 0 ? renderEdges(edges) : ""
            }
        </Container>
    )
}