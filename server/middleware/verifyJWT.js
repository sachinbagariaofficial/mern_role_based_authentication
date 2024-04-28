const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; 
  
    if (!authHeader || !token) {
      return res.status(401).json({
        message: "Unauthorized",
        status: false,
      });
    }
  
    try {
      const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
     
  
      if (decoded.exp < (Date.now() / 1000)) {
        return res.status(403).json({
          message: 'Forbidden: Your token has expired. Please log in again.',
          status: false,
        });
      }
  
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ message: "Forbidden: Your token has expired or it's worng. Please log in again." });
    }
  };
  
module.exports = verifyJWT;
