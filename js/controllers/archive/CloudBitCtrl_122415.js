/*global angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model
 * - exposes the model to the template and provides event handlers
 */
CloudBit.controller('CloudBitCtrl', function($scope, $http, $timeout, $window) {

$scope.fullWidth = $window.innerWidth;
$scope.fullHeight = $window.innerHeight;
$scope.width = angular.element(document.querySelector('#main'))[0].offsetWidth;
$scope.height = angular.element(document.querySelector('#main'))[0].offsetHeight;
// $scope.contentWidth = angular.element(document.querySelector('#content'))[0].offsetWidth;
// $scope.contentHeight = angular.element(document.querySelector('#content'))[0].offsetHeight;

var CLOUDBIT_ID = '00e04c03a088';
var ACCESS_TOKEN = '53e558de1fd850308124712268198380355693180c5ff428dc64cfaa69c488aa';
$scope.value = '';
$scope.timer = 300;
var mytimeout = null; // the current timeoutID

// timer method
$scope.onTimeout = function() {
	$scope.timer--;
	$scope.timerView = $scope.timer / 10;
	mytimeout = $timeout($scope.onTimeout, 100);
};
// starts timer
$scope.startTimer = function() {
	mytimeout = $timeout($scope.onTimeout, 100);
};
// stops and resets the current timer
$scope.stopTimer = function() {
	$timeout.cancel(mytimeout);
	$scope.timer = 300;
	$scope.timerView = null;
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

// $scope.click = function() {
//
// 	var req = {
// 		method: 'POST',
// 		url: 'https://api-http.littlebitscloud.cc/devices/' + CLOUDBIT_ID + '/output',
// 		headers: {
// 			'Authorization': 'Bearer ' + ACCESS_TOKEN,
// 			'Accept': 'application/vnd.littlebits.v2+json',
// 			'Content-Type': 'application/json'
// 		},
// 		data: JSON.stringify({
//       'percent': $scope.value,
//       'duration_ms': 500
//     })
// 	}
//
// 	$http(req).success(function(data) {
//     $scope.hello = data;
// 		console.log($scope.hello);
//   })
//
//
// 	////// MAKER IFTTT CHANNEL //////
// 	// var req = {
// 	// 	method: 'POST',
// 	// 	url: 'https://maker.ifttt.com/trigger/20percent/with/key/dxNDfUgPZlyz8tM1mp6mWV',
// 	// }
// 	//
// 	// $http(req).success(function(data, status) {
//   //   // $scope.hello = data;
//   // })
//
// }

}); // end controller
