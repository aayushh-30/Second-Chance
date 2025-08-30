const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded =  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        req.decoded_info = decoded; 
        console.log(req.decoded_info)
        next();
    } catch (err) {
        return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
    }
};

module.exports = { verifyToken };
