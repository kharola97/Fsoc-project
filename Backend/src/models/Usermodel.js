const mongoose =  require("mongoose")

const userSchema = new mongoose.Schema(
    {
      
      Firstname: {
          type: String,
          required : true,
          trim : true
      },
      Lastname: {
        type: String,
        required : true,
        trim : true
    },
      phone: {
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
      
    },{ timestamps: true }
  );
  module.exports = mongoose.model("user", userSchema);