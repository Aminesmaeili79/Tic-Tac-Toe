// // /* ------------------------------------------------------------- */

// // ADDING BOARD CELLS TO THE DOM
// const boardCells = document.querySelectorAll(".board-cell");

// // CLICKING AND HOVERING ON BOARD CELL
// const cellSelection = function (player, markerClick, markerTurn) {
// 	boardCells.forEach((boardCell) => {
// 		boardCell.addEventListener("mouseover", () => {
// 			if (!boardCell.classList.contains(markerClick)) {
// 				boardCell.classList.add(markerTurn);
// 			}
// 		});
// 		boardCell.addEventListener("mouseleave", () => {
// 			boardCell.classList.remove(markerTurn);
// 		});
// 		boardCell.addEventListener("click", (e) => {
// 			var place = Number(e.target.classList[1].slice(-1)) - 1;
// 			console.log(place);

// 			while (!isCellEmpty(place)) {
// 				var place = Number(e.target.classList[1].slice(-1)) - 1;
// 			}

// 			board[Math.floor(place / 3)][place % 3] = player.marker;

// 			boardCell.classList.add(markerClick);
// 			boardCell.classList.remove(markerTurn);

// 			console.log(board);
// 		});
// 	});
// };

// const isCellEmpty = function (place) {
// 	while (board[Math.floor(place / 3)][place % 3] != null) {
// 		alert("You cannot place it there.");
// 		return false;
// 	}
// 	return true;
// };

// // Board function factory
// function CreateBoard() {
// 	let board = [];
// 	const initBoard = function () {
// 		for (let i = 0; i < 3; i++) {
// 			board.push([]);
// 			for (let j = 0; j < 3; j++) {
// 				board[i].push(null);
// 			}
// 		}
// 		return board;
// 	};
// 	return { initBoard };
// }
// // Init board
// var board = CreateBoard().initBoard();

// /* ------------------------------------------------------------- */

// // Player function factory
// function Player(name, marker) {
// 	return { name, marker };
// }
// // Init players
// const player1 = Player("Amin", "X");
// const player2 = Player("Negin", "O");

// /* ------------------------------------------------------------- */

// function Game(board, player1, player2) {
// 	// Checking whether the game is over or not
// 	function isGameOver(board) {
// 		for (let i = 0; i < 3; i++) {
// 			for (let j = 0; j < 3; j++) {
// 				if (board[i][j] == null) return false;
// 			}
// 		}
// 		return true;
// 	}
// 	// Checking for the winner
// 	function isWinner(player) {
// 		for (let i = 0; i < 3; i++) {
// 			if (
// 				board[0][i] == player.marker &&
// 				board[1][i] == player.marker &&
// 				board[2][i] == player.marker
// 			) {
// 				console.log(`${player.name} is the winner.`);
// 				return true;
// 			} else if (
// 				board[i][0] == player.marker &&
// 				board[i][1] == player.marker &&
// 				board[i][2] == player.marker
// 			) {
// 				console.log(`${player.name} is the winner.`);
// 				return true;
// 			}
// 		}
// 		if (
// 			(board[0][0] == player.marker &&
// 				board[1][1] == player.marker &&
// 				board[2][2] == player.marker) ||
// 			(board[0][2] == player.marker &&
// 				board[1][1] == player.marker &&
// 				board[2][0] == player.marker)
// 		) {
// 			console.log(`${player.name} is the winner.`);
// 			return true;
// 		}
// 		return false;
// 	}
// 	// Checking for tie game
// 	function isTie(player1, player2) {
// 		if (!isWinner(player1) && !isWinner(player2)) {
// 			console.log("It's a tie.");
// 			return true;
// 		}
// 		return false;
// 	}
// 	function placeMarker(player, marker, turn) {
// 		cellSelection(player, marker, turn);
// 		// let place = Number(
// 		// 	prompt(`${player.name}: Where do you want to place the marker?`)
// 		// );
// 		// while (board[Math.floor(place / 3)][place % 3] != null) {
// 		// alert("You cannot place it there.");
// 		// 	place = Number(
// 		// 		prompt(`${player.name}: Where do you want to place the marker?`)
// 		// 	);
// 		// }
// 		// board[Math.floor(place / 3)][place % 3] = player.marker;
// 	}

// 	while (!isGameOver(board)) {
// 		if (isWinner(player2)) {
// 			var board = CreateBoard().initBoard();
// 			return;
// 		} else {
// 			placeMarker(player1, "marker-x", "turn-x");
// 		}

// 		if (isWinner(player1)) {
// 			var board = CreateBoard().initBoard();
// 			return;
// 		} else {
// 			placeMarker(player2, "marker-o", "turn-o");
// 		}
// 		// isTie();
// 		console.log(board);
// 	}
// }

// Game(board, player1, player2);

// const clickedCell = function (e) {
// 	return e.target.classList[1];
// };
