const {
    isValidateEmail,
    passwordVal,
    isValidName,
    isValidNo,
    
  } = require("../utils/helper/validator");

const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const services = require("../services/userser")
// const {Email,create,findUser,checkPhone} = require("../services/userser")

// password hashing
const passwordHashing =async function(password){
  return new Promise((resolve, reject) => {
      const saltRounds = 10 //default
      bcrypt.hash(password, saltRounds, function (err, hash) {
  
        if (err) return  reject(res.status(400).send({ status: false, message: "invalid password" }))
        else return resolve(hash)
          
      });
  })
}


module.exports.createUser = async function (req, res) {
  
      let body = req.body;
      
      const {  Fullname,  number, email, password,cpassword } = body;
      if (Object.keys(body).length == 0) {
        return res
          .status(400)
          .send({ status: false, message: "Mandatory fields missing" });
      }
      
    
      if (Fullname=="")
        return res
          .status(400)
          .send({ status: false, message: "Please enter name in body." });
          
      if (!isValidName(Fullname.trim()))
        return res
          .status(400)
          .send({ status: false, message: "Name can only contains Alphabets." });
      
          
          
  
      if (number == "")
        return res
          .status(400)
          .send({ status: false, message: "phone is required." });
          if (!isValidNo(number))
          return res
          .status(400)
          .send({
            status: false,
            message: "Please enter a valid Mobile number.",
          });
          
          
          if (email=="")
          return res
          .status(400)
          .send({ status: false, message: "Please enter email" });
          
          if (!isValidateEmail(email.trim()))
          return res
          .status(400)
          .send({ status: false, message: "Please enter valid email." });
           body.email = email.toLowerCase()
          if (password=="")
          return res
          .status(400)
          .send({ status: false, message: "Please enter password." });
          if (cpassword=="")
          return res
          .status(400)
          .send({ status: false, message: "Please enter password" });
          
          if (!passwordVal(password.trim()))
          return res.status(400).send({
            status: false,
            message:
            "Password must be in the Range of 8 to 15 , please enter atleast 1 lowercase, 1 uppercase, 1 numeric character and one special character.",
          });
          body.password= await passwordHashing(body.password)
          
          
          let findPhone = await services.checkPhone(number);
          
          if (findPhone) {
            return res
            .status(400)
            .send({ status: false, message: "User already registerd." });
          }
          let findEmail = await services.Email(email)
          if (findEmail) {
            return res
            .status(400)
            .send({ status: false, message: "Email already registerd." });
          }
         
          
          let createData = await services.createData(body)
         
          return res.status(201).send({ status: true, message: "Success", data: createData });
        
  };

  module.exports.loginUser = async  (req, res)=> {
    try {
      let data = req.body;
      const { email, password } = data;
  
      if (!email || !password)
        return res
          .status(400)
          .send({
            status: false,
            message: "Please enter Email Id and Password.",
          });
  
      let userData = await services.findUser(email);
      if (!userData)
        return res
          .status(400)
          .send({ status: false, message: "Invalid Email or Password." });

          bcrypt.compare(data.password, userData.password, function (err, result) {  // Compare .
            // if passwords match
            if (result) {
              let token = jwt.sign({ userId: userData._id }, "Secret-key", { expiresIn: "24h" })
              res.cookie("jwtoken", token,{
                expiresIn:new Date(Date.now() + 25634587000),
                //httpOnly:true, //Setting httpOnly to true prevents client-side JavaScript code from accessing the cookie through the document.cookie
                //secure: true // only send cookie over HTTPS
              })
             
              return res.status(200).send({ status: true, message: "Token have been generated", data: { userId: userData._id} })
            }
            // if passwords do not match
            else {
              return res.status(400).send({ status: false, message: "Invalid email or password" })
            }
            
          })
  
      
      // res.cookie("jwtoken", token,{
      //   expiresIn: new Date(Date.now() + 25636541000),
      //   httpOnly:true
      // })
  
      
    } catch (err) {
      return res
        .status(500)
        .send({ status: false, message: "Login User", Error: err.message })
    }
  };
  