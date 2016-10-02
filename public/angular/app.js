(function() {
	var app = angular.module('myApp', ['ngRoute', 'ngFileUpload']);
	//Angular Routes
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/test', {
				templateUrl : 'angular/views/test.html',
				controller : 'TestingController'
			})
			.when('/', {
				templateUrl: 'angular/views/home.html',
				controller: 'MainController'
			})
			.when('/login', {
				templateUrl: 'angular/views/Login.html',
				controller: 'LoginController'
			})
			.when('/register', {
				templateUrl: 'angular/views/register.html',
				controller: 'RegController'
			})
			
			.when('/appliedJobs', {
				templateUrl: 'angular/views/appliedJobs.html',
				controller: 'AppliedJobbsController'
			})
			.when('/profile', {
				templateUrl: 'angular/views/myprofile.html',
				controller: 'MyProfileController'
			})
			.when('/itjobs', {
				templateUrl: 'angular/views/itjobs.html',
				controller: 'ItController'
			})
			.when('/engineeringjobs', {
				templateUrl: 'angular/views/enggJobs.html',
				controller: 'EnggController'
			})
			.when('/governmentjobs', {
				templateUrl: 'angular/views/govtJobs.html',
				controller: 'GovtController'
			})
			.when('/logout', {
				templateUrl : 'angular/views/login.html',
				controller : 'LogoutController'
			})
			// .when('/profile',
			// 	templateUrl : 'angular/views/profile.html',
			// 	controller : 'MainController')	
			//Otherwise redirect to error page
			.otherwise({
				redirectTo: '/'
			});
	}]);
	app.run(['$rootScope', '$location', function($rootScope, $location) {

		// $rootScope.$on("$routeChangeStart", function(eve, next, cur){
		// 	debugger;
		// 	if(!$rootScope.isLoggedIn &&  next.$$route.originalPath !=="/register"){
		// 		$location.path('/login');
		// 	}
		// })

		$rootScope.user = JSON.parse(localStorage.userinfo);
		$rootScope.isLoggedIn = sessionStorage.isLoggedIn || false;
		$rootScope.name = sessionStorage.loggedinname || "";
		$rootScope.logosrc = "images/logo2.png";
		$rootScope.categories = [{
			"category": "Home",
			"url": "/"
		}, {
			"category": "My Profile",
			"url": "/profile"
		}, {
			"category": "IT Jobs",
			"url": "itjobs"
		}, {
			"category": "Engineering Jobs",
			"url": "engineeringjobs"
		}, {
			"category": "Government Jobs",
			"url": "governmentjobs"
		}]

		$rootScope.matter = [];
		$rootScope.home = [{
			"menu": "Home"
		}, {
			"menu": "government jobs"
		}, {
			"menu": "IT Jobs"
		}, {
			"menu": "Engineering Jobs"
		}, {
			"menu": "My Profile"
		}, {
			"menu": "Applied Jobs"
		}];
		$rootScope.useful = [{
			"menu": "Terms of use"
		}, {
			"menu": "privcy Polecy"
		}, {
			"menu": " inventore natus ullam eum"
		}, {
			"menu": "consectetur adipisicing elit"
		}, {
			"menu": "Frequently Asked Questions"
		}];
		$rootScope.contact = [{
			"address": "12 Segun Bagicha, 10th Floor",
			"icon": "fa fa-home"
		}, {
			"address": "+880-12345678",
			"icon": "fa fa-phone"
		}, {
			"address": "info@mail.com",
			"icon": "fa fa-globe"
		}, {
			"address": "www.web.com",
			"icon": "fa fa-map-marker"
		}];
		$rootScope.taags = [{
			"menu": "Design"
		}, {
			"menu": "User Interface"
		}, {
			"menu": "Graphics"
		}, {
			"menu": "Web Design"
		}, {
			"menu": "Development"
		}, {
			"menu": "ASP .NET"
		}, {
			"menu": "Bootstrap"
		}, {
			"menu": "Joomla"
		}, {
			"menu": "SEO"
		}, {
			"menu": "Wordepress"
		}];

	}]);


	app.controller('AppliedJobbsController', ['$scope', 'MyService', function($scope, Myservice) {

	}]);

	app.controller('MyProfileController', ['$rootScope', '$location', '$scope', 'MyService', function($rootScope, $location, $scope, MyService) {
		
		$scope.profile = $rootScope.user;

		$scope.updateProfile = function(profile){
			MyService.update(profile).then(function(response){
				console.log("successfully updated : ", response);
			},
			function(err){
				console.log("error : ", err);
			})
		}


		$scope.deleteProfile = function(profileid){
			MyService.delete({"_id":profileid}).then(function(response){
				console.log("successfully deleted : ", response);
		sessionStorage.clear();
		$rootScope.name = "";
		$rootScope.isLoggedIn = false;
		$location.path('/login');
	
			},
			function(err){
				console.log("error : ", err);
			})
		}
		
	console.log("data : ", $scope.profile);

	}]);

	app.controller('MainController', ['$scope', function($scope) {
	}]);
	app.controller('TestingController', ['Upload','$window', '$scope', function(Upload,$window, $scope){
    $scope.submit = function(){ //function to call on form submit
        if ($scope.upload_form.file.$valid && $scope.file) { //check if from is valid
            $scope.upload($scope.file); //call upload function
        }
    }
    
    $scope.upload = function (file) {
    	console.log(file.name);
    	file.filename = file.name;
        Upload.upload({
            url: 'http://localhost:3000/api/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model,
            
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };
}]);
	
	app.controller('RegController', ['$scope', '$location', '$rootScope','MyService', function($scope, $location, $rootScope, MyService){
		$scope.title = "registration";
		$scope.registration = function(data) {
			console.log("registration funtion called", data);
			MyService.saveuser(data).then(function successful(response){
				localStorage.userinfo = JSON.stringify(data);
				$rootScope.isLoggedIn = true;
				$rootScope.name = data.firstname+' '+data.lastname;
				sessionStorage.isLoggedIn = true;
				$location.path('/');
				sessionStorage.loggedinid = response._id;
				sessionStorage.loggedinname = data.firstname+' '+data.lastname;
			},
			function failure(err){
				console.log("somme error while creating your profile");
			})

		}

	}])

	app.controller('LogoutController', ['$scope', '$rootScope', '$location', 'MyService', function($scope, $rootScope, $location, MyService){

		debugger;
		sessionStorage.clear();
		$rootScope.name = "";
		$rootScope.isLoggedIn = false;
		$location.path('/login');
	

	}])

	app.controller('LoginController', ['$scope', '$rootScope', '$location', 'MyService', function($scope, $rootScope, $location,  MyService) {

		$scope.title = "Login";

		$scope.validate = function(user) {
			MyService.fetchuser(user).then(function Success(response){
				if(user.emailid == response.data.emailid && user.password == response.data.password){

				localStorage.userinfo = JSON.stringify(response.data);
				$rootScope.isLoggedIn = true;
				$rootScope.user = response.data;
				sessionStorage.isLoggedIn = true;
				$location.path('/');
				sessionStorage.loggedinid = response._id;
				sessionStorage.loggedinname = response.data.firstname+' '+response.data.lastname;
				}
				else{
					$scope.alert = true;
				}
			},
			function(error){
				$scope.alert = true;
			})
		}
	}]);

	app.controller('ItController', ['$scope', 'MyService', function($scope, MyService) {
		MyService.getItJobList().then(function(response) {
				console.log(response.data);
				$scope.itjobs = response.data;
			},
			function(err) {
				console.log(err);
			}
		);

	}]);

	app.controller('GovtController', ['$scope', 'MyService', function($scope, MyService) {
		MyService.getGovtJobList().then(function(response) {
				console.log(response);
				$scope.govtjobs = response.data;
			},
			function(err) {
				console.log(err);
			}
		);

	}]);
	app.controller('EnggController', ['$scope', 'MyService', function($scope, MyService) {
		MyService.getEnggJobList().then(function(response) {
				console.log(response);
				$scope.enggjobs = response.data;
			},
			function(err) {
				console.log(err);
			}
		);
	}]);


	app.directive('jobList', function() {
		var directive = {
			restrict: 'E',
			templateUrl: '/angular/views/job.html',
			scope: {
				job: "=item",
				title: "@jobtitle",
				alertMe: "&alertMe"
			}
		}
		return directive;
	});

	app.factory('MyService', ['$http', function($http) {
		var service = {};

		service.delete = function(profileid){
			return $http.post('/api/delete', profileid);
		}

		service.update = function(profile){
			return $http.post('/api/update', profile);
		}

		service.upload = function(data){
			return $http.post('/api/upload', data);
		}

		service.fetchuser = function(data){
			return $http.post('/api/login', data);
		}

		service.getItJobList = function() {
			return $http({
				method: "GET",
				url: '/api/itjobs',
			});
		}
		service.getEnggJobList = function() {
			return $http({
				method: "GET",
				url: '/api/enggjobs',
			});
		}
		service.getGovtJobList = function() {
			return $http({
				method: "GET",
				url: '/api/govtjobs',
			});
		}

		service.saveuser = function(data){
			return $http({
				method : "POST",
				url : '/api/register',
				data : data
			})
		}

		return service;


	}]);

})();