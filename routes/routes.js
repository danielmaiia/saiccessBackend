const express = require("express")
const router = express.Router()

router.get("/test", async(req,res)=>{
    console.log("testando minha rota")
    return "teste"
    }
)

module.exports = router