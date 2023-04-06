const recipeModel = require("../models/RecipeModel")


module.exports.createRecipe = function(recipe){
    try {
        return recipeModel.create(recipe)
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}
