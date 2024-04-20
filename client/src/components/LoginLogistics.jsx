import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LoginLogistics() {

    const [ id, setID ] = useState('');
    const [ passwd, setPasswd ] = useState('');
    const [ errMsg, setErrMsg ] = useState('');

    useEffect(() => {
        localStorage.setItem("logID",id);
        setErrMsg('');
    }, [id]);

    const navigate = useNavigate();

    const HandleSubmit = (event) => {
        event.preventDefault();
    
        axios.post(
            "http://localhost:5000/login-logistics",
            {id,passwd},
            {
                headers : { 'Content-Type' : 'application/json '},
                withCredentials : true,
            }
        )
        .then((res) => {
            console.log(res.data.accessToken);
            if(res.data.message === "success"){
                localStorage.setItem("accessToken",res.data.accessToken);
                console.log(localStorage.getItem("accessToken"));
                console.log("login successfull!!");
                navigate("/Dashboard-logistics");
            }
            if(res.data === "failed"){
                console.log("login failed");
            }
        }).catch((err) => console.log(err));
    }

    return (
        <>
        <Navbar />
        <div className="container">
            <div className="center">
                <h1>Welcome!</h1>
                <form action="" method="POST">
                    <input type="hidden" name="username" aria-hidden="true" tabIndex="-1" />
                    <div className="txt_field">
                        <input name="text" type="number" onChange={(e) => setID(e.target.value)} required></input>
                        <span></span>
                        <label>E-ID</label>
                    </div>
                    <div className="txt_field">
                        <input name="password" autoComplete="new-password" type="password" onChange={(e) => setPasswd(e.target.value)} required></input>
                        <span></span>
                        <label>Password</label>
                    </div>
                    <input name="submit" type="submit" value="Login" onClick={HandleSubmit}></input>
                    
                </form>
            </div>
        </div>
        <Footer />
        </>
    );
}

