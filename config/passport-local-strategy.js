const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../model/user')

passport.use(new LocalStrategy({
    usernameField:'username'
},
function(username,password,done){
    User.findOne({username:username},function(err,user){
        if(err)
        {
            console.log('Error in finding user --> Passport')
            return done(err)
        }

        if(!user || user.password!==password)
        {
            console.log('Invalid username/password')
           return done(err,false)
        }
       
        
        return done(null,user)
    })

}))

passport.serializeUser(function(user,done)
{
    done(null,user.username)
})

passport.deserializeUser(function(username,done){
    User.findOne({username:username},function(err,user){
        if(err)
        {
            console.log('Error in finding user --> Passport')
            return done(err) 
        }
        return done(null,user)
    })
})

passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated())
    {
        return next()
    }

    return res.redirect('/login')
}

passport.setAuthenticatedUser = (req,res,done)=>{
    if(req.isAuthenticated())
    {
        res.locals.user = req.user
    }
    
    done()
}

module.exports = passport;