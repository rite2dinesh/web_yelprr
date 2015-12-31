'use strict';

app.controller('AppController', function($scope, Auth, ionicMaterialInk, $state) {
$scope.currentUser = Auth.user;
	$scope.signedIn = Auth.signedIn;

  $scope.logout = function() {    
    Auth.logout();    
    //toaster.pop('success', "Logged out successfully");
    $state.transitionTo('/login');
  };
  ionicMaterialInk.displayEffect();
	
});