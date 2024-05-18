import { useRef } from "react"
import {
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import "../Styles/main.css"
import Home from "./Home/Home";
import Detector from "./Detector/Detector";
import Constructor from "./Constructor/Constructor";
import Gallery from "./Gallery/Gallery";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { useAuth } from "./Authentication/AuthProvider";
import { useNavigate } from "react-router-dom";

  function Navbar(){
    const navRef = useRef();
    const { user } = useAuth();

    const navigate = useNavigate();

    function regirect(to){
        return function () { navigate(to) }
    }

    return(
        <header>
            <nav ref={navRef}>
                <a onClick={regirect("/home")}>
                    HOME
                </a>
                <a onClick={regirect("/detect")}>
                    STYLE DETECTION
                </a>
                <a onClick={regirect("/constructor")}>
                    FACADE CONSTRUCTOR
                </a>
                <a onClick={regirect("/gallery")}>
                    GALLERY
                </a>
            </nav>  
            <div>
                { localStorage.getItem("accessToken") != "" && localStorage.getItem("accessToken") != null ?
                <Routes>
                <Route path="/home" element={<Home></Home>}></Route>
                <Route path="/detect" element={<Detector></Detector>}></Route>
                <Route path="/constructor" element={<Constructor></Constructor>}></Route>
                <Route path="/gallery" element={<Gallery></Gallery>}></Route>
                <Route path="*" element={<Navigate replace to="/home" ></Navigate>}></Route>
                </Routes>
                :
                <Routes>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/register" element={<Register></Register>}></Route>
                    <Route path="*" element={<Navigate replace to="/login" ></Navigate>}></Route>
                </Routes>
                }
            </div>
        </header>
    );
}
export default Navbar;