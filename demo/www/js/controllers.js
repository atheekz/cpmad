angular.module('app.controllers', [])
  
.controller('cameraTabDefaultPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {


}])

 .controller('directionsCtrl', ['$scope','$ionicPopup','$http', '$rootScope', '$log', '$state', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$ionicPopup, $http,  $rootScope, $log, $state,  $stateParams) {

console.log(   $rootScope.latroot+","+ $rootScope.lonroot);
 var map;
 var direction_golbal_variable_latlon;
  var infowindow = null;

  //directions
 var directionsService = new google.maps.DirectionsService();
     var directionsDisplay = new google.maps.DirectionsRenderer();
   
  function initialise() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var latlng = new google.maps.LatLng(7.0000,81.0000);
direction_golbal_variable_latlon=new google.maps.LatLng(7.0000,81.0000);
    var myOptions = {
      zoom: 4,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
     styles: [ 
     {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      { "visibility": "on" },
      { "weight": 1.6 },
      { "hue": "#2200ff" }
    ]
  },{
    "stylers": [
      { "hue": "#ff0022" }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "hue": "#00b2ff" }
    ]
  },{
    "featureType": "transit.station.rail",
    "stylers": [
      { "hue": "#1900ff" }
    ]
  },{
    "featureType": "transit.station.bus",
    "stylers": [
      { "hue": "#ffdd00" },
      { "lightness": 5 }
    ]
  },{
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      { "hue": "#b2ff00" }
    ]
  },{
    "featureType": "transit",
    "elementType": "geometry.fill",
    "stylers": [
      { "hue": "#a1ff00" }
    ]
  }
  , 
  //hide 
  {
    featureType: 'poi.business',
    elementType: 'labels',
    stylers: [
      { 'visibility': 'off' }
    ]
  }
  ]
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    prepareGeolocation();
    doGeolocation();
  //directions
   //directionsDisplay.setMap(map);
    directionsDisplay.setMap(map);
     directionsDisplay.setPanel(document.getElementById('panel'));

     //test
     test();
     //test
  }
function test(){
 var datai = { 'name' : ''};
   $http.post('http://localhost:3000/get/v1/getDetails', datai)
                    .success(function(data, status, headers, config)
                    {
                        console.log(status + ' - ' +data );
                        console.log(data);
                     
                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });

}
  function doGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
    } else {
      positionError(-1);
    }
  }

  function positionError(err) {
    var msg;
    switch(err.code) {
      case err.UNKNOWN_ERROR:
        msg = "Unable to find your location";
        break;
      case err.PERMISSION_DENINED:
        msg = "Permission denied in finding your location";
        break;
      case err.POSITION_UNAVAILABLE:
        msg = "Your location is currently unknown";
        break;
      case err.BREAK:
        msg = "Attempt to find location took too long";
        break;
      default:
        msg = "Location detection not supported in browser";
    }
   // document.getElementById('info').innerHTML = msg;
  }

  function positionSuccess(position) {
    // Centre the map on the new location
    var coords = position.coords || position.coordinate || position;
  if(position.coords.latitude==6.9270786 && position.coords.longitude==79.861243){
      var latLng = new google.maps.LatLng(7.2940167594260,80.633624023437);
direction_golbal_variable_latlon= new google.maps.LatLng(7.2940167594260,80.633624023437);
    }
    else{
     var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
  direction_golbal_variable_latlon= new google.maps.LatLng(coords.latitude, coords.longitude);}
    map.setCenter(latLng);
  map.setZoom(14);
    var cmarker = new google.maps.Marker({
      map: map,
      position: latLng,
     animation: google.maps.Animation.BOUNCE,
     icon:'./icons/walking-tour.png',
     title: 'Your Current location'
    });
  
  cmarker.setMap(map);
  
   //ADD Marker
                                                        addMarkerFinal($rootScope.latroot,$rootScope.lonroot,map);/*addM(7.317426,80.629456,map,Uluru Restaurant,1521 1st Ave, Seattle, WA);*/  
  
  
  
    document.getElementById('info').innerHTML = 'Looking for <b>' +
        coords.latitude + ', ' + coords.longitude + '</b>...';

    // And reverse geocode.
    (new google.maps.Geocoder()).geocode({latLng: latLng}, function(resp) {
      var place = "You're around here somewhere!";
      if (resp[0]) {
        var bits = [];
        for (var i = 0, I = resp[0].address_components.length; i < I; ++i) {
          var component = resp[0].address_components[i];
          if (contains(component.types, 'political')) {
            bits.push('<b>' + component.long_name + '</b>');
          }
        }
        if (bits.length) {
          place = bits.join(' > ');
        }
        marker.setTitle(resp[0].formatted_address);
      }
      document.getElementById('info').innerHTML = place;
    });
  }

  function contains(array, item) {
    for (var i = 0, I = array.length; i < I; ++i) {
      if (array[i] == item) return true;
    }
    return false;
  }
  
