const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const authRoute = require("./routes/auth")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL).then(()=> console.log("DB Connection Successful")).catch(err => console.log(err));
}




app.use("/api/auth", authRoute)


app.listen(5000, ()=> {
    console.log("Backend server is running")
})