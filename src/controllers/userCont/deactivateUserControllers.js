const {StatusCodes} = require('http-status-codes');
const {User} = require('../../models')


const deactivateUser = (req,res) => {
    try {
        const {user_id} = req.decoded_info?.id;

        if(!user_id){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Unable to fetch the User id.",
                data: [],
                error: [],
            });
        }

        const user = User.find({$and : [{_id : user_id},{isActive : true}]});
        if(!user){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "User Not Found",
                data: [],
                error: [],
            });
        }

        user.isActive = false;
        user.save();

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Account Deleted",
            data: user,
            error: [],

        })
        
    } catch (error) {
        console.error("Login error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Server error."
        });
        
    }
}

module.exports = deactivateUser