function addMarker(lat, lng, maps,con,comment_url,type) {
   
   var contentString=con;
  
  
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lng),
        title: ' '+type+' ',
    icon:'./icons/'+type+'.png',
    animation: google.maps.Animation.DROP
    });
  
    marker.setMap(maps);
    
  
      google.maps.event.addListener(marker, 'click', function() {
   if (infowindow) infowindow.close();
            infowindow = new google.maps.InfoWindow({
            content: contentString
          });
  
    
    infowindow.open(maps,marker);
  calcRoute(lat,lng);
  //load_commennts(comment_url);
  });
                        
}
function addMarkerFinal(lat, lng, maps) {
   
  // var contentString=con;
  
  
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lng),
        title: ' Offer ',
    icon:'./icons/star.png',
    animation: google.maps.Animation.DROP
    });
  
    marker.setMap(maps);
    
   calcRoute(lat,lng);
  /*    google.maps.event.addListener(marker, 'click', function() {
   if (infowindow) infowindow.close();
            infowindow = new google.maps.InfoWindow({
            content: contentString
          });
  
    
    infowindow.open(maps,marker);
  calcRoute(lat,lng);
  //load_commennts(comment_url);
  });
      */                  
}


 //directions
  function calcRoute(lat,lon) {
    var start = map.getCenter();
  //var start = document.getElementById('start').value;
  //var end = document.getElementById('end').value;
  var request = {
    
       
     origin:direction_golbal_variable_latlon,
     destination:new google.maps.LatLng(lat,lon),//7.2964° N, 80.6350
       travelMode: google.maps.DirectionsTravelMode.DRIVING
     };

     directionsService.route(request, function(response, status) {
       if (status == google.maps.DirectionsStatus.OK) {
         directionsDisplay.setDirections(response);
       }
     else
     {alert(":(")}
     });
  } 
  
   function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }
  
  function clearWaypoints() {
    markers = [];
    origin = null;
    destination = null;
    waypoints = [];
    directionsVisible = false;
  }
   function reset() {
    clearMarkers();
    clearWaypoints();
    directionsDisplay.setMap(null);
    directionsDisplay.setPanel(null);
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));    
  }
 

initialise();

}])
   
.controller('cartTabDefaultPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {


}])
   
.controller('cloudTabDefaultPageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {


}])
      
.controller('mENUCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {


}])
   
.controller('homeCtrl', ['$scope','$ionicPopup','$http', '$rootScope', '$log', '$state', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$ionicPopup, $http,  $rootScope, $log, $state,  $stateParams) {



  $scope.gotto = function(lat,lon) {

    $rootScope.latroot =lat;
      $rootScope.lonroot =lon;
               $state.go('tabsController.directions');
         

     // $state.go('home');
    
  };  


}])
   
.controller('dealersCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {


}])
   
.controller('favoritesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {


}])
   
.controller('nearByMeCtrl', ['$scope', '$stateParams','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {
/*function initialize() {
    var latlng = new google.maps.LatLng(7.2905714999999995,80.6337262);
    var myOptions = {
        zoom: 8,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);
    $scope.map=map;


google.maps.event.addDomListener(window, "load", initialize);
}
initialize();*/
//satrt
/*     $http.post('backend/register.php', datai)
                    .success(function(data, status, headers, config)
                    {
                        
                        console.log(status + ' - ' +data );
                        console.log(data);
                          

                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });

*/
 var map;
 var direction_golbal_variable_latlon;
  var infowindow = null;

  //directions
 var directionsService = new google.maps.DirectionsService();
     var directionsDisplay = new google.maps.DirectionsRenderer();
   
  function initialise() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var latlng = new google.maps.LatLng(7.0000,81.0000);
direction_golbal_variable_latlon=new google.maps.LatLng(7.0000,81.0000);
    var myOptions = {
      zoom: 4,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
     styles: [ 
     {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      { "visibility": "on" },
      { "weight": 1.6 },
      { "hue": "#2200ff" }
    ]
  },{
    "stylers": [
      { "hue": "#ff0022" }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "hue": "#00b2ff" }
    ]
  },{
    "featureType": "transit.station.rail",
    "stylers": [
      { "hue": "#1900ff" }
    ]
  },{
    "featureType": "transit.station.bus",
    "stylers": [
      { "hue": "#ffdd00" },
      { "lightness": 5 }
    ]
  },{
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      { "hue": "#b2ff00" }
    ]
  },{
    "featureType": "transit",
    "elementType": "geometry.fill",
    "stylers": [
      { "hue": "#a1ff00" }
    ]
  }
  , 
  //hide 
  {
    featureType: 'poi.business',
    elementType: 'labels',
    stylers: [
      { 'visibility': 'off' }
    ]
  }
  ]
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    prepareGeolocation();
    doGeolocation();
  //directions
   //directionsDisplay.setMap(map);
    directionsDisplay.setMap(map);
     directionsDisplay.setPanel(document.getElementById('panel'));

     //test
     test();
     //test
  }
