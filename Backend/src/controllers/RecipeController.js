const {
  isValidString,
  isValidName,
  isValidRating,
  isValidData,
  isValidTime,
} = require("../utils/helper/validator");
const mongoose = require("mongoose");
const {createRecipe,getAllRecipe,deleteRecipe,getFilteredRecipe,updateRecipe,getAllRecipeByUser,getRecipeById} = require("../services/RecipeService");
const RecipeModel = require("../models/RecipeModel");

module.exports.createRecipe = async function (req, res) {
  try {
    let data = req.body;
    const userId = req.params.userId;
    data.userId = userId;
    console.log(data)
   const {dishname,cookingtime,ingredients,description,instructions,rating, } = data;
    if (Object.keys(data).length == 0) {return res.status(400).send({ status: false, message: "Mandatory fields missing again" });}
     data.dishname = dishname.trim()
    if (!isValidName(data.dishname))return res.status(400).send({ status: false, message: "Dish name shoulb be a string type" });
    if (Array.isArray(ingredients)) {
      for (let i = 0; i < ingredients.length; i++) {
        if (!isValidString(ingredients[i])) {return res.status(400).send({status: false,message: "Ingredients should be a string type",});
        }
      }
    }
    if (Array.isArray(instructions)) {
      for (let i = 0; i < instructions.length; i++) {
        if (!isValidData(instructions[i])) {
          return res.status(400).send({status: false,message: "instructions should be a string type",});
        }
      }
    } else if (!isValidData(instructions))
      return res.status(400).send({status: false,message: "instructions should be a string type",});

    if (!isValidTime(cookingtime))
      return res.status(400).send({status: false,message: "cookingtime shoulb be a number in minutes",});
    if (!isValidData(description))
      return res.status(400).send({status: false,message: "description shoulb be a string type",});

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ status: false, message: "Invalid  ID" });
    }

    if (!isValidRating(rating.trim()))
      return res.status(400).send({ status: false, message: "Rating can only be from 0-5" });

    let finalRecipe = await createRecipe(data);
    return res.status(201).send({ status: true, message: "Success", data: finalRecipe });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//dishname,description,ingredients,instructions,rating,cookingtime

module.exports.getRecipe = async function (req, res) {
  try {
    let data = req.query;
    let userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res
        .status(400)
        .send({ status: false, message: "user is not valid" });
    if (Object.keys(data).length == 0) {
      let Recipe = await getAllRecipe();

      return res.status(200).send({ status: true, data: Recipe });
    }
    let filter = {};

    if (data.dishname) {
      filter.dishname = data.dishname;
    }
    if (data.ingredients) {
      filter.ingredients = data.ingredients;
    }
    if (data.rating) {
      filter.rating = data.rating;
    }

    if (data.cookingtime) {
      filter.cookingtime = { $lte: data.cookingtime };
    }

    let result = await getFilteredRecipe(filter);

    if (!result) {
      return res.status(400).send({status: false,message: "No products found with filters that have been applied",});
    } else {
      return res.status(200).send({ status: true, message: "successfull", data: result });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.deleteRecipe = async (req, res) => {
  try {
    let recipeId = req.params.recipeId;
    console.log(recipeId)
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).send({ status: false, message: "Invalid recipe ID" });
    }
     
    let deletedTheRecipe = await deleteRecipe(recipeId);
    res.status(200).send({ status: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.updateRecipe = async (req, res) => {
  try {
    let userId = req.params.userId;
    let recipeId = req.params.recipeId;
    let data = req.body;
    
    let updatedData = {};
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ status: false, message: "Invalid recipe ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).send({ status: false, message: "Invalid recipe ID" });
    }
    let recipeToUpdate = await RecipeModel.findById(recipeId);
    if (!recipeToUpdate)
      return res.status(400).send({ status: false, message: "No recipe found" });
      
       
     if(recipeToUpdate.userId.toString() !==userId) return res.status(400).send({status:false,message:"You cannot update this recipe"})

    const {dishname,cookingtime,ingredients,description,instructions,rating,isPublic} = data;
    if (Object.keys(data).length == 0) {return res.status(400).send({ status: false, message: "Enter the fields to Update" });
    }
    if (dishname) {
      if (!isValidName(dishname))
        return res.status(400).send({status: false,message: "Dish name shoulb be a string type",});
      updatedData.dishname = dishname;
    }

    if (ingredients) {
      
      if (!isValidString(ingredients)) {
        return res.status(400).send({status: false,message: "Ingredients should be a string type",});
      }
      let newIngredients = [...recipeToUpdate.ingredients, ingredients];
      updatedData.ingredients = newIngredients;
     
    }

    if (instructions) {
      if (!isValidData(instructions)) {
        return res.status(400).send({status: false,message: "instructions should be a string type",});
      }
      let newInstructions = [...recipeToUpdate.instructions, instructions];
      updatedData.instructions = newInstructions;
    }

    if (cookingtime) {
      if (!isValidTime(cookingtime))
        return res.status(400).send({status: false,message: "cookingtime shoulb be a number in minutes",});
      updatedData.cookingtime = cookingtime;
    }
    if (description) {
      if (!isValidData(description))
        return res.status(400).send({status: false,message: "description shoulb be a string type",});
      updatedData.description = description;
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ status: false, message: "Invalid  ID" });
    }

    if (rating) {
      if (!isValidRating(rating))return res.status(400).send({ status: false, message: "Rating can only be from 0-5" });
      updatedData.rating = rating;
    }
    if(typeof(isPublic)=="boolean"){
      updatedData.isPublic = isPublic
    }
    console.log(updatedData.isPublic)
    let updatedRecipe = await updateRecipe(userId, updatedData);
     
    return res.status(201).send({ status: true, message: "Success", data: updatedRecipe });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.getRecipeByUser = async(req,res)=>{
  try {
  let userId = req.params.userId
  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ status: false, message: "Invalid  ID" });
  }
  let userRecipes = await getAllRecipeByUser(userId)
 
  if(!userRecipes) return res.send(400).send({status:false,message:"User has not created recipes yet"})
  return res.status(200).send({status:true,data:userRecipes})
} catch (error) {
  return res.status(500).send({status:false,message:error.message})

}
}



module.exports.recipeById = async(req,res)=>{
  try {
    
     let recipeId = req.params.recipeId
     
     if(!mongoose.Types.ObjectId.isValid(recipeId)) return res.status(400).send({status:false,message:"No recipe found"})

     let recipeFound = await getRecipeById(recipeId)
    
     if(!recipeFound) return res.status(400).send({status:false,message:"No recipe found"})
     return res.status(200).send({status:true,data:recipeFound})
    } catch (error) {
         return res.status(500).send({status:false,message:error.message})
    }
}
