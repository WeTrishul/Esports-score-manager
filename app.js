const express = require('express')
const app=express()
const dotenv = require('dotenv');
const session = require('express-session')
const ejs = require('ejs')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const env = require('./config/environment')
const db = require('./config/db')
const cors = require('cors')
const passport = require('passport')
const passport_local = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo')

const DashboardRouter = require('./routes/dashboard')
const userRouter = require('./routes/user')



app.use(cors({
    origin:'*'
}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://54.226.206.106:4000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });


const port=process.env.PORT || 3000
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())


app.set('view engine','ejs')
app.set('views','./views')

app.use(session({
    name: 'EsportsManager',
    secret: env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: `mongodb://127.0.0.1:27017/${env.db}`,
        autoRemove:'disabled',
    },
    function(err)
    {
        console.log(err||'connect-mongodb setup ok')
    })
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)

app.use(express.static('./assets'))
app.use(DashboardRouter)
app.use(userRouter)




const SocketServer = require('http').Server(app)
const TheSocket = require('./config/thesocket').chat(SocketServer)

SocketServer.listen(4000)

app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})


