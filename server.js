const express = require("express")
const app = express()
const router = require("./src/routes/userRoute")
const { connectDatabase} = require("./src/db/databaseConnection")
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(cors({ credentials: true, origin: true }));



require("dotenv").config()

const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
   
    next();
  });

  app.use("/", router)


const PORT = process.env.PORT || 4500

connectDatabase();
app.listen(PORT, function(){
    console.log("port is running on "+PORT)
})

