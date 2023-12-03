const db = require("../routes/db.config");
const bcrypt = require("bcryptjs");
var accountType = "user";

const register = async(req,res) =>{
const  {email, password:Npassword} = req.body
if(!email || !Npassword) return res.json({status : "error", error: "please enter your mail and password "});
else {
    console.log(email);
    db.query(`SELECT email from ${accountType} WHERE email = ?`,[email],async(err,result) => {
       if(err) throw err;
       if(result[0]) return res.json({status : "error", error: "email has already been registered  "});
       else{
        const password =  await bcrypt.hash(Npassword,8);
        console.log(password);
        db.query(`INSERT INTO user SET ?` , {email: email, password: password},(error,results) =>{
            if(error) throw error;
            return res.json({status :"success" , success:"user has been registered"})
        }
        )
       }
    })
}
}
module.exports =register;

// 56.dk ama hata alınıyo 