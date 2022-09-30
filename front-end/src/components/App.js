import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../themes/globalStyles";
import UserContext from "../context/UserContext";
import { useState } from "react";
import InitialPage from "../pages/InitialPage";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register";
import UserPage from "../pages/UserPage";
import MyCart from "../pages/MyCart";

export default function App(){
    const [token,setToken] = useState(localStorage.getItem('authToken'));
    const [name, setName] = useState('');
    const [CEP, setCEP] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [road, setRoad] = useState('');
    const [number, setNumber] = useState('');

    const userContext = {
        token,
        setToken,
        name,
        setName,
        CEP,
        setCEP,
        city,
        setCity,
        district,
        setDistrict,
        road,
        setRoad,
        number,
        setNumber
    }

    return(
        <BrowserRouter>
            <GlobalStyle />
            <UserContext.Provider value={userContext}>
                <Routes>
                    <Route path="/initialpage" element={<InitialPage />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/sign-up" element={<Register />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/cart" element={<MyCart />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}