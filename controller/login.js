const database = require("../database")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const jwtpasssecret = "AMmjBeXG4JbWay53i>8+"

exports.AuthUser = async (req, res) => {
    var email = req.body.email
    var password = req.body.password
    if(email != undefined){
        connection = await database.getConnection();
        const query = `
           SELECT 
            cu.id,
            cu.name,
            cu.email,
            cug.group_id 
            FROM CONTROL_USER cu
            INNER JOIN CONTROL_USER_GROUPS cug ON cug.USER_ID = cu.id
            WHERE cu.email = '${email}'
        `
        var select = await connection.execute(query)

        if(select.length > 0){
                //validando usuario ativo
            if(select[0].status == 1){
                 //validando senha com criptografia 
            bcrypt.compare(password, select[0].password).then(async(result) => {
            if(result){
                //criando o login com jwt
                    jwt.sign({
                        user: select[0].user,
                        id: select[0].id
                     },
                    jwtpasssecret,
                    {expiresIn: '10h'}, (err, token) =>{
                        if(err){
                            res.status(400)
                            res.json({error: "Error token"})
                        }else{
                            //retorno dados para o front
                            res.status(200)
                            res.json({
                                token: token,
                                name: select[0].name,
                                email: select[0].email,
                                id: select[0].id,
                                group_id: select[0].group_id
                               })
                             }
                        })
                }else{
                    res.status(401)
                    res.json({err: "Senha incorreta"})
                }
            })
        }else{
            res.status(401)
            res.json({err: "Usuário inativo"})
        }

        }else{
            res.status(404)
            res.json({err: "Usuário não encontrado"})
        }
    }else{
        res.status(400)
        res.json({err: "Usuário inválido"})
    }
}



exports.insertFuncionario = async(req,res) => {
    try {
        connection = await database.getConnection();
        bcrypt.hash(req.body.password, 20, async(err, hash) => {
            // Verificação de erro do bcrypt
            if (err) {
            return res.status(500).send({ error: "Erro ao gerar o hash da senha." });
            }
            const user = `
            INSERT INTO CONTROL_USER
            (name, email, password, status)
            VALUES (:name, :email, :password, :status)
            `;

            const binds = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            status: 1
            };

            await connection.execute(user, binds, { autoCommit: true });
            return res.status(201).json({message: "Success"});
        })
        }catch (error) {
              return res.status(500).send({ error: error.message });
        }
}