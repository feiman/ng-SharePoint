/*
	SPFormRule - directive
	
	Pau Codina (pau.codina@kaldeera.com)
	Pedro Castro (pedro.castro@kaldeera.com, pedro.cm@gmail.com)

	Copyright (c) 2014
	Licensed under the MIT License
*/



///////////////////////////////////////
//	SPFormRule
///////////////////////////////////////

angular.module('ngSharePoint').directive('spformRule', 

	['$compile', '$templateCache', '$http', '$animate',

	function($compile, $templateCache, $http, $animate) {

		return {
			restrict: 'E',
			replace: 'element',
			scope: false,
			transclude: true,
			priority: 50,

			link: function ($scope, $element, $attrs, ctrl, $transclude) {

				if ($element.parent().length > 0) {

					if ($attrs.templateUrl) {

						$http.get($attrs.templateUrl, { cache: $templateCache }).success(function (html) {

							var newElement = $compile(html)($scope);
							$element.replaceWith(newElement);
							$element = newElement;

						});

					} else {

						$transclude($scope, function (clone) {

							for(var i = clone.length - 1; i >= 0; i--) {
								var e = clone[i];
								$animate.enter(e, $element.parent(), $element);
							}
						});

						$element.remove();
						$element = null;
					}
				}
			}
		};

	}

]);