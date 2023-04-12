const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const {authentication, authorization} = require("../utils/Middlewares/authentication")
const recipeController = require("../controllers/RecipeController")
const commentController = require("../controllers/commentcontroller")


//api for creating a new user
router.post("/register", userController.createUser);
//api for login page
router.post("/login", userController.loginUser);
//api to update the user
router.put("/updateUserDetails/:userId",authentication,authorization, userController.updateUserDetails)
//api to get user details
router.get("/getuserdetails/:userId",authentication,authorization, userController.getUserDetails)
//api to get recipe created by user
router.get("/getRecipeByUser/:userId", recipeController.getRecipeByUser)
//api for user to add recipe
router.post("/recipe/:userId", authentication,authorization, recipeController.createRecipe)
//api for user to get the recipe
router.get("/getrecipe/:userId",  recipeController.getRecipe)
//api to update the recipe
router.put("/updateRecipe/:userId/:recipeId",authentication,authorization, recipeController.updateRecipe)
//api for user to post comment
router.post("/comment/:userId/:recipeId" , commentController.comment )
//api for user to get comments
router.get("/getcomment/:recipeId", commentController.getComment)


router.all("/*", function (req, res) {
    return res
      .status(400)
      .send({ status: false, message: "invalid http request" })
  });
  
  module.exports = router;