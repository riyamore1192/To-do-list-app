
import jwt from 'jsonwebtoken';
const JWT_SECRET = "MoreRiya";

// const verifytoken = (req,res,next) => { 
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]; // removes "Bearer"

//     if (!token) {
//         return res.status(401).json({ error: 'Access denied. No token provided.' });
//     }

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.user = decoded; // add user info to request
//         next(); // proceed to actual route
//     } catch (err) {
//         return res.status(403).json({ error: 'Invalid token' });
//     }
// }

// export default verifytoken;

const verifytoken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).send("No token provided");

  const token = authHeader.split(" ")[1]; // split "Bearer TOKEN"

  if (!token) return res.status(403).send("Token missing");

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Invalid token");

    req.user = decoded; // so you can use req.user.id etc.
    console.log("✅ Token verified, user:", decoded);

    next();
  }
  )
};

export default verifytoken;
