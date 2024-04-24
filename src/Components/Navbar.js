import { useRef } from "react"
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import "../Styles/main.css"
import Home from "./Home/Home";
import Detector from "./Detector/Detector";


  function Navbar(){
    const navRef = useRef();

    const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav");
    }
    return(
        <BrowserRouter> 
        <header>
            <nav ref={navRef}>
                <a href="/home">
                    HOME
                </a>
                <a href="/detect">
                    STYLE DETECTION
                </a>
                <a href="/colors">
                    FACADE CONSTRUCTOR
                </a>
                <a href="/move">
                    GALLERY
                </a>
            </nav>  
            <div>
                <Routes>
                    <Route path="" element={<Home></Home>}></Route>
                    <Route path="/home" element={<Home></Home>}></Route>
                    <Route path="/detect" element={<Detector></Detector>}></Route>
                </Routes>
            </div>
        </header>
        </BrowserRouter>
    );
}
export default Navbar;