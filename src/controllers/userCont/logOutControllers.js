const {StatusCodes} = require('http-status-codes')
const logOut = (req, res) => {
    res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None"
    });

    res.status(StatusCodes.OK).json({ 
        success: true,
        message: "Logged out successfully"
     });
};

module.exports = logOut
