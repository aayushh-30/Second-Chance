module.exports = {
    loginUser : require("./userCont/loginControllers.js"),
    signUpUser : require("./userCont/signUpControllers.js"),
    logOutUser : require("./userCont/logOutControllers.js"),
    updateProfile : require("./userCont/updateUserProfileControllers.js"),
    deactivateUser : require("./userCont/deactivateUserControllers.js"),
    Items : require("./itemCont/ItemControllers.js"),
    Comment : require("./itemCont/commentControllers.js"),
}