const express = require("express")
const app = express()
const router = require("./src/routes/userRoute")
const { connectDatabase} = require("./src/db/databaseConnection")
app.use(express.json())
app.use("/", router)
require("dotenv").config()


const PORT = process.env.PORT

connectDatabase();
app.listen(PORT, function(){
    console.log("port is running on "+PORT)
})

