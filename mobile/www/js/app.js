'use strict';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'microjob' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'microjob.services' is found in services.js
// 'microjob.controllers' is found in controllers.js
var app = angular.module('microjob', [
        'ionic',
        //'microjob.controllers',
        //'microjob.services',
        //'microjob.directives',
        //'starter.views',
        //'underscore',
        'ionic-material',
        'ionMdInput',
		'firebase',
		'ngAnimate',    
		'ngResource',
		'ngRoute',    
		'toaster',
		'angularMoment'
    ])
    .constant('FURL', 'https://task-ninja.firebaseio.com/')
    .run(function($ionicPlatform, $rootScope, $timeout, $ionicConfig, $location, $state) {
		// $ionicPlatform.ready(function() {
		// 	// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// 	// for form inputs)
		// 	if (window.cordova && window.cordova.plugins.Keyboard) {
		// 		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		// 	}
		// 	if (window.StatusBar) {
		// 		// org.apache.cordova.statusbar required
		// 		StatusBar.styleDefault();
		// 	}
		// });
	
		$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
		 console.log("$stateChangeError", error);
		
		  // We can catch the error thrown when the $requireAuth promise is rejected
		  // and redirect the user back to the login page
		  if (error === "AUTH_REQUIRED") {
			$state.go('/login');
		  }
		  
		});
	})  
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'views/menu.html',
				controller: 'AppController'
			})
		  .state('/welcome', {
			  url: '/welcome',
			  templateUrl: "views/welcome.html",
			  controller: 'AuthController'
		  })
		  .state('/register', {
			url: '/register',
			templateUrl: 'views/register.html',
			controller: 'AuthController',
		  })
		  .state('/login', {
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'AuthController'
		  })
		  .state('app.howcanwehelp', {
			url: '/howcanwehelp',
			cache: false,
			views: {
			'menuContent': {
					templateUrl: 'views/how-can-we-help.html',
					controller: 'AppController'
				}
			},
			/*resolve: {
			  currentAuth: function(Auth) {
				return Auth.requireAuth();
			  }
			}*/
		  })
		  .state('app.browse', {
			url: '/browse',
			cache: false,
			views: {
			'menuContent': {
					templateUrl: 'views/browse.html',
					controller: 'BrowseController'     
				}
			},
			
		  })
		  .state('/browse/:taskId', {
			url: '/browse/:taskId',
			templateUrl: 'views/browse.html',
			controller: 'BrowseController'
		  })		  
		  .state('app.dashboard', {
			url: '/dashboard',
			templateUrl: 'views/dashboard.html',
			controller: 'DashboardController',
			resolve: {
			  currentAuth: function(Auth) {
				return Auth.requireAuth();
			  }
			}
		  })
		  
		  $urlRouterProvider.otherwise('/welcome');
	  });
