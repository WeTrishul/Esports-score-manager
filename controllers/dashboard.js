
const mongoose = require('mongoose')
const Event = require('../model/eventdata')
const User = require('../model/user')
const accessMailer = require('../mailer/accessMailer')


module.exports.getdashboard = async (req,res) =>{

    if(!req.isAuthenticated())
    {
        res.redirect('\login')
    }
    else
    {
        const allevents = await Event.find({})

        res.render('dashboard',{
            allevents
        })
    }
    
}

module.exports.geteventform = (req,res) =>{

    if(!req.isAuthenticated())
    {
        res.redirect('/login')
    }
    else if(req.user.usertype=='Admin')
    { 
        res.render('eventform')
    }
    else
    {
        res.redirect('/dashboard')
    }
  
}

module.exports.geteventdata = async (req,res) =>{

    if(!req.isAuthenticated())
    {
        res.redirect('/login')
    }
    else
    {
        const event = await Event.findOne({eventname:req.params.eventname})
        console.log(event.eventdata)
        console.log(Object.keys(event.eventdata[0]));
        res.render('eventdata',{
            eventname:event.eventname,
            eventdata:event.eventdata,
            eventattributes:Object.keys(event.eventdata[0])
        }) 
    }  
}

module.exports.uploadevent = async (req,res) =>{

    if(!req.isAuthenticated())
    {
        res.redirect('/login')
    }
    else if(req.user.usertype=='Admin')
    {
       
        let mymap = new Map();

        let eve = req.body.eventdata
  
   let unique = req.body.eventdata.filter(el => {
    const val = mymap.get(el.TEAMNAME);
    if(val) {
        if(el.LOGO < val) {
            mymap.delete(el.TEAMNAME);
            mymap.set(el.TEAMNAME, el.LOGO);
            return true;
        } else {
            return false;
        }
    }
    mymap.set(el.TEAMNAME, el.LOGO);
    return true;
});
  
var eventdata = []

unique.forEach((element)=>{

      var obj = {
                sNo:eventdata.length+1,
                Logo:element.LOGO,
                Teamname:element.TEAMNAME,
                Tpoint:0,
                Kills:0,
                Live:0
            }
            eventdata.push(obj)

})


        
               var matchdata = []
        unique.forEach(ele=>{
            
            var playersArray = []
            eve.forEach(element=>{
               
                if(element.TEAMNAME==ele.TEAMNAME)
                {
                    var player = {
                        playername:element.PLAYER,
                        finnish:0,
                        damage:0
                    }
                   
                   
                    playersArray.push(player)
                }
            });
            

            var ob = {
                teamname:ele.TEAMNAME,
                playersArray:playersArray,
                pos:0
            }

            matchdata.push(ob)

        })

        const event = await Event.create({eventname:req.body.eventname,eventdata,matchdata})   

        // console.log(event)
        if (req.xhr){
            return res.status(200).json({
                message: "hogya"
            });
        }
    }
    else
    {
        req.redirect('/dashboard')
    }
    
    
}

module.exports.castdata = async (req,res) =>{

    if(!req.isAuthenticated())
    {
        res.redirect('/login')
    }
    else
    {
        const event = await Event.findOne({eventname:req.params.eventname})
        console.log(event.eventdata)
        console.log(Object.keys(event.eventdata[0]));
        res.render('CastPage',{
            eventname:event.eventname,
            eventdata:event.eventdata,
            eventattributes:Object.keys(event.eventdata[0])
        })
    }
  
    
}

module.exports.deleteevent = async (req,res) =>{

    if(!req.isAuthenticated())
    {
        res.redirect('/login')
    }
    else if(req.user.usertype=='Admin')
    {
        const event = await Event.deleteOne({eventname:req.params.eventname})
        console.log('hogayis')
        if (req.xhr){
            return res.status(200).json({
                message: "hogya"
            });
        }
    }
    else
    {
        res.redirect('/dashboard')
    }
}


module.exports.getaccesspage = async (req,res) =>{

    if(!req.isAuthenticated())
    {
        res.redirect('/login')
    }
    else if(req.user.usertype=='Admin')
    {
    return res.render('access')
    }
    else
    {
        res.redirect('/dashboard')
    }
    
}



module.exports.inviteaccess = async (req,res) =>{
    console.log(req.body)

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
    
    const password = makeid(8)

    try {
        const user = await  User.create({
            username:req.body.email,
            password:password
        })

        await user.save()
        
        const obj = {
            email : req.body.email,
            password:password
        }
         
       accessMailer.newAccess(obj)
    
        if (req.xhr){
            return res.status(200).json({
                message: "hogya"
            });
        }


    } catch (error) {
        console.log('Error in signup')
    }  

    
}


module.exports.openmatchresultpage = async (req,res) =>{

    const eve = await Event.findOne({eventname:req.params.eventname})

console.log(eve.matchdata)
   return res.render('matchresult',{
       matchdata : eve.matchdata
   })


}

