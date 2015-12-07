angular.module('starter', ['starter.services','ionic', 'ngCordova'])
// .constant('ApiEndpoint', {
//   url: 'http://localhost:8100/ocrapi'
// })
// .constant('ApiEndpoint', {
//   url: 'http://api.newocr.com/v1'
// })

.controller("ExampleController", function ($scope, $cordovaCamera, $cordovaFileTransfer, $ionicPopup, $http, $ionicLoading, $cordovaMedia2) {

    $scope.imgURI ="img/200x200.png";
    $scope.takePhoto = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };

        $cordovaCamera.getPicture(options).then(function (imageData) {
           // $scope.imgURI = "data:image/jpeg;base64," + imageData;

           $scope.imgURI = imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }
    
    $scope.choosePhoto = function () {
       // $scope.imgURI = "img/image1.png";
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }



    $scope.searchImage = function (imageUrl) {

      var url = "http://api.ocrapiservice.com/1.0/rest/ocr";
      
     // //File for Upload
     // //var targetPath = cordova.file.externalRootDirectory + "logo_radni.png";
     var targetPath= imageUrl;

     // File name only
     var filename = targetPath.split("/").pop();
      
     var options = {
          fileKey: "image",
          fileName: filename,
          chunkedMode: false,
          mimeType: "image/jpg",
          params : {'language':'en', 'apikey':'FgNZdYbfrH'}
      };
      //var myPopup;
      $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {

        $ionicLoading.hide();

        $scope.textData = JSON.stringify(result.response);

        
 
      }, function (err) {
        $ionicLoading.hide();
        alert(JSON.stringify(err));

      }, function (progress) {
        $ionicLoading.show({template: 'Searching...'});
      });


     };

     $scope.readText = function ()
     {
      var scrText=$("#answer").val();
      var mymedia = new Media('http://api.voicerss.org/?key=118f8212be9549339a1bcb6841a86aaa&hl=en-us&src=' + scrText, null, null, mediaStatusCallback);
        //var myMedia = new Media('http://api.voicerss.org/?key=118f8212be9549339a1bcb6841a86aaa&hl=en-us&src=' + srcText);
        //mymedia.play();
        $cordovaMedia.play(myMedia);
      
     };

     var mediaStatusCallback = function(status) {
        if(status == 1) {
            $ionicLoading.show({template: 'Loading...'});
        } else {
            $ionicLoading.hide();
        }
    };

    $scope.searchDefinition = function() {
       $http.get('http://api.duckduckgo.com/?q=' + $("#answer").val() + '&format=json').then(function(resp) {
      //   alert(JSON.stringify(resp.data));
        var obj=JSON.parse(JSON.stringify(resp.data));

        $scope.definitions=obj.RelatedTopics;
        
        // var tempStr;
        // $.each(obj, function(key,value){
        //     tempStr +="<div class='item'><h2>" + value.Result + "</h2><p>" + value.Text + "</p></div>";
        // });
        // $("#deflist").html(tempStr);

      }, function(err) {
        alert(JSON.stringify(err));
        console.error('ERR', err);
        // err.status will contain the status code
      })
    };

    

 });