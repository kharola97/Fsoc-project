const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId

const commentSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "user"
      },
      recipeId: {
        type: ObjectId,
        ref: "recipe"
      },
      comment:{
        type:[String],
        trim :true,
      required:true
      },
      isDeleted:{
        type:Boolean,
        default:false

      }
      
},{timestamps:true})

module.exports = mongoose.model("comment", commentSchema);   