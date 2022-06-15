
const env = require('./environment')
const mongoose=require('mongoose')

mongoose.connect(`mongodb://127.0.0.1:27017/esportsManager`,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error',console.error.bind(console,'error connecting to database'))

db.once('open',()=>console.log('Connected to database :: MongoDB'))



module.exports= db
