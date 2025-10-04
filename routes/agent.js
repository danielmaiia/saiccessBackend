const express = require('express')
const router = express.Router()

const agentController = require('../controller/ia-server');

// Rotas para Google Gemini
router.post('/ia-server', agentController.agentAI)
router.get('/register-agent', agentController.registerAgent)



module.exports = router