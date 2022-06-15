var thesocket

class SocketEngine{
    constructor(){
        this.socket = io.connect('http://35.175.146.61:4000');
            this.connectionHandler();
    }
    connectionHandler(){
        const self = this
        thesocket=this.socket
        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');
            
        });
    }
}



class ToggleLike{
        constructor(toggleElement){
            this.toggler = toggleElement;
            this.toggleLike();
        }
        toggleLike(){
            $(this.toggler).click(function(e){
                e.preventDefault();
                let self = this;
                console.log('Yooooooo')

                console.log($(self).attr('href'))

                var jsonstring = $(self).attr('value');
                console.log(jsonstring)
                var incrementdata = JSON.parse(jsonstring)
                
                thesocket.emit('caniincrement',incrementdata)

                thesocket.on('yesyoumayincrement',(data)=>{
                    console.log(data.eleid)
                    console.log('inside me')
                    $('#'+data.eleid).text(data.datatoshow)
                   
                })

            //     $.ajax({
            //     type: 'POST',
            //     url: $(self).attr('href'),
            // })
            // .done(function(data) {
               
            // })
            // .fail(function(errData) {
            //     console.log('Error aaya');
            // });

            })
        }
    }
  
   