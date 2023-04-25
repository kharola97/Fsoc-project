
# Recipe sharing Application
ii there
A web application where a people can make their accounts and sahre their best and recipes with other people and help them with instructions and ingredients to let them know how they can also prepare it

## API Reference

### Making an account

```localhost:4500/register
  post /register
```
 Api where user can create an account 


#### Login 

```localhost:4500/login
   post /login
```
Api where user can login using his email and password

 

### Update user details
``` localhost:4500/updateUserDetails/:userId
    put/updateUserDetails
```
Api where user can update his details after creating an account where userId is his unique Id



### Get user details
``` localhost:4500/getuserdetails/:userId
     get /getuserdetails/:userId
```
Api where we can get the details of user by using his unique userId



### Get recipe created by a user
``` localhost:4500/getRecipeByUser/:userId
    get /getRecipeByUser/:userId
```
Api where we can fetch the recipe that has been created by a user using his unique user Id



### Create a recipe
``` localhost:4500/recipe/:userId
    post /recipe/:userId
```
Api where a user can create a new recipe 


### Get a recipe that has been created
``` localhost:4500/getrecipe/:userId
    get /getrecipe/:userId
```
Api where we can fetch the recipe that other user have shared using a unique user Id


### Get a recipe by recipeId
``` localhost:4500/recipeById/:recipeId
    get /recipeById/:recipeId
```
Api where we can fetch the recipes using recipe id



### Update a recipe
``` localhost:4500/updateRecipe/:userId/:recipeId
    post /updateRecipe/:userId/:recipeId
```
Api where a user edit the recipe that he has created


### Delete the recipe
``` localhost:4500/deleteRecipe/:recipeId/:userId
    delete /deleteRecipe/:recipeId/:userId
```
Api where a user can delete the recipe which was created by him


### Add a comment for the recipe
``` localhost:4500/comment/:userId/:recipeId
    post /comment/:userId/:recipeId
```
Api where logged in user can comment on other people recipes


### Get the comments for a specific recipe
``` localhost:4500/getcomment/:recipeId
    get /getcomment/:recipeId
```
Api where we can get comments for a specific api


### Delete the specific comments
``` localhost:4500/deletecomment/:userId/:recipeId/:commentId
    Delete /deletecomment/:userId/:recipeId/:commentId
```
Api where a logged in user can delete his comment


### To be able to run this project you need to have nodejs installed on your system

``` link https://nodejs.org/en/download 
```


## Installation
```link - https://github.com/kharola97/Fsoc-project.git
```

Using the above link in your Gitbash clone the project Using
 git clone https://github.com/kharola97/Fsoc-project.git
 wait till the project gets cloned 
 type cd Backend and get inside this directory
 run command npm i 
 this willdownload all the dependencies
 run command nodemon server.js
    

## 🛠 Skills
Javascript, HTML, CSS, Mongodb,React,express.js

