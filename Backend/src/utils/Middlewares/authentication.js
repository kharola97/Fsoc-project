const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")


module.exports.authentication = async function (req, res, next) {
  try {
    
    //getting the token that we set in cookie when the user logs in
    let token = req.headers["cookie"];
    //Token wa ssaved with prefix jwtoken= so we need to remove that to verify the token
    const actualToken = token.replace("jwtoken=", "").replace("=", "");
    
    if (!actualToken) {

      return res.status(400).send({ status: false, message: "token is required in headers" });
    }

    //verifying the token is it matches our secret key
    jwt.verify(actualToken, "Secret-key", (err, decodedToken) => {

      if (err) {

        return res.status(400).send({ status: false, message: "invalid token" });

      } else {

        req.userId = decodedToken.userId

        next();
      }

    })

  } catch (error) {
    
    return res.status(500).send({status:false,message:error.message})

  }
  };


  module.exports.authorization = async function(req,res,next){
    try {
      
      const userId=req.params.userId
      
      if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({status:false,message:"user id is not valid drom authorization"})

      //authorizing that the userId we are getting params matches the userId in the token

      if(userId==req.userId) return next()

      else return res.status(403).send({status:false,message:"you are not authorized "})

    } catch (error) {

      return res.status(500).send({status:false,message:error.message})

    }
    }