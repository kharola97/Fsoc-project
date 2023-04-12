const userModel = require("../models/Usermodel")

module.exports.createData =  async (user) =>{
    try {
        return await userModel.create(user)
     } catch (error) {
        return ({status:false,message:error.message})
    }
}

module.exports.Email =  async (email)=>{
    try {
        return await  userModel.findOne({email:email})
    } catch (error) {
        return ({status:false,message:error.message})
    }
}



module.exports.checkPhone =  function(phone){
    try{
        
        return  userModel.findOne({number:phone})
    }
    catch (error) {
        return ({status:false,message:error.message})
    }
}
module.exports.findUserId = async function(userId){
    try{
        return  userModel.findById(userId)
    }
    catch (error) {
        return ({status:false,message:error.message})    }
}

module.exports.updateData = async(userId,data)=>{
    try {
        return await userModel.findOneAndUpdate({_id:userId},{...data},{new:true})
    } catch (error) {
        return ({status:false,message:error.message})
    }
}

module.exports.findUserDetails = async(userId)=>{
    try {
        return await userModel.findById(userId)
    } catch (error) {
        return ({status:false,message:error.message})
    }
}


