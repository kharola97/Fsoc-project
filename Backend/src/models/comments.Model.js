const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId

const commentSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: "user"
      },
      recipeId: {
        type: ObjectId,
        required: true,
        ref: "recipe"
      },
      comment:{
        type:String,
        trim :true
      },
      isDeleted:{
        type:Boolean,
        default:false

      }
      
},{timestamps:true})

module.exports = mongoose.model("comment", commentSchema);   