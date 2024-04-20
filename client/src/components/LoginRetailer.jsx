import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginRetailer() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = document.getElementsByName("text")[0].value;
        const passwd = document.getElementsByName("password")[0].value;

        axios.post("http://localhost:8080/login-retailer",{id,passwd})
        .then((res) => {
            if(res === "success"){
                console.log("Logged in as retailer!");
                navigate("/Dashboard-retailer");
            }
            else{
                console.log("Login failed for retailer!");
            }
        }).catch((err) => console.log(err));
    }

    return (
        <>
        <Navbar />
        <div className="container">
            <div className="center">
                <h1>Welcome!</h1>
                <form onSubmit={handleSubmit} method="POST">
                    <div className="txt_field">
                        <input name="text" type="number" required></input>
                        <span></span>
                        <label>E-ID</label>
                    </div>
                    <div className="txt_field">
                        <input name="password" type="password" required></input>
                        <span></span>
                        <label>Password</label>
                    </div>
                    <input name="submit" type="submit" value="Login"></input>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    );
}

