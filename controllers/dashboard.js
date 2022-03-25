
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
       matchdata : eve.matchdata,
       eve:req.params.eventname
   })


}

module.exports.savematchdata = async(req,res)=>{


    const eve = await Event.findOne({eventname:req.params.eventname})



    eve.matchdata.forEach((ele)=>{

        ele.pos=req.body[ele.teamname+"-"+"pos"]
        ele.playersArray.forEach((e)=>{

            e.finnish=req.body[ele.teamname+"_"+e.playername+"_finnish"]
            e.damage=req.body[ele.teamname+"_"+e.playername+"_damage"]
           

        })
    })

    eve.markModified('matchdata');
     
    var si = eve.matchresults.length

    var o = {
        matchno:si+1,
        matchdata:eve.matchdata
    }
    eve.matchresults.push(o)
    
    await eve.save()

  return res.redirect('/eventpage/'+eve.eventname)
}


module.exports.geteventpage =async (req,res) =>{

    const eve = await Event.findOne({eventname:req.params.eventname})
    console.log(eve)
   return res.render('eventpage',{
        eve
    })
}

module.exports.castmatchresult = async (req,res) =>{

    console.log(req.params.matchno)
    const eve = await Event.findOne({eventname:req.params.eventname})

    var matchinconcern = eve.matchresults[req.params.matchno]

    var teamleaderboards = matchinconcern.matchdata.sort((a, b) => (a.pos > b.pos) ? 1 : -1)


    var allplayers = []

    matchinconcern.matchdata.forEach((ele)=>{

        ele.playersArray.forEach((e)=>{
            allplayers.push({
                teamname:ele.teamname,
                playername:e.playername,
                finnish:e.finnish,
                damage:e.damage
            })
        })
    })
    var killsleaders = allplayers.sort((a, b) => (a.damage  < b.damage) ? 1 : -1)

    console.log(teamleaderboards)
    console.log(killsleaders)
   
    
    
}