function test(){
 var datai = { 'name' : ''};
   $http.post('http://localhost:3000/get/v1/getDetails', datai)
                    .success(function(data, status, headers, config)
                    {
                        console.log(status + ' - ' +data );
                        console.log(data);
                     
                    })
                    .error(function(data, status, headers, config)
                    {
                        console.log('error');
                    });

}
  function doGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
    } else {
      positionError(-1);
    }
  }

  function positionError(err) {
    var msg;
    switch(err.code) {
      case err.UNKNOWN_ERROR:
        msg = "Unable to find your location";
        break;
      case err.PERMISSION_DENINED:
        msg = "Permission denied in finding your location";
        break;
      case err.POSITION_UNAVAILABLE:
        msg = "Your location is currently unknown";
        break;
      case err.BREAK:
        msg = "Attempt to find location took too long";
        break;
      default:
        msg = "Location detection not supported in browser";
    }
   // document.getElementById('info').innerHTML = msg;
  }

  function positionSuccess(position) {
    // Centre the map on the new location
    var coords = position.coords || position.coordinate || position;
  if(position.coords.latitude==6.9270786 && position.coords.longitude==79.861243){
      var latLng = new google.maps.LatLng(7.2940167594260,80.633624023437);
direction_golbal_variable_latlon= new google.maps.LatLng(7.2940167594260,80.633624023437);
    }
    else{
     var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
  direction_golbal_variable_latlon= new google.maps.LatLng(coords.latitude, coords.longitude);}
    map.setCenter(latLng);
  map.setZoom(14);
    var cmarker = new google.maps.Marker({
      map: map,
      position: latLng,
     animation: google.maps.Animation.BOUNCE,
     icon:'./icons/walking-tour.png',
     title: 'Your Current location'
    });
  
  cmarker.setMap(map);
  
   //ADD Marker
                                                        addMarker(7.317426,80.629456,map,"<div id='iw-container'><div class='iw-title'>Uluru Restaurant</div><div class='iw-content'> <div class='iw-subTitle'>restaurant</div><img src='./icons/demorestu.jpg' alt='./icons/demorestu.jpg' style='width:150px;height:150px;'> <p> also referred to as Ayers Rock, is one one of the most popular restaurants in kandy </p><div class='iw-subTitle'>Contacts</div><p>Phone. +941234567<br>e-mail: demo@vaa.pt<br>www:<a href='https://www.google.lk/?gws_rd=ssl'>www.demo.com </a></p></div><div class='iw-bottom-gradient'></div></div>","comment_copy_test.php?name=Uluru_Restaurant","restaurant");/*addM(7.317426,80.629456,map,Uluru Restaurant,1521 1st Ave, Seattle, WA);*/                              addMarker(7.314425,80.632309,map,"<div id='iw-container'><div class='iw-title'>The Melting Pot</div><div class='iw-content'> <div class='iw-subTitle'>restaurant</div><img src='./icons/sd.jpg' alt='Uluru Restaurant' style='width:150px;height:150px;'> <p></p><div class='iw-subTitle'>Contacts</div><p><a href=''></a></p></div><div class='iw-bottom-gradient'></div></div>","","restaurant");/*addM(7.314425,80.632309,map,The Melting Pot,14 Mercer St, Seattle, WA);*/                              addMarker(7.310616,80.635139,map,"<div id='iw-container'><div class='iw-title'>Ipanema Grill</div><div class='iw-content'> <div class='iw-subTitle'>restaurant</div><img src='./icons/4.jpg' alt='Uluru Restaurant' style='width:150px;height:150px;'> <p></p><div class='iw-subTitle'>Contacts</div><p><a href=''></a></p></div><div class='iw-bottom-gradient'></div></div>","","restaurant");/*addM(7.310616,80.635139,map,Ipanema Grill,1225 1st Ave, Seattle, WA);*/                             addMarker(7.288990,80.630142,map,"<div id='iw-container'><div class='iw-title'>Crab Pot</div><div class='iw-content'> <div class='iw-subTitle'>restaurant</div><img src='' alt='Uluru Restaurant' style='width:150px;height:150px;'> <p></p><div class='iw-subTitle'>Contacts</div><p><a href=''></a></p></div><div class='iw-bottom-gradient'></div></div>","comment_copy_test.php?name=Crab_Pot","restaurant");/*addM(7.288990,80.630142,map,Crab Pot,1301 Alaskan Way, Seattle, WA);*/                             addMarker(7.308998,80.639557,map,"<div id='iw-container'><div class='iw-title'>Piroshky Piroshky</div><div class='iw-content'> <div class='iw-subTitle'>restaurant</div><img src='' alt='Uluru Restaurant' style='width:150px;height:150px;'> <p></p><div class='iw-subTitle'>Contacts</div><p><a href=''></a></p></div><div class='iw-bottom-gradient'></div></div>","","restaurant");/*addM(7.308998,80.639557,map,Piroshky Piroshky,1908 Pike pl, Seattle, WA);*/   map.setCenter(latLng); 
  
  
  
  
  
    document.getElementById('info').innerHTML = 'Looking for <b>' +
        coords.latitude + ', ' + coords.longitude + '</b>...';

    // And reverse geocode.
    (new google.maps.Geocoder()).geocode({latLng: latLng}, function(resp) {
      var place = "You're around here somewhere!";
      if (resp[0]) {
        var bits = [];
        for (var i = 0, I = resp[0].address_components.length; i < I; ++i) {
          var component = resp[0].address_components[i];
          if (contains(component.types, 'political')) {
            bits.push('<b>' + component.long_name + '</b>');
          }
        }
        if (bits.length) {
          place = bits.join(' > ');
        }
        marker.setTitle(resp[0].formatted_address);
      }
      document.getElementById('info').innerHTML = place;
    });
  }

  function contains(array, item) {
    for (var i = 0, I = array.length; i < I; ++i) {
      if (array[i] == item) return true;
    }
    return false;
  }
  
