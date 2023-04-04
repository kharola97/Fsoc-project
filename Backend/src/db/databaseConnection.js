const mongoose = require("mongoose")


module.exports.connectDatabase = () => {
    mongoose.connect("mongodb+srv://ankitdb:ankit321@cluster0.nz06g9j.mongodb.net/Project")
      .then(() => console.log("MongoDB is connected"))
      .catch((err) => console.log(err));
  };