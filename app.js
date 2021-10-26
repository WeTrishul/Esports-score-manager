const express = require('express')
const app=express()
const ejs = require('ejs')
const bodyParser = require("body-parser")
const db = require('./config/db')
const cors = require('cors')

const DashboardRouter = require('./routes/dashboard')

app.use(cors({
    origin:'*'
}))


const port=process.env.PORT || 3000
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs')
app.set('views','./views')

app.use(express.static('./assets'))
app.use(DashboardRouter)

const SocketServer = require('http').Server(app)
const TheSocket = require('./config/thesocket').chat(SocketServer)

SocketServer.listen(4000)

app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})


