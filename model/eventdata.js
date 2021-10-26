const mongoose=require('mongoose')
const db = require('../config/db')

const eventdataSchema = new mongoose.Schema({

    eventname:{
        type:String,
        required:true
    },
    eventdata:[]
 
},{
    timestamps:true
})


const eventdata = mongoose.model('Post', eventdataSchema)

module.exports = eventdata