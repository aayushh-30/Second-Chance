const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const { User } = require('../../models');

const updateProfilePassword = async (req, res) => {
    try {
        const { password, password2 } = req.body;

        if (!password || !password2) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "All fields are required",
                data: [],
                error: [],
            });
        }

        if (password !== password2) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Passwords do not match",
                data: [],
                error: [],
            });
        }
        // console.log(req.token)
        const id = req.decoded_info.id;
        console.log(id)

        if (!id) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized access",
                data: [],
                error: [],
            });
        }

        // Find the user
        const user = await User.findById(id);

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "User not found",
                data: [],
                error: [],
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        // Respond with success
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Password updated successfully",
            data: [],
            error: [],
        });

    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong",
            data: [],
            error: [error.message],
        });
    }
};

const updateProfileAddress = async (req, res) => {
    try {
        const { house, lane, zip, state } = req.body;

        if (!house || !lane || !zip || !state) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "All fields are required",
                data: [],
                error: [],
            });
        }

        const id = req.decoded_info.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "User not found",
                data: [],
                error: [],
            });
        }

        user.address.zip = zip;
        user.address.lane = lane;
        user.address.house = house;
        user.address.state = state;

        await user.save();

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Address updated successfully",
            data: user.address,
            error: [],
        });

    } catch (error) {
        console.error("Error updating address:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while updating address",
            data: [],
            error: error.message || error,
        });
    }
};

module.exports = { updateProfilePassword,updateProfileAddress };
