(function(){
	const app = angular.module('appWiki', []);
	// Allowed URLs
	app.config(function($sceDelegateProvider) {
		$sceDelegateProvider.resourceUrlWhitelist([
			// Allow same origin resource loads.
			'self',
			'https://en.wikipedia.org/**'
		]);
	});
	// Controller functions
	app.controller('ctrlWiki', function($scope, $http) {
		$scope.searchWiki = function(){
			$scope.results = [];
			if ($scope.searchWikiInput){
				const httpRequest = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + $scope.searchWikiInput;
				$http.jsonp(httpRequest, {callback:"JSON_CALLBACK"})
					.then(function(data) {
					const res = data.data.query.pages;
					angular.forEach(res, function(i){
						$scope.results.push({
							articleTitle: i.title,
							articleText: i.extract,
							articleLink: i.pageid
						});
					})
				});
			}
		}
	});
})()