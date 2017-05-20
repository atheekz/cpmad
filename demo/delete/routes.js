angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('cameraTabDefaultPage', {
    url: '/page2',
    templateUrl: 'templates/cameraTabDefaultPage.html',
    controller: 'cameraTabDefaultPageCtrl'
  })

  .state('cartTabDefaultPage', {
    url: '/page3',
    templateUrl: 'templates/cartTabDefaultPage.html',
    controller: 'cartTabDefaultPageCtrl'
  })

  .state('cloudTabDefaultPage', {
    url: '/page4',
    templateUrl: 'templates/cloudTabDefaultPage.html',
    controller: 'cloudTabDefaultPageCtrl'
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.home', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tabsController.dealers', {
    url: '/dealers',
    views: {
      'tab2': {
        templateUrl: 'templates/dealers.html',
        controller: 'dealersCtrl'
      }
    }
  })

  .state('tabsController.favorites', {
    url: '/favorites',
    views: {
      'tab3': {
        templateUrl: 'templates/favorites.html',
        controller: 'favoritesCtrl'
      }
    }
  })

  .state('tabsController.nearByMe', {
    url: '/nearByMe',
    views: {
      'tab4': {
        templateUrl: 'templates/nearByMe.html',
        controller: 'nearByMeCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signUp', {
    url: '/signUp',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })

  .state('tabsController.directions', {
    url: '/page11',
    views: {
      'tab1': {
        templateUrl: 'templates/directions.html',
        controller: 'directionsCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/nearByMe')


});