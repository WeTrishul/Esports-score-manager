{
    console.log('HI')
    class ToggleLike{
        constructor(toggleElement){
            this.toggler = toggleElement;
            this.toggleLike();
        }
        toggleLike(){
            $(this.toggler).click(function(e){
                e.preventDefault();
                let self = this;
               
                console.log($(self).attr('href'))

                var jsonstring = $(self).attr('value');
               
            

                $.ajax({
                type: 'POST',
                data:jsonstring,
                url: $(self).attr('href'),
            })
            .done(function(data) {
               
               
                

            })
            .fail(function(errData) {
                console.log('Error aaya');
            });

            })
        }
    }

}