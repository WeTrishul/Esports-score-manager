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
          console.log(data)


          console.log(data.sNo)
          const event = await Event.findOne({eventname:data.eventname})
      
          event.eventdata[(data.sNo)-1][data.attri]++

          var datatoshow=event.eventdata[(data.sNo)-1][data.attri]
      
          event.markModified('eventdata');
         
          await event.save()
          
          console.log(event)

          io.emit('yesyoumayincrement',{
            eleid:data.attri+'-'+data.sNo+'-'+data.eventname,
            datatoshow
          })

        })

})

}