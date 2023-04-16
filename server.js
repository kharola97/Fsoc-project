const express = require("express")
const app = express()
const cors = require('cors')
const router = require("./src/routes/userRoute")
const { connectDatabase} = require("./src/db/databaseConnection")
app.use(express.json())
app.use("/", router)
app.use(cors())


require("dotenv").config()

const cookieParser = require('cookie-parser');

app.use(cookieParser());



const PORT = process.env.PORT

connectDatabase();
app.listen(PORT, function(){
    console.log("port is running on "+PORT)
})

