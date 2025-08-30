const express = require("express")
const { Items,Comment } = require("../../controllers")
const { UserAuth } = require('../../middlewares')

const Router = express.Router()

Router.post("/addItem",UserAuth.verifyToken,Items.addItem);
Router.post("/addComment",UserAuth.verifyToken,Comment.makeComment);

Router.put("/updateItem",UserAuth.verifyToken,Items.updateItem);
Router.put("/updateComment",UserAuth.verifyToken,Comment.updateComment);

Router.get("/getAll",Items.getItems);
Router.get("/getItem/:id",Items.getItemsById);
Router.get("/getItemOfAUser",UserAuth.verifyToken,Items.getItemsOf_A_User);

Router.delete("/delete/:item_id",UserAuth.verifyToken,Items.deleteItem);
Router.delete("/deleteComment",UserAuth.verifyToken,Comment.deleteComment);


module.exports = Router