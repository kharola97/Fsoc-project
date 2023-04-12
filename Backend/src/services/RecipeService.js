const recipeModel = require("../models/RecipeModel")


module.exports.createRecipe = async (recipe)=>{

    try {
        return await recipeModel.create(recipe)
    } catch (error) {
        return ({status:false,message:error.message})
    }
}

module.exports.getAllRecipe = async ()=>{
    try {
        
        return await recipeModel.find({isDeleted:false})
    } catch (error) {
        return ({status:false,message:error.message})
    }
}

module.exports.deleteRecipe = async (recipeId)=>{
    try {
        
        return await recipeModel.findOneAndUpdate({_id:recipeId},{$set:{isDeleted:true}})
    } catch (error) {
        return ({status:false,message:error.message})
    }
}

module.exports.getFilteredRecipe = async (filter)=>{
    try {
        
        return await recipeModel.find({...filter,isDeleted:false})
    } catch (error) {
        return ({status:false,message:error.message})

    }
}

module.exports.updateRecipe = async(userId,data) =>{
    try {
        
        return await recipeModel.findOneAndUpdate({userId:userId},{...data},{new:true})
    } catch (error) {
        return ({status:false,message:error.message})
    }
}


module.exports.getAllRecipeByUser = async(userId)=>{
    try {
         return await recipeModel.find({userId:userId})
    } catch (error) {
        return ({status:false,message:error.message})

    }
}
