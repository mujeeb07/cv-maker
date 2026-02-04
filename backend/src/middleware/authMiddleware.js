const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("AuthHeader:", authHeader);
    
    if(!authHeader) {
        return res.status(401).json({message: "No token provided"});
    }
    
    const token = authHeader.split(" ")[1];
    console.log("Token:", token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Error:", error);
        res.status(401).json({message: "Invaliid token"})
    }
}