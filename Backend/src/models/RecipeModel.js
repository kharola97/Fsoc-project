const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;


const recipeSchema = new mongoose.Schema({

    dishname : {
        type: String,
        required : true,
        trim : true
    },
    description: {
        type: String,
        required: true
      },
    ingredients:{
        type: [String],
        required: true
      },
      instructions: {
        type: [String],
        required: true
      },
      rating: {
        type: Number,
        default: 0
      },
     
    userId: {
        type: ObjectId,
        required: true,
        ref: "user"
      },
      
    cookingtime :{
        type: Number,
        required:true,
        trim:true},
    isDeleted:{
          type:Boolean,
          default:false
        }
},{ timestamps: true })

module.exports = mongoose.model("recipe", recipeSchema);   