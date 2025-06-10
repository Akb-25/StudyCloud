import jwt from 'jsonwebtoken';

const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        
        if (!token) {
        return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
        return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        req.user = { id: decoded.userId };
        next(); 
    } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default protectRoute;