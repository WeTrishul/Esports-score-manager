let selectedFile;
console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[{
    "name":"wetrishul",
    "data":"scd",
    "abc":"sdef"
}]


document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
        //  console.log(workbook);
         workbook.SheetNames.forEach(sheet => {
              let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
            //   console.log(rowObject);
            //   console.log(JSON.stringify(rowObject))
            
            var str = JSON.stringify(rowObject)

        

                var eventname = $('#eventname').val()

                

            //   var form_data = new FormData();
            //   form_data.append('eventname',eventname)
            //   form_data.append('eventdata',eventdata)

            //   var formdata = {
            //     eventname:eventname,
            //     eventdata:eventdata
            //   }

            // console.log(form_data)

              $.ajax({
                type: 'post',
                url: '/uploadeventdata',
                data: {
                    eventname:eventname,
                    eventdata:rowObject
                },
                success: function(data){
                    new Noty({
                        theme: 'relax',
                        text: "Event Uploaded!",
                        type: 'success',
                        layout: 'centerRight',
                        timeout: 1500
                        
                    }).show();
  
                   
                }, error: function(error){
                    console.log(error.responseText);
                }
            });

            //   document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
         });
        }
    }
});