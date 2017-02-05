(function () {

	var app = angular.module("SlideTilePuzzle");

	app.factory("PuzzleMethods", function PuzzleMethodsFactory(){

		return {

			getData: function (size) {

				var sum   = 0,
					array = [];

				for (var row = 0; row < size; row++) {

					for (var col = 0; col < size; col++) {

						array[row] = array[row] || [];

						array[row][col] = { index: sum, row: row, col: col };

						sum ++;

					}

				}

				array[size - 1][size - 1].active = true;

				return array;

			},

			getValidSolution: function (size) {

				var total  = Math.pow(size, 2),
					puzzle = [],
					white  = total - 1,
					backup = 0;

				for (var i = 0; i < total; i++) {

					puzzle[i] = i;

				}

				puzzle.sort(function(){
					return 1 - Math.round(Math.random()) * 2;
				});

				puzzle.splice(puzzle.indexOf(white), 1);
				puzzle.push(white);

				if ( !this.isValidPuzzle(puzzle, size) ) {					

					backup = puzzle[0];
					puzzle[0] = puzzle[1];
					puzzle[1] = backup;

				}

				return puzzle;

			},

			isValidPuzzle: function (array, size) {

				var total = array.length,
					white = total - 1,
					inv   = 0;

				for (var i = 0; i < total; i++) {

					if (array[i] !== white) {

						for (var j = i + 1; j < total; j++) {

							if (array[j] !== white && array[j] < array[i]) {

								inv++;

							}

						}

					}

				}
				
				return Boolean(inv % 2 === 0);

			},

			shufflePuzzle: function (array) {

				var size   = array.length,
					puzzle = this.getValidSolution(size),
					index  = 0;

				for (var row = 0; row < size; row++) {

					for (var col = 0; col < size; col++) {

						index = puzzle.indexOf(array[row][col].index);

						array[row][col].row = Math.floor(index / size);
						array[row][col].col = index - array[row][col].row * size;

					}

				}

			},

			//---Is Movable
			isMovable: function (item, array) {

				var box = array[array.length - 1][array.length - 1];

				if (item.row !== box.row && item.col !== box.col) {

					return false;

				} else if (

					(item.row === box.row && Math.abs(item.col - box.col) === 1) ||
					(item.col === box.col && Math.abs(item.row - box.row) === 1)

				) {

					return true;

				}

				return false;

			},

			//---Swap boxes
			swapBoxes: function (array, item) {

				var box    = array[array.length - 1][array.length - 1],
					boxRow = box.row,
					boxCol = box.col;

				//---Swap the pieces coords
				box.row    = item.row;
				box.col    = item.col;
				item.row   = boxRow;
				item.col   = boxCol;

			},

			checkPuzzle: function (array) {

				var size     = array.length,
					solution = true;

				for (var row = 0; row < size; row++) {

					for (var col = 0; col < size; col++) {

						if (array[row][col].row !== row || array[row][col].col !== col) {

							solution = false;

							break;

						}

					}

					if (!solution) {

						break;

					}

				}

				return solution;

			}

		};

	});

})();