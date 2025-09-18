//var authMiddle = require("../middleware/middleAuth")
const express = require('express')
const router = express.Router()

const loginController = require('../controller/login');


router.post('/login/user', loginController.AuthUser)
router.post('/insert/user', loginController.insertFuncionario) //authMiddle.authTokenMiddleware,


module.exports = router