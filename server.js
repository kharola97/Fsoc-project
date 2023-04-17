const express = require("express")
const app = express()
const cors = require('cors')
const router = require("./src/routes/userRoute")
const { connectDatabase} = require("./src/db/databaseConnection")
app.use(express.json())

app.use(cors())


require("dotenv").config()

const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    console.log("hello")
    next();
  });

  app.use("/", router)

const PORT = process.env.PORT

connectDatabase();
app.listen(PORT, function(){
    console.log("port is running on "+PORT)
})

