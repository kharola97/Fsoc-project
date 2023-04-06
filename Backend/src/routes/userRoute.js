const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const authentication = require("../utils/Middlewares/authentication")
const recipeController = require("../controllers/RecipeController")
const commentController = require("../controllers/commentcontroller")

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/recipe", recipeController.createRecipe)
router.post("/comment", commentController.comment)



router.all("/*", function (req, res) {
    return res
      .status(400)
      .send({ status: false, message: "invalid http request" });
  });
  
  module.exports = router;