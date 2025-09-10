const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const routeLogin = require("./routes/routes")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use("/login",routeLogin)


module.exports = app