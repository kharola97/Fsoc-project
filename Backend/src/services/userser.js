const userModel = require("../models/Usermodel")


module.exports.createUser = function(user){
    try {
        return userModel.create(user)
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

module.exports.Email = function(email){
    try {
        return userModel.findOne({email:email})
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}


module.exports.findUser = function(email,password){
    try{
        return userModel.findOne({email:email,password:password})
    }
    catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

module.exports.checkPhone = function(phone){
    try{
        console.log(phone)
        return userModel.findOne({phone:phone})
    }
    catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}


