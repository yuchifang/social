const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./router/users')
const authRoute = require('./router/auth')
const postRoute = require('./router/posts')

const app = express()
const port = 8800

dotenv.config()

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to MongoDB")
});

//middleware
app.use(express.json())
// 是一個 body parser 當接收到 post req 將會 parser
app.use(express.urlencoded({ extended: false }));

app.use(helmet())
app.use(morgan("common"))
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

app.listen(port, () => {
    console.log("Backend server is running")
})