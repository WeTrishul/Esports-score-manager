const mongoose=require('mongoose')
const db = require('../config/db')

const userDataSchema = new mongoose.Schema({
   username:{
        type:String,
        unique:true,
        required:true
    },
    usertype:{
        type:String,
        default:'emp'
    },
    password:{
        type:String,
        required:true
    }
})


const userData = mongoose.model('user', userDataSchema)

module.exports = userData