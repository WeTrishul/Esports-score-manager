const Event = require('../model/eventdata')

module.exports.chat = (socketserver) =>{



    let io = require('socket.io')(socketserver, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
      })


    io.sockets.on('connection',(socket)=>{
        console.log('yes i am also connected')

        
        socket.on('caniincrement',async(data)=>{
         


          
          const event = await Event.findOne({eventname:data.eventname})
          
          if(data.increment=='true')
          {
            event.eventdata[(data.sNo)-1][data.attri]++
          }
          else{
            if(event.eventdata[(data.sNo)-1][data.attri]!=0)
            {
              event.eventdata[(data.sNo)-1][data.attri]--
            }
            
          }

          var datatoshow=event.eventdata[(data.sNo)-1][data.attri]
      
          event.markModified('eventdata');
         
          await event.save()
          
          

          io.emit('yesyoumayincrement',{
            eleid:data.attri+'-'+data.sNo+'-'+data.eventname,
            datatoshow
          })

        })

})

}