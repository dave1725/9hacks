import { useState } from "react";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import axios from "axios";
import { Web3 } from 'web3';
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContract, useAddress, useContractWrite } from "@thirdweb-dev/react";
//0xcafe5e7052F041f6205F26637F5736563c9fbc03

const web3 = new Web3(window.ethereum);

const Commit = () => {
    const { contract } = useContract("0x770794292d7A2CBC02302eF0a7725424cF3F39B5");
    const { mutateAsync : addToBlockchain, isLoading } = useContractWrite(contract,'addToBlockchain');
    const sender = useAddress();

    const [ pID, setpID] = useState();
    const [pName, setpName ] = useState();
    const [temp, setTemp] = useState();
    const [humid,setHumid] = useState();
    const [ox,setOx] = useState();
    const [co,setCo] = useState();
    const [ethy,setEthy] = useState();
    const log = localStorage.getItem("logID");

    const upload = async ( event ) =>{
        var count = 0;
        if(temp>4){
            alert("Abnormal Temperature Detected");
            count++;
        }
        if(humid>95 && humid<90){
            alert("Abnormal humid detected");
            count++;
        }
        if(ox<1.5 && ox>3){
            alert("Abnormal oxygen levels detected!");
            count++;
        }
        if(co<1 && ox>3){
            alert("abnormal co2 levels detected!");
            count++;
        }
        if(ethy>0.2){
            alert("abnormal ethyl levels detected");
            count++;
        }
        if(count>2){
            return alert("more than two anomalies detected please revoke or repair!");
        }

        event.preventDefault();
        const balance = await web3.eth.getBalance(sender);

        if(balance === 0n){
          return alert("Your Wallet has no funds!");
        }

        axios.post("http://localhost:8080/commit", {log,pID,pName,temp,humid,ox,co,ethy})
        .then(async (res) => {
            console.log(log);
            const data = await addToBlockchain({ args: [pID,res.data.cid] });
            alert("Data comitted!");
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <>
            <Navbar />
            <div className="dashboardlog-container">
                <SidePanel />
                <div className="dashboardlog-content">
                    <div className="dashboardlog-welcome-outer">
                        <div className="cmmit">
                            <ConnectWallet />
                            <h1>Enter Produce Data</h1>
                            <label>Produce ID&nbsp;&nbsp;</label>
                            <input className="input-box" onChange={(e)=>setpID(e.target.value)} required></input><br></br>
                            <label>Produce Name&nbsp;</label>
                            <input className="input-box" onChange={(e)=>setpName(e.target.value)} required></input><br></br>
                            <label>Temperature</label>
                            <input className="input-box"onChange={(e)=>setTemp(e.target.value)} required></input><br></br>
                            <label>Humidity</label>
                            <input className="input-box"onChange={(e)=>setHumid(e.target.value)} required></input><br></br>
                            <label>O2 Levels&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input className="input-box" onChange={(e)=>setOx(e.target.value)} required></input><br></br>
                            <label>CO2 Levels&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input className="input-box" onChange={(e)=>setCo(e.target.value)} required></input><br></br>
                            <label>Ethylene Levels&nbsp;&nbsp;</label>
                            <input className="input-box" onChange={(e)=>setEthy(e.target.value)} required></input><br></br>
                            <button className="commit-btn" onClick={upload}>SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Commit;
