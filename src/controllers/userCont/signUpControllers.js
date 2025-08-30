const {StatusCodes} = require('http-status-codes')
const bcrypt = require("bcryptjs");
const { User } = require('../../models');

const createUser = async (req, res) => {
    try {
        const { username, phone, full_name, email, password,address } = req.body;

        // Basic validation
        if (!username || !phone || !full_name || !email || !password || !address.zip || !address.house || !address.lane || !address.state) {
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'All fields are required.' });
        }

        // Check if author already exists
        const existingUserbyMail = await User.findOne({ email });
        if (existingUserbyMail) {
            return res.status(StatusCodes.CONFLICT).json({ success: false, message: 'User already exists with this email.' });
        }

        const existingUserbyPhone = await User.findOne({ phone });
        if (existingUserbyPhone) {
            return res.status(StatusCodes.CONFLICT).json({ success: false, message: 'User already exists with this phone.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new author
        const newUser = new User({
            username,
            full_name,
            phone,
            email,
            password: hashedPassword,
            address:{
                house : address.house,
                lane : address.lane,
                zip : address.zip,
                state : address.state
            }
        });

        await newUser.save();

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'User created successfully.',
            author: {
                id: newUser._id,
                username: newUser.username,
                full_name: newUser.full_name,
                phone: newUser.phone,
                email: newUser.email,
                address: newUser.address
            }
        });

     } catch (error) {
        console.error("Error creating User:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
};

module.exports = createUser;