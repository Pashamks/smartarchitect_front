import { useRef } from "react"
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import "../Styles/main.css"
import Home from "./Home/Home";
import Detector from "./Detector/Detector";
import Constructor from "./Constructor/Constructor";
import Gallery from "./Gallery/Gallery";
import Login from "./Login/Login";

  function Navbar(){
    const navRef = useRef();

    const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav");
    }
    return(
        <header>
            <nav ref={navRef}>
                <a href="/home">
                    HOME
                </a>
                <a href="/detect">
                    STYLE DETECTION
                </a>
                <a href="/constructor">
                    FACADE CONSTRUCTOR
                </a>
                <a href="/gallery">
                    GALLERY
                </a>
            </nav>  
            <div>
                <Routes>
                    <Route path="" element={<Home></Home>}></Route>
                    <Route path="/home" element={<Home></Home>}></Route>
                    <Route path="/detect" element={<Detector></Detector>}></Route>
                    <Route path="/constructor" element={<Constructor></Constructor>}></Route>
                    <Route path="/gallery" element={<Login></Login>}></Route>
                </Routes>
            </div>
        </header>
    );
}
export default Navbar;