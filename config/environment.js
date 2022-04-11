const dotenv = require('dotenv');
dotenv.config();


const development = {
    name:"environment",
    session_cookie_key:"blahsomething",
    db:process.env.db,
    smtp:{
        service:"gmail",
        host: "smtp.gmail.com",
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.user, 
          pass: process.env.pass,
          clientId: "667160792580-sp3n2hpf7mn3d472fn93gcpq5olcnoi4.apps.googleusercontent.com",
          clientSecret: "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",
          refreshToken: "..."
        }
    }
}


module.exports=development