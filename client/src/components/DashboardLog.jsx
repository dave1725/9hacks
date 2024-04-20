import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const DashboardLog = () => {
    const navigate = useNavigate();

    const id = localStorage.getItem("logID");

    axios.get("http://localhost:8080/Dashboard-logistics",{
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`,
        }
    })
    .then((res)=>{
        if(res.data.message === "expired"){
            alert("session expired please login again!");
            navigate('/');
        }
    })
    .catch(err => {
        console.log(err);
    })

    return (
        <>
            <Navbar />
            <div className="dashboardlog-container">
                <SidePanel />
                <div className="dashboardlog-content">
                    <div className="dashboardlog-welcome-outer">
                        <div className="dashboardlog-welcome-inner">
                            <h1>WELCOME, L{id}!</h1><hr></hr>
                            <p>Check Review for product status</p>
                            <p>Check Revoke to revoke the supply-chain</p>
                            <p>Check Commit to commit changes</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardLog;
