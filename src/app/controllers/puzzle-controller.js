(function () {

	var app = angular.module("SlideTilePuzzle");

	app.controller("PuzzleController", ["$scope", "PuzzleMethods", function($scope, PuzzleMethods){

		var tiles  = 4,
			start = null,
			tick;

		$scope.data      = PuzzleMethods.getData(tiles, true);
		$scope.movements = 0;
		$scope.time      = "0:00:00";
		$scope.solved    = true;

		$scope.movePiece = function (item) {

			if (PuzzleMethods.isMovable(item, $scope.data)) {

				//---Movements
				$scope.movements ++;

				//---Swap the boxes
				PuzzleMethods.swapBoxes($scope.data, item);

				//---Check for solution
				if (PuzzleMethods.checkPuzzle($scope.data)) {

					$scope.solved = true;

					if (!isNaN(tick)) {

						clearInterval(tick);

					}

				}

			}

		};

		$scope.resetPuzzle = function ($event) {

			$event.preventDefault();

			PuzzleMethods.shufflePuzzle($scope.data);

			$scope.movements = 0;
			$scope.time = "0:00:00";
			$scope.solved = false;

			start = new Date();

			tick = setInterval( updateTime, 1000);

		};

		function updateTime () {

			var difTime = ((new Date()) - start) / 1000;
			var seconds = Math.round(difTime % 60).toString();
			var minutes = Math.floor(difTime / 60).toString();
			var hours   = Math.floor(difTime / 3600).toString();

			$scope.time = hours;
			$scope.time += ":";
			$scope.time += ("00".slice(0, 2 - minutes.length) + minutes);
			$scope.time += ":";
			$scope.time += ("00".slice(0, 2 - seconds.length) + seconds);

			$scope.$apply();

		}

	}]);

})();