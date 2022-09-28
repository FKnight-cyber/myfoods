import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../themes/globalStyles";
import UserContext from "../context/UserContext";
import { useState } from "react";
import InitialPage from "../pages/InitialPage";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register";

export default function App(){
    const [token,setToken] = useState(localStorage.getItem('authToken'));

    const userContext = {
        token,
        setToken
    }

    return(
        <BrowserRouter>
            <GlobalStyle />
            <UserContext.Provider value={userContext}>
                <Routes>
                    <Route path="/initialpage" element={<InitialPage />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/sign-up" element={<Register />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}