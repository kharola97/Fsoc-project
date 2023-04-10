const { isValidString, isValidName, isValidRating,isValidData,isValidTime } = require("../utils/helper/validator")
const mongoose = require("mongoose")
const { createRecipe, getAllRecipe, deleteRecipe, getFilteredRecipe } = require("../services/RecipeService")
const RecipeModel = require("../models/RecipeModel")


module.exports.createRecipe = async function (req, res) {
  let data = req.body
   const userId = req.params.userId
   data.userId = userId
  
 
   const { dishname, cookingtime, ingredients, description,  instructions, rating,commentsId } = data
   if (Object.keys(data).length == 0) {
     return res
       .status(400)
       .send({ status: false, message: "Mandatory fields missing again" });
   }
 
   if (!isValidName(dishname)) return res.status(400).send({ status: false, message: "Dish name shoulb be a string type" });
   if (Array.isArray(ingredients)) {
     for (let i = 0; i < ingredients.length; i++) {
       if (!isValidString(ingredients[i])) {
         return res.status(400).send({ status: false, message: "Ingredients should be a string type" });
       }
     }
   }
   if (Array.isArray(instructions)) {
     for (let i = 0; i < instructions.length; i++) {
       if (!isValidData(instructions[i])) {
         return res.status(400).send({ status: false, message: "instructions should be a string type" });
       }
     }
   }
 
   else if (!isValidData(instructions)) return res.status(400).send({ status: false, message: "instructions should be a string type" });
 
 
   if (!isValidTime(cookingtime)) return res.status(400).send({ status: false, message: "cookingtime shoulb be a number in minutes" });
   if (!isValidData(description)) return res.status(400).send({ status: false, message: "description shoulb be a string type" });
 
 
   if (!mongoose.Types.ObjectId.isValid(userId)) {
     return res.status(400).send({ status: false, message: "Invalid  ID" });
   }
   if (commentsId) {
     if (!mongoose.Types.ObjectId.isValid(commentsId)) {
       return res.status(400).send({ status: false, message: "Invalid  ID" });
     }
   }
   if (!isValidRating(rating)) return res.status(400).send({ status: false, message: "Rating can only be from 0-5" });
 
   let finalRecipe = await createRecipe(data)
   return res.status(201).send({ status: true, message: "Success", data: finalRecipe });
 }

//dishname,description,ingredients,instructions,rating,cookingtime

module.exports.getRecipe = async function (req, res) {
  let data = req.query
  if(Object.keys(data).length==0){
     let Recipe = await getAllRecipe()
    
    return res.status(200).send({status:true,data:Recipe})}
  let filter = {}

  
  if(data.dishname){
    filter.dishname = data.dishname
    }
    if(data.ingredients){
      filter.ingredients = data.ingredients
    }
    if(data.rating){
      filter.rating = data.rating
    }
   
    if(data.cookingtime){
      filter.cookingtime = {$lte : data.cookingtime }
    }
    console.log(filter)
    // let ans = await RecipeModel.find({cookingtime:{$lte:data.cookingtime}})
    // console.log(ans,"answer")
   let result = await getFilteredRecipe(filter)
    
   if(!result){
    return res.status(400).send({status:false,message:"No products found with filters that have been applied"})
   }
   else{
    return res.status(200).send({status:true,message:"successfull", data:result})
   }
}


module.exports.deleteRecipe = async(req,res)=>{
    let recipeId = req.params.recipeId
    if(!mongoose.Types.ObjectId.isValid(recipeId)){
      return res.status(400).send({ status: false, message: "Invalid recipe ID" });
    }

    let deletedTheRecipe = await deleteRecipe(recipeId)
    res.status(200).send({status:true,message:"Deleted successfully"})
    
}
