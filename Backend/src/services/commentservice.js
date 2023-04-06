const commentModel = require("../models/comments.Model")


module.exports.comment = function(recipe){
    try {
        return commentModel.create(recipe)
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}