const express = require("express")
const app = express()
const router = require("./src/routes/userRoute")
const { connectDatabase} = require("./src/db/databaseConnection")
app.use(express.json())
app.use("/", router)


require("dotenv").config()

const cookieParser = require('cookie-parser');

app.use(cookieParser());



const PORT = process.env.PORT || 4500

connectDatabase();
app.listen(PORT, function(){
    console.log("port is running on "+PORT)
})

