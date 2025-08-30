const express = require("express")
const {signUpUser,loginUser,logOutUser,updateProfile, deactivateUser} = require("../../controllers")
const { UserAuth } = require('../../middlewares')

const Router = express.Router()

Router.post("/signup",signUpUser);
Router.post("/login",loginUser);
Router.post("/logout",logOutUser);
Router.put("/changePassword",UserAuth.verifyToken,updateProfile.updateProfilePassword);
Router.put("/changeAddress",UserAuth.verifyToken,updateProfile.updateProfileAddress);
Router.delete("/deactivateAccount",UserAuth.verifyToken,deactivateUser);

module.exports = Router