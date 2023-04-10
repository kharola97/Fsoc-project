const mongoose = require("mongoose")
const {comment,deleteComment} = require("../services/commentservice")

module.exports.comment = async function(req,res){
    let data = req.body
    const{comment,userId,recipeId} = data
    if(Object.keys(data).length==0) return res.status(400).send({ status: false, message: "Mandatory fields missing again" });
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).send({ status: false, message: "Invalid  ID" });
      }
      if(!mongoose.Types.ObjectId.isValid(recipeId)){
        return res.status(400).send({ status: false, message: "Invalid recipe ID" });
      }
      if(!comment){
        return res.status(400).send({ status: false, message: "Please add a comment" });

      }
      let finalComment =  await comment(data);
      return res.status(201).send({ status: true, message: "Success", data: finalComment });

}


module.exports.deleteComment= async (req,res)=>{
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
}