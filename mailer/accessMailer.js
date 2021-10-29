const nodemailer = require('../config/nodemailer')

exports.newAccess = (user)=>{
    console.log('Inside access_mailer')
    let stringHtml = nodemailer.renderTemlate({user:user},'/accessAuth.ejs')

    nodemailer.transporter.sendMail({
        from:'team.weTrishul@gmail.com',
        to: user.email,
        subject:'Access Email!',
        html:stringHtml   //'<h1>Congratulations,you have logged in!</h1>'
    },(err,info)=>{
        if(err){
            console.log(user.email)
            console.log('Error in sending Mail', err)
            return
        }
        console.log('Messge successfully delivered!', info)
        return
    })
}