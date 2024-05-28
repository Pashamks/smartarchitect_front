import "../../Styles/register.css"
import User from "../../Images/user.png"
import View from "../../Images/view.png"
import Hidden from "../../Images/hidden.png"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModel from "../ErrorModal"

function Register(){
    const navigate = useNavigate();

    const [emailValue, setValue] = useState('Email');
    const [passwordValue, setPasswordValue] = useState('Password');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('Confirm Password');
    const [error, setError] = useState();
    const [isImageChanged, setImageChanged] = useState(false);
    const [isImageConfirmChanged, setImageConfirmChanged] = useState(false);

    const errorHandler = () => {
        setError(null)
      }

    const handleEmailChange = (event) => {
      setValue(event.target.value);

    };
    const handlePasswordChange = (event) => {
        setPasswordValue(event.target.value);
  
      };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPasswordValue(event.target.value);
  
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

    const handleConfirmPasswordFocus = () => {
        if(confirmPasswordValue == "Confirm Password")
        setConfirmPasswordValue('');
    }

    const handleConfirmPasswordBlur = () => {
        if(confirmPasswordValue == "")
        setConfirmPasswordValue("Confirm Password");
        
    };

    function handleLogin(){
        navigate("/login")
    }

    function handleRegister(){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "email": document.getElementById("emailInput").value,
        "password": document.getElementById("inputPassword").value,
        "confirmPassword": document.getElementById("inputConfirmPassword").value
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch(process.env.REACT_APP_IDENTITY_URL + "/api/account/signup", requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.text());
            }
            return response.json();
        })
        .then((result) => {
            if(result.id != null && result.id != ""){
                if(error != null){
                    setError(null);
                }

                navigate("/login");
            }
            else{
                setError({
                    title: 'An error occurred!',
                    message: 'Something went wrong'
                  });
            }
        })
        .catch((error) => {
            setError({
                title: 'An error occurred!',
                message: 'User already exist.'
              });
        });
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

    function imageConfirmChange(){
        if(!isImageConfirmChanged){
            document.getElementById("ConfirmPasswordIcon").src = Hidden;
            setImageConfirmChanged(true);
            document.getElementById("inputConfirmPassword").type = "password"
        }
        else{
            setImageConfirmChanged(false);
            document.getElementById("ConfirmPasswordIcon").src = View;
            document.getElementById("inputConfirmPassword").type = "text"
        }
    }
    return (
        <div className="RegisterArea">
             {error && <ErrorModel title={error.title} message={error.message} onClose={errorHandler} /> }
            <div className="SignUpText">Sign up!</div>
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
            <div className="ConfirmPasswordBox">
            <img id="ConfirmPasswordIcon" onClick={imageConfirmChange} className="UserImage" src={View}></img>
                    <input  value={confirmPasswordValue}
                        onChange={handleConfirmPasswordChange}
                        onFocus={handleConfirmPasswordFocus}
                        onBlur={handleConfirmPasswordBlur} className="PasswordInput" id="inputConfirmPassword" ></input>  
            </div>
            <div className="SignButtonArea">
                <button className="RegisterButton" onClick={handleRegister}>Register</button>
            </div>
            <div className="AccountArea">
                Already have an account?
                <a className="LoginText" onClick={handleLogin}> Login!</a>
            </div>
        </div>
    );
}

export default Register;