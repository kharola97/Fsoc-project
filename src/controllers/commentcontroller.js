const mongoose = require("mongoose")
const {createComment,deleteComment,recipeComment,findComment,updateComment,removeOneComment,findByCommentId} = require("../services/commentservice")
const {isValidRating} = require("../utils/helper/validator")
const userModel = require("../models/Usermodel")

module.exports.comment = async function(req,res){
     
  try {
    let userId = req.params.userId
    let recipeId = req.params.recipeId
    let data = req.body
   if(Object.keys(data).length==0) return res.status(400).send({ status: false, message: "Please add a comment" });
    if(!mongoose.Types.ObjectId.isValid(userId)){
      return res.status(400).send({ status: false, message: "Invalid  ID" });
    }
    let alreadyComment = await findComment(userId,recipeId)
    if(alreadyComment){
      let updatedComm = [...alreadyComment.comment,data.comment]
      let result = await  updateComment(alreadyComment._id,updatedComm)
      return res.status(201).send({status:true,data:result})
    }
   
    if(!mongoose.Types.ObjectId.isValid(recipeId)){
      return res.status(400).send({ status: false, message: "Invalid recipe ID" });
    }
    

    if(!data.comment){
      return res.status(400).send({ status: false, message: "Please add a comment" });

    }
    
  let finalComment =  await createComment(data);
      
      return res.status(201).send({ status: true, message: "Success", data: finalComment });
    } catch (error) {
      
      return res.status(500).send({status:false,message:error.message})

    }

}


module.exports.getComment = async(req,res)=>{
  try {
    
    let recipeId = req.params.recipeId
    
    if(!mongoose.Types.ObjectId.isValid(recipeId)){
      return res.status(400).send({status:false,message:"Recipeid is invalid"})
    }
    let comments = await recipeComment(recipeId)
    
    
    if(comments){
      
      return res.status(200).send({status:true,data:comments})
    }
    else{
      return res.status(400).send({message:"No comments found for the recipe"})
    }
  } catch (error) {
    return res.status(500).send({status:false,message:error.message})

  }
    
  }
  
  module.exports.deleteComment= async (req,res)=>{
    try {
        let data = req.body
        
      let recipeId = req.params.recipeId
      let userId = req.params.userId
      let commentId = req.params.commentId
     
      if(req.userId !=userId) return res.status(403).send({status:false,message:"You are not authorized to delete the comment"})
      if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).send({ status: false, message: "Invalid  ID" });
      }
      if(!mongoose.Types.ObjectId.isValid(recipeId)){
        return res.status(400).send({ status: false, message: "Invalid recipe ID" });
      }
      let commentFound = await findByCommentId(commentId)
      
      if(commentFound.userId != userId) return res.status(403).send({status:false,message:"You are not authorized to delete the comment"})

      if(commentFound.comment.length > 1){
        let newComments = commentFound.comment.filter((x)=>x!=data.text)
        
        let removeComment = await removeOneComment(commentId,newComments)
        return res.status(200).send({status:true,message:"Comment deleted"})
      }

      let commentDeleted =  await deleteComment(commentId)
      return res.status(200).send({status:true,message:"Comment deleted succesfully"})
    } catch (error) {
      return res.status(500).send({status:false,message:error.message})

    }
}