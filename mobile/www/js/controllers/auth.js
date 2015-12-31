app.controller('AuthController', function($scope, $location, toaster, Auth, ionicMaterialInk, $state, $ionicLoading, $ionicModal) {

  $scope.user = {name: '', email: '', password:''};
 
  $scope.errors = [];
  
	$ionicModal.fromTemplateUrl('views/terms-and-conditions.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.terms_and_conditions_modal = modal;
	});
	
	$ionicModal.fromTemplateUrl('views/privacy-policy.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.privacy_policy_model = modal;
	});
	
  //Auth.logout(); 
  if(Auth.signedIn()) { 
      $state.transitionTo('app.howcanwehelp');
  }

	$scope.register = function(user) {          
	$ionicLoading.show({ template: '<ion-spinner icon="spiral"></ion-spinner>' });
    Auth.register(user)
      .then(function() {
        //toaster.pop('success', "Registered successfully");
        $location.path('/howcanwehelp');
		$ionicLoading.hide();
      }, function(err) {
        errMessage(err);
		$ionicLoading.hide();
      });
	  
  };

	$scope.login = function(user) {
	
	$ionicLoading.show({ template: '<ion-spinner icon="spiral"></ion-spinner>' });
	
     Auth.login(user)
      .then(function() {
        //toaster.pop('success', "Logged in successfully");
        $location.path('/howcanwehelp');
		$ionicLoading.hide();
      }, function(err) {        
        errMessage(err);
		$ionicLoading.hide();
      });    
	  
	  
	};

	$scope.changePassword = function(user) {
     Auth.changePassword(user)
      .then(function() {                        
        
        // Reset form
        $scope.email = '';
        $scope.oldPass = '';
        $scope.newPass = '';

        toaster.pop('success', "Password changed successfully");
      }, function(err) {
        errMessage(err);      
      });
  };
  
  $scope.showModalTermsAndConditions = function(){
	$scope.terms_and_conditions_modal.show();
  }
  
  $scope.showModalPrivacyPolicy = function(){
	$scope.privacy_policy_model.show();
  }

	function errMessage(err) {

    var msg = "Unknown Error...";

    if(err && err.code) {
      switch (err.code) {
        case "EMAIL_TAKEN": 
          msg = "This email has been taken"; break;          
        case "INVALID_EMAIL": 
          msg = "Invalid email"; break;          
        case "NETWORK_ERROR": 
          msg = "Network error"; break;          
        case "INVALID_PASSWORD": 
          msg = "Invalid password"; break;          
        case "INVALID_USER":
          msg = "Invalid user"; break;                  
      } 
    }   

    //toaster.pop('error', msg);
	$scope.errors = [msg];
  };
  


	ionicMaterialInk.displayEffect();
});