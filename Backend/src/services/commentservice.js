const commentModel = require("../models/commentsModel")


module.exports.createComment = async (recipe)=>{
    try {
        return await commentModel.create(recipe)
    } catch (error) {
        return ({status:false,message:error.message})
    }
}

module.exports.deleteComment = async (commentId)=>{
    try {
        
        return await commentModel.findOneAndUpdate({_id:commentId},{$set:{isDeleted:true}})
    } catch (error) {
        return ({status:false,message:error.message})
    }
}

module.exports.recipeComment =  async (recipeId)=>{
    try {
        
        return await commentModel.findOne({recipeId:recipeId})
    } catch (error) {
        return ({status:false,message:error.message})
    }
}

module.exports.findComment = async (userId,recipeId)=>{
    try {
          return await commentModel.findOne({userId:userId,recipeId:recipeId})
    } catch (error) {
        return ({status:false,message:error.message})
    }
}

//      let result = await commentModel.findOneAndUpdate({_id:findComm.id},{comment:newComments},{new:true})

module.exports.updateComment = async (Id,comments)=>{
    try {
          return await commentModel.findOneAndUpdate({_id:Id},{comment:comments},{new:true})
    } catch (error) {
        
    }
}