var getOCRText = function(argument) {
    var $count=0;
    // get total count of rows
    $.ajax({
        type: "GET",
        url: 'http://localhost:8100/ocrapi/ocr?key=0d00ed5dbdde0241c265eeed48e39730',
        data: { 
            file_id: argument,
            page: 1,
            lang: "eng",
            psm: 3
        },
        crossDomain: true,
        dataType: 'json',
        headers: {"Access-Control-Allow-Origin": "*"},
        success: function(data){
            $count=parseInt(data);

            // if there are more than 20 records, pagination component will be shown 
            // by using jquery-bootstrap-pagination.js
            if($count > 0){

                var text=data.file_id;
                alert(text);
                $("#answer").html(text);

                //set response to text element

                // var $results = "";
                // $results +=
                // '<table data-role="table" class="ui-responsive table-stroke ui-table ui-table-reflow" id="myall-table">';
                // var cardTypes = [];
                // $.each(data, function(index, val) {
                //     var obj = {
                //         image: data[index].photo.mobile.l,
                //         title: data[index].name
                //     }
                //     cardTypes.push(obj);
                    
                // });

                // return cardTypes;
            }
        },
        error: function(){
          console.log("function called but failed");
        }
    });
};


function sendPost() {
    
    var oReq = new XMLHttpRequest();
    oReq.open("GET", document.getElementById("myImg").src , true);
    oReq.responseType = "arraybuffer";
    oReq.onload = function(oEvent) {
        var arrayBuffer = oReq.response;
        console.log( "len = " +  arrayBuffer.byteLength );
        
        var request = new XMLHttpRequest();
        request.open("POST",'http://localhost:8100/ocrapi/upload?key=0d00ed5dbdde0241c265eeed48e39730',true);
        var boundary = createBoundary();
        request.setRequestHeader( "Content-Type", 'multipart/form-data; boundary=' + boundary );
        
        var buffer = unicode2buffer( 
            '--' + boundary + '\r\n' + 'Content-Disposition: forname="userfile"; filename="' + document.getElementById("myImg").src + '"\r\n'
                                     + 'Content-Type: image/jpeg\r\n\r\n'
        );
        
        var buffer = appendBuffer( buffer , 
            arrayBuffer
        );
        
        var buffer = appendBuffer( buffer , 
            unicode2buffer(
                '\r\n' + '--' + boundary + '--'
            )
        );
        
        request.send( buffer );
        alert("send!");
    }
    oReq.onreadystatechange = function() {
        if (oReq.readyState == 4 && oReq.status == 200) {

            var myArr = JSON.parse(oReq.responseText);
            alert(myArr);
            myFunction(myArr);
        }
    };
    oReq.send(null);
    
    function myFunction(arr) {
        // var out = "";
        // var i;
        // for(i = 0; i < arr.length; i++) {
        //     out += '<a href="' + arr[i].url + '">' + 
        //     arr[i].display + '</a><br>';
        // }
        var fileid = arr.data.file_id;
        alert(fileid);
        getOCRText(fileid);
    }
}