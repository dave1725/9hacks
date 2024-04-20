import { useState } from "react";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import axios from "axios";
import { useContract, useContractWrite, useContractRead, useAddress } from '@thirdweb-dev/react';

const Review = () => {
    
    const { contract,isLoading } = useContract("0x770794292d7A2CBC02302eF0a7725424cF3F39B5");
    const address = useAddress();
    const [ pID, setpID] = useState();
    const [msg, setMsg] = useState([]);

    const fetchData = async () => {
        if (!isLoading) {
          const data = await contract.call("retrieveCID", [pID]);
          const fetchedReviews = await Promise.all(data.map(async (item) => {
            const response = await axios.post("http://localhost:8080/review", { item });
            return response.data;
          }));
          setMsg(fetchedReviews);
        } else {
          alert("Contract Loading! Please try again!");
        }
      };
      

    return (
        <>
            <Navbar />
            <div className="dashboardlog-container">
                <SidePanel />
                <div className="dashboardlog-content">
                    <div className="dashboardlog-welcome-outer">
                        <div className="dashboardlog-welcome-inner">
                            <h1>ENTER PRODUCE ID</h1>
                            <input className="placeholder" onChange={(e)=>setpID(e.target.value)}></input>
                            <button className="submitbutton" onClick={fetchData}>SUBMIT</button>
                        </div>
                    </div>
                </div>
                <div className='dashboardlog-welcome'>
                {msg.length > 0 && (
                    <div className='dashboardlog-inner'>
                        
                        {msg.map((review, index) => (
                        <div className="data-container" key={index}>
                            <p>Logger-ID : {review.log_id}</p>  {/* Use parse function */}
                            <p>Produce-ID: {review.produce_id}</p>  {/* Access properties */}
                            <p>Produce-Name: {review.produce_name}</p>
                            <p>Temperature: {review.temperature}</p>
                            <p>Humidity: {review.humidity}</p>
                            <p>O2 Levels: {review.oxygen}</p>
                            <p>CO2 Levels: {review.carbon}</p>
                            <p>Ethyl Levels: {review.ethyl}</p>
                      </div>
                        ))}
                        
                    </div>
                )}
                <div className="no">{!msg.length && <p>NO UPLOADs!</p>}</div>
                </div>
            </div>
        </>
    );
}

export default Review;
