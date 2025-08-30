const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid email."
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(StatusCodes.EXPECTATION_FAILED).json({
                success: false,
                message: "Invalid password."
            });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, full_name: user.full_name, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret', // Use env variable in production
            { expiresIn: '1h' }
        );

        // Optionally set cookie
        res.cookie('_id',user._id)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 hour
        });

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                username : user.username,
                full_name: user.full_name,
                email: user.email,
                address: user.address,
                phone: user.phone,
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Server error."
        });
    }
};

module.exports = loginUser;