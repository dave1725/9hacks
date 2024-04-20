import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";

export default function Login(){
    const navigate = useNavigate();
    return (
        <>
        <Navbar />
            <div className="login-front">
                <div className="choose-role">
                    <h1>Who are you?</h1>
                    <button onClick={()=>navigate('/login-logistics')}>Logistics</button>
                    <button onClick={()=>navigate('/status')}>Consumer</button>
                </div>
            </div>
        </>
    );
}