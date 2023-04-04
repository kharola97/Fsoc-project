const express = require("express")
const app = express()
const router = require("./src/routes/userRoute")
const { connectDatabase} = require("./src/db/databaseConnection")
app.use(express.json())
app.use("/", router)

connectDatabase();
const server = app.listen(3000, function(){
    console.log("port is running on "+3000)
})

