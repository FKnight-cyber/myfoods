import { Container } from "./Categories";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserContext from "../../../context/UserContext";
import { FaEdit, FaRegMinusSquare } from "react-icons/fa";

export default function DeliveryDistricts({selectDistrict}){
    const [districts, setDistricts] = useState([]);
    const [name, setName] = useState('');
    const [callUseEffect, setCallUseEffect] = useState(0);

    const { token } = useContext(UserContext);

    useEffect(() => {
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/districts`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setDistricts(res.data);
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

    function addDistrict(event){
        event.preventDefault();

        const body = {
            name
        };

        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/districts/add`,body,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setName('');
            setCallUseEffect(callUseEffect + 1);

            let timerInterval
            Swal.fire({
                icon: 'success',
                html: `Nova região adicionada`,
                timer: 1000,
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

    function editDistrict(name,id){
        const body = {
            name
        };

        const promise = axios.patch(`${process.env.REACT_APP_API_BASE_URL}/districts/${id}`,body,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setCallUseEffect(callUseEffect + 1);

            let timerInterval
            Swal.fire({
                icon: 'success',
                html: `Região atualizada!`,
                timer: 1000,
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

    function removeDistrict(id){
        const promise = axios.delete(`${process.env.REACT_APP_API_BASE_URL}/districts/delete/${id}`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setCallUseEffect(callUseEffect + 1);

            let timerInterval
            Swal.fire({
                icon: 'success',
                html: `Região removida!`,
                timer: 1000,
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
    
    function renderDistricts(districts){
        return districts.map((district,index) => 
            <div className="category" key={index}>
                <div className="categoryName">
                    <h1>{district.name}</h1>
                    <input type="text"
                        onChange={e => {
                            district.name = e.target.value
                       }}
                        onKeyDown={e => {
                            if(e.key === 'Enter'){
                                editDistrict(district.name,district.id);
                            }
                         }}
                        required 
                    />
                </div>   
                <div className="buttons">
                    <FaEdit 
                        size={24}
                        onClick={() => editDistrict(district.name,district.id)}
                        className="icon" 
                    />
                    <FaRegMinusSquare 
                        size={24}
                        className="icon"
                        onClick={() => removeDistrict(district.id)}  
                    />
                </div>
            </div>
            )
    }

    return(
        <Container selected={selectDistrict}>
            <form onSubmit={addDistrict}>
                <input 
                    type="text"
                    placeholder="Nome do bairro"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button className="icon" type="submit" onClick={addDistrict}>
                    +
                </button>
            </form>
            {
                districts.length > 0 ? renderDistricts(districts) : ""
            }
        </Container>
    )
}