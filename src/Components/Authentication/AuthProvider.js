import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
        permissions: [],
        access_token : ""
    });
    useEffect(( ) => {
        if (localStorage.getItem("accessToken") != null){
            setUser({
                access_token: localStorage.getItem("accessToken").value,
                email : localStorage.getItem("email").value
            });
        }      
    }, []);
    
    const login = (user) => {        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();
        urlencoded.append("client_id", "smartarchitect");
        urlencoded.append("client_secret", "secret");
        urlencoded.append("username", user.email);
        urlencoded.append("password", user.password);
        urlencoded.append("grant_type", "password");
        urlencoded.append("scope", "smartarchitect.api");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow"
        };

        fetch("http://localhost:5000/connect/token", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            
            if(result.access_token != null){
                localStorage.setItem("accessToken", result.access_token);
                localStorage.setItem("email", user.email);
                setUser({ email: user, permissions: ["view_extra"], access_token : result.access_token });
            }
            else{
                user.error.setError({
                    message: "Wrong email or password."
                });
            }
            
        })
        .catch((error) => console.error(error));
        
    };
    const logout = () => {
        setUser({ email: "", permissions: [], access_token: "" });
        localStorage.clear();
        navigate("/login");
    };
    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
    return useContext(AuthContext);
};