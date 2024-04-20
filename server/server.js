//modules
import { config } from 'dotenv';
config();
import { create } from 'ipfs-http-client';
import fs from 'fs';
import bodyParser from 'body-parser';
import Express, { json } from 'express';
import cors from 'cors';
import {verifyJWT} from "./middlewares/verifyJWT.js";
import cookieParser from "cookie-parser";
const app = Express();

const corsOptions = {
    origin : "http://localhost:5173",
}

//middlewares
app.use(json());
app.use(cors(corsOptions));
app.use(cookieParser());

//port
const PORT = process.env.PORT || 8080; 

const ipfsClient = create({
    host: "localhost",
    port: 5001,
    protocol: 'http',
});

const addFileToIPFS = async (file) => {
    try {
        const result = await ipfsClient.add(file);
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error uploading file to IPFS:', error);
        throw error;
    }
};

const getFile = async (hash) => {
    try {
        const chunks = [];
        for await (const chunk of ipfsClient.cat(hash)) {
            chunks.push(chunk);
        }
        return Buffer.concat(chunks);
    } catch (error) {
        console.error('Error fetching file from IPFS:', error);
        throw error;
    }
};

app.post("/review", async (req, res) => {
    try {
        const data = await getFile(req.body.item); // Using req.query.cid instead of req.body.cid to retrieve the query parameter
        console.log(JSON.parse(data));
        return res.json(JSON.parse(data));
    } catch (error) { // Added the error parameter to the catch block
        console.error(error); // Log the error for debugging purposes
        return res.status(500).send("Internal Server Error"); // Sending an error response with status code 500 and a message
    }
});

app.post("/status", async (req, res) => {
    try {
        const data = await getFile(req.body.item); // Using req.query.cid instead of req.body.cid to retrieve the query parameter
        console.log(JSON.parse(data));
        return res.json(JSON.parse(data));
    } catch (error) { // Added the error parameter to the catch block
        console.error(error); // Log the error for debugging purposes
        return res.status(500).send("Internal Server Error"); // Sending an error response with status code 500 and a message
    }
});

app.post("/commit",async (req,res)=>{
    try {
        const produceData = {
            log_id: req.body.log,
            produce_id: req.body.pID,
            produce_name: req.body.pName,
            temperature: req.body.temp,
            humidity: req.body.humid,
            oxygen: req.body.ox,
            carbon: req.body.co,
            ethyl: req.body.ethy,
        }
        const result = await addFileToIPFS(JSON.stringify(produceData));
        res.status(200).json({ message: 'success!!', cid: result.path });
    } catch (error) {
        return res.status(500).json("failed!");
    }
})

app.get('/Dashboard-logistics', verifyJWT, (req,res) => {
    console.log("success!");
    return res.json({"message":"success"});
});

app.listen(PORT, () => {
    console.log("Listening on port 8080");
})

