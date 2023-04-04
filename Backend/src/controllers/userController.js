const userModel = require("../models/Usermodel")
const {
    isValidateEmail,
    passwordVal,
    isValidName,
    isValidNo,
    
  } = require("../utils/helper/validator");

const jwt = require("jsonwebtoken")

const {Email,createUser,findUser,checkPhone} = require("../services/userser")

module.exports.createUser = async function (req, res) {
    try {
      let body = req.body;
      const {  Firstname, Lastname, phone, email, password } = body;
      if (Object.keys(body).length == 0|| !Firstname || !Lastname || !phone || !email || !password) {
        return res
          .status(400)
          .send({ status: false, message: "Please enter some data in body." });
      }
    
      if (!Firstname)
        return res
          .status(400)
          .send({ status: false, message: "Please enter name in body." });
  
      if (!isValidName(Firstname.trim()))
        return res
          .status(400)
          .send({ status: false, message: "Name can only contains Alphabets." });
      
          if (!Lastname)
        return res
          .status(400)
          .send({ status: false, message: "last name is required." });
  
      if (!isValidName(Lastname.trim()))
        return res
          .status(400)
          .send({ status: false, message: "Name can only contain Alphabets." });
  
      if (!phone)
        return res
          .status(400)
          .send({ status: false, message: "phone is required." });
  
      if (!isValidNo(phone))
        return res
          .status(400)
          .send({
            status: false,
            message: "Please enter a valid Mobile number.",
          });
  
      if (!email)
        return res
          .status(400)
          .send({ status: false, message: "Please enter email in body." });
  
      if (!isValidateEmail(email.trim()))
        return res
          .status(400)
          .send({ status: false, message: "Please enter valid email." });
  
      if (!password)
        return res
          .status(400)
          .send({ status: false, message: "Please enter password in body." });
  
      if (!passwordVal(password.trim()))
        return res.status(400).send({
          status: false,
          message:
            "Password must be in the Range of 8 to 15 , please enter atleast 1 lowercase, 1 uppercase, 1 numeric character and one special character.",
        });
      
        
      let findPhone = await checkPhone(phone);
      
      if (findPhone) {
        return res
          .status(400)
          .send({ status: false, message: "User already registerd." });
      }
      let findEmail = await Email(email)
      if (findEmail) {
        return res
          .status(400)
          .send({ status: false, message: "Email already registerd." });
      }
      let createData = await createUser(body)
     
     return res.status(201).send({ status: true, message: "Success", data: createData });
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };

  module.exports.loginUser = async function (req, res) {
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
  
      let userData = await findUser(email,password);
      if (!userData)
        return res
          .status(400)
          .send({ status: false, message: "Invalid Email or Password." });
  
      let token = jwt.sign(
        { userId: userData._id.toString() },
        "AAAB-Project04",
        { expiresIn: "24h" }
      );
  
      return res
        .status(200)
        .send({ status: true, message: "Success", data: token });
    } catch (err) {
      return res
        .status(500)
        .send({ status: false, message: "Login User", Error: err.message });
    }
  };
  