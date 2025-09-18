const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const routeApi = require("./routes/routes")
const routeAuth = require("./routes/login")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use("/api",routeApi)
app.use("/auth", routeAuth)


module.exports = app