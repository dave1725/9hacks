import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import Express from 'express';
import cors from 'cors';
import { validateLogistics, validateRetailer, refreshToken_logistics } from "./controllers/moduleControls.js";

const app = Express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}

// Middleware
app.use(Express.json());
app.use(cors(corsOptions));

app.post('/login-logistics', validateLogistics);

app.post('/token', refreshToken_logistics);

app.listen(5000, () => console.log("authServer instance running on port 5000"));
