const userModel = require("../models/Usermodel")

module.exports.createData =  async (user) =>{
    try {
        
        let result = await userModel.create(user)
        console.log(result,"inside create")
        return result
    } catch (error) {
        throw error
    }
}

module.exports.Email =  function(email){
    try {
        return  userModel.findOne({email:email})
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}


module.exports.findUser =  function(email){
    try{
        return  userModel.findOne({email:email})
    }
    catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

module.exports.checkPhone =  function(phone){
    try{
        
        return  userModel.findOne({phone:phone})
    }
    catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}
module.exports.findUserId = async function(userId){
    try{
        return  userModel.findById(userId)
    }
    catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}


