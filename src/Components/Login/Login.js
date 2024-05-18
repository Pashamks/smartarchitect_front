import React, { useState } from "react";
import { useAuth } from "../Authentication/AuthProvider";
import { useNavigate } from "react-router-dom";
import "../../Styles/login.css"
import User from "../../Images/user.png"
import View from "../../Images/view.png"
import Hidden from "../../Images/hidden.png"
import ErrorModel from "../ErrorModal"

function Login(){
    const { login } = useAuth();
    const [error, setError] = useState();

    const navigate = useNavigate();

    const errorHandler = () => {
        setError(null)
      }

    const handleLogin = () => {
        
        login({
            email : emailValue,
            password : passwordValue,
            error : {error, setError}
        });
        
    };

    const [emailValue, setValue] = useState('Email');
    const [passwordValue, setPasswordValue] = useState('Password');
    const [isImageChanged, setImageChanged] = useState(false);
  
    const handleEmailChange = (event) => {
      setValue(event.target.value);

    };
    const handlePasswordChange = (event) => {
        setPasswordValue(event.target.value);
  
      };
    const handleEmailFocus = (text) => {
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

    function handleRegister(){
        navigate("/register")
    }

    function imageChange(){
        if(!isImageChanged){
            document.getElementById("PasswordIcon").src = Hidden;
            setImageChanged(true);
            document.getElementById("inputPassword").type = "password"
        }
        else{
            setImageChanged(false);
            document.getElementById("PasswordIcon").src = View;
            document.getElementById("inputPassword").type = "text"
        }
    }

    return (
        <div className="LoginArea">
         {error && <ErrorModel title={error.title} message={error.message} onClose={errorHandler} /> }
            <div className="WelcomeText">Welcome back!</div>
            <div className="EmailBox">
                    <img className="UserImage" src={User}></img>
                    <input 
                        value={emailValue}
                        onChange={handleEmailChange}
                        onFocus={handleEmailFocus}
                        onBlur={handleEmailBlur} type="email"  id="emailInput" className="EmailInput" ></input>
            </div>
                <div className="PasswordBox">
                    <img id="PasswordIcon" onClick={imageChange} className="UserImage" src={View}></img>
                    <input  value={passwordValue}
                        onChange={handlePasswordChange}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur} className="PasswordInput" id="inputPassword" ></input>  
                </div>
                <div className="LoginButtonArea">
                    <button className="LoginButton" onClick={handleLogin}>Login</button>
                </div>
            
            <div className="NoAccountArea">
                Don't have an account? 
                <a onClick={handleRegister} className="SignText"> Sign up!</a>
            </div>
        </div>
    );
}

export default Login;