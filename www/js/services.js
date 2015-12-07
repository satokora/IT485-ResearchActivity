angular.module('starter.services', [])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})


.factory('Camera', ['$q', function($q) {
 
  return {
    getPicture: function(options) {
      var q = $q.defer();
      
      navigator.camera.getPicture(function(result) {
        alert("result" + result);
       // q.resolve({
       //      name: result
       //  });
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        alert(err);
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  }
}])


// .constant('ApiEndpoint', {
//   url: 'http://api.newocr.com/v1'
// })

// .factory('Api', function($http, ApiEndpoint) {
//   console.log('ApiEndpoint', ApiEndpoint)

//   var getApiData = function(argument) {
//     alert(ApiEndpoint.url + '/ocr?key=d9557ab3ee9fe6750dca7c3aa70a9c6e&file_id=' + argument + '&page=1&lang=eng&psm=3');
//     return $http.get(ApiEndpoint.url + '/ocr?key=d9557ab3ee9fe6750dca7c3aa70a9c6e&file_id=07bf639bf78534678501cf2d6a3548c6&page=1&lang=eng&psm=3')
//       .then(function(data) {
//         console.log('Got some data: ', data);
//         console.log('Shops: ', data.data.text);
//         var ocrtext=data.data.text;
//         alert(ocrtext);

//         return ocrtext;
//         //return data;
//       });
//   };

//   return {
//     getApiData: getApiData
//   };
// })

// .factory('Api', function($http, $q, ApiEndpoint) {
//   alert('ApiEndpoint', ApiEndpoint)

//   var getApiData = function(argument) {
//     var q = $q.defer();

//     $http.get('http://api.newocr.com/v1/ocr?key=d9557ab3ee9fe6750dca7c3aa70a9c6e&file_id=' + argument + '&page=1&lang=eng&psm=3')
//     .success(function(data) {
//       alert('Got some data: '+ data)
//       q.resolve(data);
//     })
//     .error(function(error){
//       console.log('Had an error' + error)
//       q.reject(error);
//     })

//     return q.promise;
//   }

//   return {
//     getApiData: getApiData
//   };
// })
;