function addMarker(lat, lng, maps,con,comment_url,type) {
   
   var contentString=con;
  
  
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lng),
        title: ' '+type+' ',
    icon:'./icons/'+type+'.png',
    animation: google.maps.Animation.DROP
    });
  
    marker.setMap(maps);
  
      google.maps.event.addListener(marker, 'click', function() {
   if (infowindow) infowindow.close();
            infowindow = new google.maps.InfoWindow({
            content: contentString
          });
  
    
    infowindow.open(maps,marker);
  calcRoute(lat,lng);
  //load_commennts(comment_url);
  });
                        
}


 //directions
  function calcRoute(lat,lon) {
    var start = map.getCenter();
  //var start = document.getElementById('start').value;
  //var end = document.getElementById('end').value;
  var request = {
    
       
     origin:direction_golbal_variable_latlon,
     destination:new google.maps.LatLng(lat,lon),//7.2964° N, 80.6350
       travelMode: google.maps.DirectionsTravelMode.DRIVING
     };

     directionsService.route(request, function(response, status) {
       if (status == google.maps.DirectionsStatus.OK) {
         directionsDisplay.setDirections(response);
       }
     else
     {alert(":(")}
     });
  } 
  
   function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }
  
  function clearWaypoints() {
    markers = [];
    origin = null;
    destination = null;
    waypoints = [];
    directionsVisible = false;
  }
   function reset() {
    clearMarkers();
    clearWaypoints();
    directionsDisplay.setMap(null);
    directionsDisplay.setPanel(null);
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));    
  }
 

initialise();
   //end



}])
   
.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('signUpCtrl', ['$scope','$ionicPopup','$http', '$rootScope', '$log', '$state', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$ionicPopup, $http,  $rootScope, $log, $state,  $stateParams) {

 /* $scope.user = {
    username: '',
    password : ''
  };*/
        $scope.authorization = {
    username: '',
    email:'',
    password : '' ,
    password2 : ''  
  };  

$scope.Validate = function() {

            var alertPopup = $ionicPopup.alert({
              title: 'Dont eat that!',
              template: 'It might taste good'
            });
            alertPopup.then(function(res) {
             // console.log('Thank you for not eating my delicious ice cream cone');
             
            });

  };

            $scope.PassMiss = function() {

            var alertPopup = $ionicPopup.alert({
              title: 'Try agin',
              template: 'Passwords don\'t match '
            });
            alertPopup.then(function(res) {
             // console.log('Thank you for not eating my delicious ice cream cone');
             
            });  };

  $scope.signIn = function(form) {
    if(form.$valid) {
          if($scope.authorization.password == $scope.authorization.password2){

              $scope.Validate();
              console.log($scope.authorization);
               $state.go('login');
          }
          else{
 $scope.PassMiss();
          }
     // $state.go('home');
    }
  };  

}])
 

