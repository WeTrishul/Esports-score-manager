
class SocketEngine{
    constructor(){
        this.socket = io.connect('http://localhost:4000');
            this.connectionHandler();
    }
    connectionHandler(){
        const self = this
       
        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');

            
        });

        this.socket.on('yesyoumayincrement',(data)=>{
            console.log(data.eleid)
            console.log('inside me')
            if(data.datatoshow==0 && data.eleid[0]=='L' )
            {
                $('#'+data.eleid).text('eliminated')
            }
            else{
            $('#'+data.eleid).text(data.datatoshow)
            }
           
        })
    }
}

   