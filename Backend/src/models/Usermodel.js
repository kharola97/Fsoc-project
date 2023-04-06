const mongoose =  require("mongoose")

const userSchema = new mongoose.Schema(
    {
      
      Fullname: {
          type: String,
          required : true,
          trim : true
      },
      
      number: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true  
      },
      cpassword: {
        type: String,
        required: true  
      },
      
    },{ timestamps: true }
  );
  module.exports = mongoose.model("user", userSchema);