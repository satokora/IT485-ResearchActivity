angular.module('starter', ['ionic'])

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

.constant('ApiEndpoint', {
  url: 'http://localhost:8100/api'
})
.factory('Api', function($http, ApiEndpoint) {
  console.log('ApiEndpoint', ApiEndpoint)

  var getApiData = function() {
    return $http.get(ApiEndpoint.url + 'upload?key=0d00ed5dbdde0241c265eeed48e39730&large_area=Z011&genre=G006&night_view=1&show=1&wine=1&budget=B004&format=json')
      .then(function(data) {
        console.log('Got some data: ', data);
        console.log('Shops: ', data.data.results.shop);
        var cardTypes = [];
        $.each(data.data.results.shop, function(index, val) {
          console.log(val.photo.mobile.l);
            var obj = {
                image: val.photo.mobile.l,
                title: val.name,
                catchp: val.catch,
                mobile_access: val.mobile_access
            }
            
            cardTypes.push(obj);
            
        });

        return cardTypes;
        //return data;
      });
  };

  return {
    getApiData: getApiData
  };
})
;