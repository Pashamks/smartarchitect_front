import React, { useState } from "react";
import { useAuth } from "../Authentication/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import "C:\\Users\\pavlo\\Desktop\\4.1\\Diploma\\front\\smartarchitect\\src\\Styles\\login.css"
import User from "C:\\Users\\pavlo\\Desktop\\4.1\\Diploma\\front\\smartarchitect\\src\\Images\\user.png"
import View from "C:\\Users\\pavlo\\Desktop\\4.1\\Diploma\\front\\smartarchitect\\src\\Images\\view.png"
import Hidden from "C:\\Users\\pavlo\\Desktop\\4.1\\Diploma\\front\\smartarchitect\\src\\Images\\hidden.png"


function Login(){
    const [user, setUser] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = () => {
        login(user);
    };

    function handleEmailEnter(){
        var input = document.getElementById("emailInput");
        
    }

    const [emailValue, setValue] = useState('Email');
    const [passwordValue, setPasswordValue] = useState('Password');

    const defaultText = 'Введіть текст...';
  
    const handleChange = (event) => {
      setValue(event.target.value);

    };
  
    const handleEmailFocus = () => {
        if(emailValue == "Email")
            setValue('');
    };
  
    const handleEmailBlur = () => {
        if(emailValue == "")
            setValue("Email");
        
    };

    const handlePasswordFocus = () => {
        if(passwordValue == "Password")
        setPasswordValue('');
    }

    const handlePasswordBlur = () => {
        if(passwordValue == "")
        setPasswordValue("Password");
        
    };

    function imageChange(){

    }

    return (
        <div className="LoginArea">
            <div className="WelcomeText">Welcome back</div>
            <form className="Form">
                <div className="EmailBox">
                    <img className="UserImage" src={User}></img>
                    <input 
                        value={emailValue}
                        onChange={handleChange}
                        onFocus={handleEmailFocus}
                        onBlur={handleEmailBlur} type="email"  id="emailInput" className="EmailInput" ></input>
                </div>
                <div className="PasswordBox">
                    <img id="PasswordIcon" onClick={imageChange} className="UserImage" src={View}></img>
                    <input  value={passwordValue}
                        onChange={handleChange}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur} className="PasswordInput" ></input>  
                </div>
                <div>
                    <button className="LoginButton">Login</button>
                </div>
            </form>
            
            <div className="NoAccountArea">
                Don't have an account? 
                <a>Sign up!</a>
            </div>
        </div>
    );
}

export default Login;