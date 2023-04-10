const commentModel = require("../models/comments.Model")


module.exports.comment = async (recipe)=>{
    try {
        return await commentModel.create(recipe)
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

module.exports.deleteComment = async (commentId)=>{
    try {
        
        return await commentModel.findOneAndUpdate({_id:commentId},{$set:{isDeleted:true}})
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}