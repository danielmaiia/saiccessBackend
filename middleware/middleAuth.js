const jwt = require("jsonwebtoken");
const jwtpasssecret = "ASK829*ME**SYS"


exports.authTokenMiddleware = (req, res, next) =>{
    let verifytoken = req.headers["authorization"];
    if(verifytoken){
        // const splitToken = verifytoken.split(' ');
        // var tokenSuccess = splitToken[1];

        jwt.verify(verifytoken, jwtpasssecret, (err, data) =>{
            if(err){
                res.status(401)
                res.json({error: "Não autorizado"})
            }else{
                res.token = verifytoken;
                req.userLog = {data}
                next();
            }
        })
    }else{
        res.status(401)
        res.json({error: "Não autorizado"})
    }
}