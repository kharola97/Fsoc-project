const {isValidateEmail,passwordVal,isValidName,isValidNo,} = require("../utils/helper/validator");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const services = require("../services/userser");
require("dotenv").config();

// password hashing
const passwordHashing = async function (password) {
  return new Promise((resolve, reject) => {
    const saltRounds = 10; //default
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err)
        return reject(
          res.status(400).send({ status: false, message: "invalid password" })
        );
      else return resolve(hash);
    });
  });
};

module.exports.createUser = async function (req, res) {
  try {
    let body = req.body;
     
    const { Fullname, number, email, password} = body;
    if (Object.keys(body).length == 0) {
      return res.status(400).send({ status: false, message: "Mandatory fields missing" });
    }

    if (Fullname == "")
      return res.status(400).send({ status: false, message: "Please enter name in body." });
     body.Fullname = Fullname.trim()
    
    if (!isValidName(body.Fullname))
      return res.status(400).send({ status: false, message: "Name can only contains Alphabets." });
        body.Fullname = Fullname.toLowerCase()

    if (number == "" || number.trim()=="") return res.status(400).send({ status: false, message: "phone is required." });
     body.number = number.trim()
     
    if (!isValidNo(body.number))
      return res.status(400).send({status: false,message: "Please enter a valid Mobile number.",});
    
    if (email == "")
      return res.status(400).send({ status: false, message: "Please enter email" });
    body.email = email.trim().toLowerCase()
    
    if (!isValidateEmail(body.email))
      return res.status(400).send({ status: false, message: "Please enter valid email." });
   

    if (password == "")
      return res.status(400).send({ status: false, message: "Please enter password." });
     body.password = password.trim()
     

    if (!passwordVal(body.password))
      return res.status(400).send({status: false,message:"Password must be in the Range of 8 to 15 , please enter atleast 1 lowercase, 1 uppercase, 1 numeric character and one special character.",});
    //hashing the password before saving it in database
    body.password = await passwordHashing(body.password);

    let findPhone = await services.checkPhone(number);

    if (findPhone) {
      return res.status(400).send({ status: false, message: "User already registerd." });}

    let findEmail = await services.Email(email);

    if (findEmail) {
      return res.status(400).send({ status: false, message: "Email already registerd." });}

    let createData = await services.createData(body);
    return res.status(201).send({ status: true, message: "Success", data: createData });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let data = req.body;
    const { email, password } = data;
   
    if (!email || !password)
      return res.status(400).send({status: false,message: "Please enter Email Id and Password.",});
     data.email = email.trim()
     data.password = password.trim()
    let userData = await services.Email(data.email);
    if (!userData)
      return res.status(400).send({ status: false, message: "Invalid Email or Password." });

    //using bcrypt library to comapre the password entered by user
    bcrypt.compare(data.password, userData.password, function (err, result) {
      // if passwords match
      if (result) {
        let token = jwt.sign({ userId: userData._id }, process.env.SECRET_KEY, {
          expiresIn: "24h",
        });
        
        return res.status(200).send({status: true,message: "Token have been generated",data: { userId: userData._id,token: token, },});
      }
      // if passwords do not match
      else {
        return res.status(400).send({ status: false, message: "Invalid email or password" });
      }
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: "Login User", Error: err.message });
  }
};

module.exports.updateUserDetails = async (req, res) => {
  try {
    let body = req.body;
    let userId = req.params.userId;
    let dataToUpdate = {};
    const { Fullname, number, email, password } = body;
    if (Object.keys(body).length == 0) {
      return res.status(400).send({ status: false, message: "Mandatory fields missing" });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ status: false, message: "Invalid recipe ID" });
    }

    if (Fullname) {
      if (Fullname == "")
        return res.status(400).send({ status: false, message: "Please enter name in body." });
      body.Fullname = Fullname.trim()
      if (!isValidName(body.Fullname))
        return res.status(400).send({status: false,message: "Name can only contains Alphabets.",});
      dataToUpdate.Fullname = body.Fullname;
    }

    if (number) {
      
      if (number == "")
        return res.status(400).send({ status: false, message: "phone is required." });
        body.number = number.trim()
      if (!isValidNo(body.number))
        return res.status(400).send({status: false,message: "Please enter a valid Mobile number.",});
      let findPhone = await services.checkPhone(number);
      
      if (findPhone) {
        return res.status(400).send({ status: false, message: "User already registerd." });
      }
      dataToUpdate.number = body.number;
    }

    if (email) {
      if (email == "")
        return res.status(400).send({ status: false, message: "Please enter email" });
        body.email = email.trim().toLowerCase()
      if (!isValidateEmail(body.email))
        return res.status(400).send({ status: false, message: "Please enter valid email." });
      
      let findEmail = await services.Email(body.email);
      if (findEmail) {
        return res.status(400).send({ status: false, message: "Email already registerd." });
      }
      dataToUpdate.email = body.email;
    }

    if (password) {
      if (password == "")
        return res.status(400).send({ status: false, message: "Please enter password." });
        body.password = password.trim()
      if (!passwordVal(body.password))
        return res.status(400).send({status: false,message:
    "Password must be in the Range of 8 to 15 , please enter atleast 1 lowercase, 1 uppercase, 1 numeric character and one special character.",
          });
      hashedPassword = await passwordHashing(body.password);
      dataToUpdate.password = hashedPassword;
    }

    let updateUserData = await services.updateData(userId, dataToUpdate);

    return res.status(201).send({ status: true, message: "Success", data: updateUserData });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
module.exports.getUserDetails = async(req,res)=>{
  try {
    
  let userId = req.params.userId
  if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({status:false,message:"user id is not valid "})
  
  let userFound =  await services.findUserDetails(userId)
  if(!userFound) return res.status(400).send({status:false,message:"User not found"})

  return res.status(200).send({status:true,message:"User details",data:userFound})
} catch (error) {
  res.status(500).send({ status: false, message: error.message });
}

}