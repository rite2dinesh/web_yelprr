'use strict';

app.controller('NavController', function($scope, $location, toaster, Auth) {

	$scope.currentUser = Auth.user;
	$scope.signedIn = Auth.signedIn;

  $scope.logout = function() {    
  alert("asdasd");
    Auth.logout();    
    //toaster.pop('success', "Logged out successfully");
    $state.transitionTo('/login');
  };
	
});