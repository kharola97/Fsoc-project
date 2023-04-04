const mongoose = require("mongoose")
require("dotenv").config()

const url = process.env.DB_URL

module.exports.connectDatabase = () => {
    mongoose.connect(url,{useNewUrlParser:true})
      .then(() => console.log("MongoDB is connected"))
      .catch((err) => console.log(err));
  };