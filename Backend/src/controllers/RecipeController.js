const {isValidString, isValidName,isValidRating, }=  require("../utils/helper/validator")
const mongoose = require("mongoose")
const {createRecipe} =  require("../services/RecipeService")

module.exports.createRecipe = async function(req,res){     
    
      
        
    
    let data = req.body
   
    const {dishname, cookingtime,ingredients,description,userId,commentsId,instructions,rating} = data
    if (Object.keys(data).length == 0|| !dishname || !description || !ingredients || !cookingtime || !userId  || !instructions || !rating) {
        return res
          .status(400)
          .send({ status: false, message: "Mandatory fields missing again" });
      }
      
      if(!isValidName(dishname))  return res.status(400).send({ status: false, message: "Dish name shoulb be a string type" });
      if(Array.isArray(ingredients)){
          for(let i=0;i<ingredients.length;i++){
            if(!isValidString(ingredients[i])){
                return res.status(400).send({ status: false, message: "Ingredients should be a string type" });
            }
          }
      }
      if(Array.isArray(instructions)){
        for(let i=0;i<instructions.length;i++){
          if(!isValidString(instructions[i])){
              return res.status(400).send({ status: false, message: "instructions should be a string type" });
          }
        }
    }

    else if(!isValidString(instructions)) return res.status(400).send({ status: false, message: "instructions should be a string type" });

    
      if(!isValidString(cookingtime))  return res.status(400).send({ status: false, message: "cookintime shoulb be a string type" });
      if(!isValidString(description))  return res.status(400).send({ status: false, message: "description shoulb be a string type" });
        
     
      if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).send({ status: false, message: "Invalid  ID" });
      }
      if(commentsId){
      if(!mongoose.Types.ObjectId.isValid(commentsId)){
        return res.status(400).send({ status: false, message: "Invalid  ID" });
      }
    }
     if(!isValidRating(rating)) return res.status(400).send({ status: false, message: "description " });
     
      let finalRecipe = await createRecipe(data) 
      return res.status(201).send({ status: true, message: "Success", data: finalRecipe });
    } 
  


    module.exports.getRecipe = async function(req,res){
        let data = req.query
        let filter = {}

    }
