
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
                var x = data.datatoshow
                var str = ""
                while(x--)
                {
                    str+='|'
                   
                }
                // $('#'+data.eleid).text(data.datatoshow)
                $('#'+data.eleid).text(str)
                $('#'+data.eleid+'-span').text('eliminated')
                $('#'+data.eleid+'-span').css('background','#DC2626')
                $('#'+data.eleid+'-teamname').css('color','#DC2626')
                $('#'+data.eleid).css('color','#DC2626')
                console.log('#'+data.eleid+'-teamname')
            }
            else{
                var x = data.datatoshow
                var str = ""
                while(x--)
                {
                    str+='|'
                   
                }
            $('#'+data.eleid).text(str)
            $('#'+data.eleid+'-span').text('available')
                $('#'+data.eleid+'-span').css('background','#059669')
                $('#'+data.eleid+'-teamname').css('color','#FFFFFF')
                $('#'+data.eleid+'-teamname').css('color','#FFFFFF')
                $('#'+data.eleid).css('color','#FFFFFF')

            }
           
        })
    }
}

   