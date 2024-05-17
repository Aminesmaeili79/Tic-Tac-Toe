const boardCells = document.querySelectorAll(".board-cell");

const whoseTurn = document.querySelector(".whose-turn span");
const roundWinnerAnnounce = document.querySelector(".whose-turn p");

const restartRoundBtn = document.querySelector(".restart-round");
const resetGameBtn = document.querySelector(".reset-game");

const player1ScoreDisplay = document.querySelector(".score1");
const player2ScoreDisplay = document.querySelector(".score2");

const playerInputs = document.querySelector(".input-player");
const playerInputName = document.querySelector(".input-player-name");
const AiInputDifficulty = document.querySelector(".input-bot-difficulty");

const playerSelect = document.querySelectorAll(".player");
const botSelect = document.querySelectorAll(".bot");

const winner = document.querySelector(".winner");

const endScreen = document.querySelector(".game-end");

let roundsPlayed = 0;

const roundsToPlayBtn = document.querySelector("#first-to");
let roundsToPlay = 3;

roundsToPlayBtn.addEventListener("change", () => {
	roundsToPlay = roundsToPlayBtn.value;
	console.log(roundsToPlay);
});

let player1Score = 0;
let player2Score = 0;

const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const xMarker = "marker-x";
const oMarker = "marker-o";
const xHover = "turn-x";
const oHover = "turn-o";

let xTurn = true;

function gameStart() {
	xTurn = true;
	clearBoard(boardCells);
	boardCells.forEach((cell) => {
		cell.addEventListener("click", handleClick);
		cell.addEventListener("mouseover", handleMouseOver);
		cell.addEventListener("mouseleave", handleMouseLeave);
	});
	updateTurnDisplay();
}

function handleClick(e) {
	const cell = e.target;
	const currentMarker = xTurn ? xMarker : oMarker;

	placeMark(cell, currentMarker);

	if (checkWin(currentMarker)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurns();
	}
}

function handleMouseOver() {
	if (!this.classList.contains(xMarker) && !this.classList.contains(oMarker)) {
		this.classList.add(xTurn ? xHover : oHover);
	}
}

function handleMouseLeave() {
	this.classList.remove(xHover);
	this.classList.remove(oHover);
}

function placeMark(cell, currentPlayerMarker) {
	cell.classList.add(currentPlayerMarker);
	cell.classList.remove(xHover);
	cell.classList.remove(oHover);
}

function swapTurns() {
	xTurn = !xTurn;
	updateTurnDisplay();
}

function checkWin(currentMarker) {
	return winningCombinations.some((combination) => {
		return combination.every((index) => {
			return boardCells[index].classList.contains(currentMarker);
		});
	});
}

function endGame(draw) {
	if (draw) {
		console.log("it's a draw");
	} else {
		if (xTurn) {
			updatePlayerScores(++player1Score, player1ScoreDisplay);
			roundWinnerAnnounce.innerText = "wins the round!";
			setTimeout(() => {
				roundWinnerAnnounce.innerText = "'s turn!";
			}, 1000);
			console.log("x wins");
		} else {
			updatePlayerScores(++player2Score, player2ScoreDisplay);
			roundWinnerAnnounce.innerText = "wins the round!";
			setTimeout(() => {
				roundWinnerAnnounce.innerText = "'s turn!";
			}, 1000);
			console.log("o wins");
		}
	}
	disableBoard();
}

function isDraw() {
	return [...boardCells].every((cell) => {
		return cell.classList.contains(xMarker) || cell.classList.contains(oMarker);
	});
}

function clearBoard(cells) {
	cells.forEach((cell) => {
		cell.classList.remove(xMarker);
		cell.classList.remove(oMarker);
	});
}

function updateTurnDisplay() {
	whoseTurn.classList.toggle("player-turn-x", xTurn);
	whoseTurn.classList.toggle("player-turn-o", !xTurn);
}

function disableBoard() {
	boardCells.forEach((cell) => {
		cell.removeEventListener("click", handleClick);
		cell.removeEventListener("mouseover", handleMouseOver);
		cell.removeEventListener("mouseleave", handleMouseLeave);
	});
	if (Math.floor(roundsToPlay / 2) + 1 == player1Score) {
		endScreenDisplay("Player1");
		resetPlayersScores();
		console.log("player1 wins the game");
	} else if (Math.floor(roundsToPlay / 2) + 1 == player2Score) {
		endScreenDisplay("Player2");
		resetPlayersScores();
		console.log("player2 wins the game");
	} else {
		gameStart();
	}
}

function endScreenDisplay(player) {
	winner.innerText = player;
	endScreen.classList.remove("display-none");
	setTimeout(() => {
		endScreen.classList.add("display-none");
	}, 3000);
	gameStart();
}

function updatePlayerScores(playerScore, playerScoreDisplay) {
	playerScoreDisplay.innerText = playerScore;
}

restartRoundBtn.addEventListener("click", () => {
	gameStart();
});

function resetPlayersScores() {
	updatePlayerScores(0, player1ScoreDisplay);
	updatePlayerScores(0, player2ScoreDisplay);
}

resetGameBtn.addEventListener("click", () => {
	resetPlayersScores();
	gameStart();
});

playerSelect.forEach((player) => {
	player.addEventListener("click", () => {
		if (!player.classList.contains("player-active")) {
			player.nextElementSibling.classList.remove("bot-active");
			player.classList.add("player-active");
			player.parentElement.nextElementSibling.firstElementChild.innerText =
				"Player1";
			console.log(player.parentElement.nextElementSibling.firstElementChild);
		}
	});
});
botSelect.forEach((bot) => {
	bot.addEventListener("click", () => {
		if (!bot.classList.contains("bot-active")) {
			bot.previousElementSibling.classList.remove("player-active");
			bot.classList.add("bot-active");
		}
	});
});

// -----------------------------------------------------------------

gameStart();
