import "../Styles/footer.css"
import { useAuth } from "./Authentication/AuthProvider";

function Footer(){
    const { user, logout } = useAuth();
    console.log(user);
    function handleLogout(){
        logout();
    }
    return (
        <div className="FooterArea">
        {
            localStorage.getItem("email") == "" || localStorage.getItem("email") == null ? 
            <div className="SimpleFooter">
                <div>
                    <p>Lviv Polytechnic National University</p>
                </div>
            </div>
            :
            <div className="Footer">
            <div>
                <p>Lviv Polytechnic National University</p>
            </div>
            <div>
                <p onClick={handleLogout}>Logout</p>
            </div>
            <div>
            <p>{localStorage.getItem("email")}</p>

            </div>
        </div>
        }
        </div>
        
        
    );
}

export default Footer;