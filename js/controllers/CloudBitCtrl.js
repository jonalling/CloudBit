/*global angular */
'use strict';

CloudBit.controller('CloudBitCtrl', function($scope, $http, $timeout, $window) {

$timeout( function(){
	$scope.fullWidth = $window.innerWidth;
	$scope.fullHeight = $window.innerHeight;
	$scope.width = angular.element(document.querySelector('#main'))[0].offsetWidth;
	$scope.height = angular.element(document.querySelector('#main'))[0].offsetHeight;
}, 1000);


var CLOUDBIT_ID = '00e04c03a088';
var ACCESS_TOKEN = '53e558de1fd850308124712268198380355693180c5ff428dc64cfaa69c488aa';
$scope.value = '';
$scope.timerSet = 300;
$scope.timer = $scope.timerSet;
$scope.timerView = $scope.timer / 10;
$scope.barHeight = 0;
var mytimeout = null; // the current timeoutID

// timer method
$scope.onTimeout = function() {
	$scope.timer--;
	$scope.timerView = $scope.timer / 10;
	$scope.barHeight = $scope.height * (1 - ($scope.timer/$scope.timerSet));
	mytimeout = $timeout($scope.onTimeout, 100);
};
// starts timer
$scope.startTimer = function() {
	mytimeout = $timeout($scope.onTimeout, 100);
};
// stops the current timer
$scope.stopTimer = function() {
	$timeout.cancel(mytimeout);
};
// resets the current timer
$scope.resetTimer = function() {
	$timeout.cancel(mytimeout);
	$scope.timer = $scope.timerSet;
	$scope.timerView = $scope.timer / 10;;
	$scope.barHeight = 0;
};

$scope.$watch('timer', function(val) {
	if ($scope.timer == 100) {
		$scope.tenLeft();
		// console.log('10 left');
	}
	if ($scope.timer == 0) {
		$scope.finish();
		$scope.stopTimer();
	}
});

// $scope.slider2 = {val:30};

$scope.go = function() {

	var req = {
		method: 'POST',
		url: 'https://api-http.littlebitscloud.cc/devices/' + CLOUDBIT_ID + '/output',
		headers: {
			'Authorization': 'Bearer ' + ACCESS_TOKEN,
			'Accept': 'application/vnd.littlebits.v2+json',
			'Content-Type': 'application/json'
		},
		data: JSON.stringify({
      'percent': 10,
      'duration_ms': 500
    })
	}

	$http(req).success(function(data) {
    $scope.hello = data;
		console.log($scope.hello);
		$scope.startTimer();
  })

}

$scope.stop = function() {

	var req = {
		method: 'POST',
		url: 'https://api-http.littlebitscloud.cc/devices/' + CLOUDBIT_ID + '/output',
		headers: {
			'Authorization': 'Bearer ' + ACCESS_TOKEN,
			'Accept': 'application/vnd.littlebits.v2+json',
			'Content-Type': 'application/json'
		},
		data: JSON.stringify({
      'percent': 20,
      'duration_ms': 500
    })
	}

	$http(req).success(function(data) {
    $scope.hello = data;
		console.log($scope.hello);
		$scope.stopTimer();
  })

}

$scope.reset = function() {

	var req = {
		method: 'POST',
		url: 'https://api-http.littlebitscloud.cc/devices/' + CLOUDBIT_ID + '/output',
		headers: {
			'Authorization': 'Bearer ' + ACCESS_TOKEN,
			'Accept': 'application/vnd.littlebits.v2+json',
			'Content-Type': 'application/json'
		},
		data: JSON.stringify({
      'percent': 20,
      'duration_ms': 500
    })
	}

	$http(req).success(function(data) {
    $scope.hello = data;
		console.log($scope.hello);
		$scope.resetTimer();
  })

}

$scope.tenLeft = function() {

	var req = {
		method: 'POST',
		url: 'https://api-http.littlebitscloud.cc/devices/' + CLOUDBIT_ID + '/output',
		headers: {
			'Authorization': 'Bearer ' + ACCESS_TOKEN,
			'Accept': 'application/vnd.littlebits.v2+json',
			'Content-Type': 'application/json'
		},
		data: JSON.stringify({
      'percent': 30,
      'duration_ms': 500
    })
	}

	$http(req).success(function(data) {
    $scope.hello = data;
		console.log($scope.hello);
		console.log('10 seconds left');

  })

}

$scope.finish = function() {

	var req = {
		method: 'POST',
		url: 'https://api-http.littlebitscloud.cc/devices/' + CLOUDBIT_ID + '/output',
		headers: {
			'Authorization': 'Bearer ' + ACCESS_TOKEN,
			'Accept': 'application/vnd.littlebits.v2+json',
			'Content-Type': 'application/json'
		},
		data: JSON.stringify({
      'percent': 40,
      'duration_ms': 500
    })
	}

	$http(req).success(function(data) {
    $scope.hello = data;
		console.log($scope.hello);
		console.log('finish');
  })

}

}); // end controller
