const database = require("../database")

exports.user = async (req, res) =>{
   var email = req.body.email
    try{
        connection = await database.getConnection();
        const result = await connection.execute(
             `
           SELECT 
            cu.id,
            cu.name,
            cu.email,
            cug.group_id 
            FROM CONTROL_USER cu
            INNER JOIN CONTROL_USER_GROUPS cug ON cug.USER_ID = cu.id
            WHERE cu.email = '${email}'
        `
        )
        return res.status(200).send(result)
    }catch(e){
        return e
    }finally {
    if(connection) {
      try {
        await connection.close();
      } catch (err) {
        return err
      }
    }
  }
}