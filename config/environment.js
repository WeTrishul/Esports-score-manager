const dotenv = require('dotenv');
dotenv.config();


const development = {
    name:"environment",
    session_cookie_key:"blahsomething",
    db:process.env.db,
    smtp:{
        service:"gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "team.wetrishul@gmail.com", 
          pass: "emieqzsfcizazmhb",
        }
    }
}


module.exports=development