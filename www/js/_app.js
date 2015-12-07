// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // if(window.cordova && window.cordova.plugins.Keyboard) {
    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    // }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// .controller('MainCtrl', function($scope, Camera) {

//   $scope.getPhoto = function() {
//     Camera.getPicture().then(function(imageURI) {
//       console.log(imageURI);
//       alert(imageURI);
//       $scope.lastPhoto = imageURI;
//     }, function(err) {
//       alert(err);
//       console.err(err);
//     }, {
//       quality: 20,
//       targetWidth: 300,
//       targetHeight: 300,
//       destinationType: Camera.DestinationType.FILE_URI,
//       saveToPhotoAlbum: false
//     });
//   };

// })

.controller("MainCtrl", function ($scope, $cordovaCamera) {

                $scope.getPhoto = function () {
                  var options = {
                    quality: 20,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.lastPhoto = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
                
                // $scope.choosePhoto = function () {
                //   var options = {
                //     quality: 75,
                //     destinationType: Camera.DestinationType.DATA_URL,
                //     sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                //     allowEdit: true,
                //     encodingType: Camera.EncodingType.JPEG,
                //     targetWidth: 300,
                //     targetHeight: 300,
                //     popoverOptions: CameraPopoverOptions,
                //     saveToPhotoAlbum: false
                // };
   
                //     $cordovaCamera.getPicture(options).then(function (imageData) {
                //         $scope.imgURI = "data:image/jpeg;base64," + imageData;
                //     }, function (err) {
                //         // An error occured. Show a message to the user
                //     });
                // }
                

            });