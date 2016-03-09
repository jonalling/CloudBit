/*global todomvc */
'use strict';

/**
 * Services that persists and retrieves TODOs from localStorage
*/
learning.factory('todoStorage', function () {

	// localStorage.clear();

	var STORAGE_ID = 'learning-adg';

	return {
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		put: function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		}
	};
});
