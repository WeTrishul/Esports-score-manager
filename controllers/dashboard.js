
const mongoose = require('mongoose')
const Event = require('../model/eventdata')


module.exports.getdashboard = async (req,res) =>{
    const allevents = await Event.find({})

    res.render('dashboard',{
        allevents
    })
}

module.exports.geteventform = (req,res) =>{
    res.render('eventform')
}

module.exports.geteventdata = async (req,res) =>{
    const event = await Event.findOne({eventname:req.params.eventname})
    console.log(event.eventdata)
    console.log(Object.keys(event.eventdata[0]));
    res.render('eventdata',{
        eventname:event.eventname,
        eventdata:event.eventdata,
        eventattributes:Object.keys(event.eventdata[0])
    })
}

module.exports.uploadevent = async (req,res) =>{
    const event = await Event.create(req.body)    
    console.log(event)
    if (req.xhr){
        return res.status(200).json({
            message: "hogya"
        });
    }
}

module.exports.castdata = async (req,res) =>{
  
    const event = await Event.findOne({eventname:req.params.eventname})
    console.log(event.eventdata)
    console.log(Object.keys(event.eventdata[0]));
    res.render('CastPage',{
        eventname:event.eventname,
        eventdata:event.eventdata,
        eventattributes:Object.keys(event.eventdata[0])
    })
}



