const mongoose = require("mongoose")
const {createComment,deleteComment,recipeComment,findComment,updateComment} = require("../services/commentservice")



module.exports.comment = async function(req,res){
     
  try {
    let userId = req.params.userId
    let recipeId = req.params.recipeId
    let data = req.body
  
    if(Object.keys(data).length==0) return res.status(400).send({ status: false, message: "Please add a comment" });
    if(!mongoose.Types.ObjectId.isValid(userId)){
      return res.status(400).send({ status: false, message: "Invalid  ID" });
    }
    data.userId = userId
    console.log(recipeId,"here")
    if(!mongoose.Types.ObjectId.isValid(recipeId)){
      return res.status(400).send({ status: false, message: "Invalid recipe ID" });
    }
    data.recipeId = recipeId

    if(!data.comment){
      return res.status(400).send({ status: false, message: "Please add a comment" });

    }
    let findComm = await findComment(userId,recipeId)
    if(findComm){
      let newComments = [...findComm.comment,data.comment]
      
     
      let result = await updateComment(findComm.id,newComments)
      return res.status(201).send({status:true,message:"Comment added",data:result})
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
      
      let recipeId = req.params.recipeId
      let userId = req.params.userId
      let commentId = req.params.commentId
      if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).send({ status: false, message: "Invalid  ID" });
      }
      if(!mongoose.Types.ObjectId.isValid(recipeId)){
        return res.status(400).send({ status: false, message: "Invalid recipe ID" });
      }
      let commentDeleted =  await deleteComment(commentId)
      return res.status(200).send({status:true,message:"Comment deleted succesfully"})
    } catch (error) {
      return res.status(500).send({status:false,message:error.message})

    }
}