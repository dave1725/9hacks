import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config(); // Load environment variables from .env file

const verifyJWT = (req, res, next) => {
    const accessToken = req.headers.authorization.split(' ')[1];
    console.log(accessToken);
    if (!accessToken) {
        return res.sendStatus(401); // Unauthorized access
    }

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => {
            if (err) {
                console.log("Token expired");
                return res.json({ "message": "expired" }); // Forbidden access / Token expired
            }
            req.id = user.id;
            next();
        }
    );
};

export {verifyJWT};
