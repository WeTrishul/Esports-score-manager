const dotenv = require('dotenv');
dotenv.config();


const development = {
    name:"environment",
    session_cookie_key:"blahsomething",
    db:process.env.db,
    smtp:{
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.user, 
          pass: process.env.pass,
        }
    }
}


module.exports=development