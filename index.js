const express = require("express")
const userRouter = require("./src/routes/users")
const movieRouter = require("./src/routes/movies")
const bookmarkRouter = require("./src/routes/bookmark")
const categoryRouter = require("./src/routes/categories")
const planRouter = require("./src/routes/plan")




const app = express()

app.listen("3000", () => console.log("Listening on port 3000")) 

app.use(express.json())

app.use(userRouter)
app.use(movieRouter)
app.use(bookmarkRouter)
app.use(categoryRouter)
app.use(planRouter)


 

