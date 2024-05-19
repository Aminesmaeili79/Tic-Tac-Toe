const mainMenu = document.querySelector(".main-menu");

const choosePlayer1 = document.querySelector(".choice1 .player-chosen");
const choosePlayer2 = document.querySelector(".choice2 .player-chosen");

const chooseBot1 = document.querySelector(".choice1 .bot-chosen");
const chooseBot2 = document.querySelector(".choice2 .bot-chosen");

const difficulties1 = document.querySelector(".diffs1");
const difficulties2 = document.querySelector(".diffs2");

const playerName1 = document.querySelector(".name1");
const playerName2 = document.querySelector(".name2");

const displayPlayerName1 = document.querySelector(".display-player1");
const displayBotDiff1 = document.querySelector(".display-bot1");
const displayPlayerName2 = document.querySelector(".display-player2");
const displayBotDiff2 = document.querySelector(".display-bot2");

const screenPlayerName1 = document.querySelector(".player-name1");
const screenPlayerName2 = document.querySelector(".player-name2");

const screenBotDiff1 = document.querySelector(".bot-difficulty1");
const screenBotDiff2 = document.querySelector(".bot-difficulty2");

const playerNameInput1 = document.querySelector(".name1 input");
const playerNameInput2 = document.querySelector(".name2 input");

let isPlayer1Bot = false;
let isPlayer2Bot = false;

const playBtn = document.querySelector(".play");

function toggleInputs(
	playerBtn,
	botBtn,
	playerActive,
	botActive,
	nameInput,
	diffSelect,
	playerDisplay,
	botDisplay
) {
	playerBtn.addEventListener("click", () => {
		if (!playerBtn.classList.contains(playerActive)) {
			playerBtn.classList.add(playerActive);
			botBtn.classList.remove(botActive);

			nameInput.classList.remove("display-none");
			diffSelect.classList.add("display-none");

			playerDisplay.classList.remove("display-none");
			botDisplay.classList.add("display-none");
		}
	});
	botBtn.addEventListener("click", () => {
		if (!botBtn.classList.contains(botActive)) {
			botBtn.classList.add(botActive);
			playerBtn.classList.remove(playerActive);

			nameInput.classList.add("display-none");
			diffSelect.classList.remove("display-none");

			playerDisplay.classList.add("display-none");
			botDisplay.classList.remove("display-none");
		}
	});
}

toggleInputs(
	choosePlayer1,
	chooseBot1,
	"player-active",
	"bot-active",
	playerName1,
	difficulties1,
	displayPlayerName1,
	displayBotDiff1
);
toggleInputs(
	choosePlayer2,
	chooseBot2,
	"player-active",
	"bot-active",
	playerName2,
	difficulties2,
	displayPlayerName2,
	displayBotDiff2
);

const easyBtn1 = document.querySelector(".diffs1 .easy");
const easyBtn2 = document.querySelector(".diffs2 .easy");

const hardBtn1 = document.querySelector(".diffs1 .hard");
const hardBtn2 = document.querySelector(".diffs2 .hard");

const unbeatableBtn1 = document.querySelector(".diffs1 .unbeatable");
const unbeatableBtn2 = document.querySelector(".diffs2 .unbeatable");

function chooseDifficulty(easy, hard, unbeatable) {
	easy.addEventListener("click", () => {
		easy.classList.add("easy-selected");
		hard.classList.remove("hard-selected");
		unbeatable.classList.remove("unbeatable-selected");
	});
	hard.addEventListener("click", () => {
		easy.classList.remove("easy-selected");
		hard.classList.add("hard-selected");
		unbeatable.classList.remove("unbeatable-selected");
	});
	unbeatable.addEventListener("click", () => {
		easy.classList.remove("easy-selected");
		hard.classList.remove("hard-selected");
		unbeatable.classList.add("unbeatable-selected");
	});
}

chooseDifficulty(easyBtn1, hardBtn1, unbeatableBtn1);
chooseDifficulty(easyBtn2, hardBtn2, unbeatableBtn2);

let player1, player2;

function mainMenuDisplay() {
	mainMenu.classList.remove("visible-none");
	playBtn.addEventListener("click", () => {
		roundsToPlay = Number(roundsToPlayBtn.value);
		if (
			(choosePlayer1.classList.contains("player-active") ||
				chooseBot1.classList.contains("bot-active")) &&
			(choosePlayer2.classList.contains("player-active") ||
				chooseBot2.classList.contains("bot-active"))
		) {
			if (choosePlayer1.classList.contains("player-active")) {
				screenPlayerName1.innerText = playerNameInput1.value;
				player1 = playerNameInput1.value;
				screenPlayerName1.classList.remove("display-none");
				screenBotDiff1.classList.add("display-none");
			}
			if (choosePlayer2.classList.contains("player-active")) {
				screenPlayerName2.innerText = playerNameInput2.value;
				player2 = playerNameInput1.value;
				screenPlayerName2.classList.remove("display-none");
				screenBotDiff2.classList.add("display-none");
			}
			if (chooseBot1.classList.contains("bot-active")) {
				player1 = "Bot";
				isPlayer1Bot = true;
				if (easyBtn1.classList.contains("easy-selected")) {
					screenBotDiff1.innerText = "Easy";
				}
				if (hardBtn1.classList.contains("hard-selected")) {
					screenBotDiff1.innerText = "Hard";
				}
				if (unbeatableBtn1.classList.contains("unbeatable-selected")) {
					screenBotDiff1.innerText = "Unbeatable";
				}
				screenBotDiff1.classList.remove("display-none");
				screenPlayerName1.classList.add("display-none");
			}
			if (chooseBot2.classList.contains("bot-active")) {
				player2 = "Bot";
				isPlayer2Bot = true;
				if (easyBtn2.classList.contains("easy-selected")) {
					screenBotDiff2.innerText = "Easy";
				}
				if (hardBtn2.classList.contains("hard-selected")) {
					screenBotDiff2.innerText = "Hard";
				}
				if (unbeatableBtn2.classList.contains("unbeatable-selected")) {
					screenBotDiff2.innerText = "Unbeatable";
				}
				screenBotDiff2.classList.remove("display-none");
				screenPlayerName2.classList.add("display-none");
			}
			gameStart();
			if (!isPlayer1Bot || !isPlayer2Bot) {
				mainMenu.classList.add("visible-none");
			} else {
				mainMenuDisplay();
			}
		}
	});
}

const boardCells = document.querySelectorAll(".board-cell");

const whoseTurn = document.querySelector(".turn");
const roundWinnerAnnounce = document.querySelector(".whose-turn p");

const restartRoundBtn = document.querySelector(".restart-round");
const resetGameBtn = document.querySelector(".reset-game");

const player1ScoreDisplay = document.querySelector(".score1");
const player2ScoreDisplay = document.querySelector(".score2");

const winner = document.querySelector(".winner");

const endScreen = document.querySelector(".game-end");

let roundsPlayed = 0;

const roundsToPlayBtn = document.querySelector("#first-to");
let roundsToPlay = 3;

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
	if (isPlayer1Bot && isPlayer2Bot) {
		alert("atleast a player must be chosen");
	} else if (isPlayer2Bot) {
		boardCells.forEach((cell) => {
			if (!cell.classList.contains(oMarker)) {
				cell.addEventListener("click", handleClick, { once: true });
			}
			cell.addEventListener("mouseover", handleMouseOver);
			cell.addEventListener("mouseleave", handleMouseLeave);
		});
	} else if (isPlayer1Bot) {
		xBotPlay();
		boardCells.forEach((cell) => {
			if (!cell.classList.contains(xMarker)) {
				cell.addEventListener("click", handleClick, { once: true });
			}
			// cell.addEventListener("click", handleClick, { once: true });
			cell.addEventListener("mouseover", handleMouseOver);
			cell.addEventListener("mouseleave", handleMouseLeave);
		});
	} else {
		boardCells.forEach((cell) => {
			cell.addEventListener("click", handleClick, { once: true });
			cell.addEventListener("mouseover", handleMouseOver);
			cell.addEventListener("mouseleave", handleMouseLeave);
		});
	}
}

function xBotPlay() {
	if (xTurn) {
		let place = Math.ceil(Math.random() * 9);
		targetedClass = ".cell-" + place;
		let targetedCell = document.querySelector(targetedClass);
		while (
			targetedCell.classList.contains("marker-o") ||
			targetedCell.classList.contains("marker-x")
		) {
			place = Math.ceil(Math.random() * 9);
			targetedClass = ".cell-" + place;
			targetedCell = document.querySelector(targetedClass);
		}
		targetedCell.classList.add("marker-x");
		gameCheck("marker-x");
		// swapTurns();
	}
}

function oBotPlay() {
	if (!xTurn) {
		let place = String(Math.ceil(Math.random() * 9));
		targetedClass = ".cell-" + place;
		let targetedCell = document.querySelector(targetedClass);
		while (
			targetedCell.classList.contains("marker-x") ||
			targetedCell.classList.contains("marker-o")
		) {
			place = String(Math.ceil(Math.random() * 9));
			targetedClass = ".cell-" + place;
			targetedCell = document.querySelector(targetedClass);
		}
		targetedCell.classList.add("marker-o");
		gameCheck("marker-o");
	}
}

function handleClick(e) {
	const cell = e.target;
	const currentMarker = xTurn ? xMarker : oMarker;

	placeMark(cell, currentMarker);

	gameCheck(currentMarker);

	if (isPlayer2Bot) {
		oBotPlay();
	}
	if (isPlayer1Bot) {
		xBotPlay();
	}
}

function gameCheck(currentMarker) {
	updateTurnDisplay();
	if (checkWin(currentMarker)) {
		endGame(false);
		return true;
	} else if (isDraw()) {
		endGame(true);
		return true;
	} else {
		swapTurns();
		return false;
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
		whoseTurn.classList.remove("player-turn-x");
		roundWinnerAnnounce.innerText = "It's a tie.";
		setTimeout(() => {
			whoseTurn.classList.add("player-turn-x");
			roundWinnerAnnounce.innerText = "'s turn!";
		}, 1000);
	} else {
		if (xTurn) {
			updatePlayerScores(++player1Score, player1ScoreDisplay);
			roundWinnerAnnounce.innerText = "wins the round!";
			setTimeout(() => {
				roundWinnerAnnounce.innerText = "'s turn!";
			}, 1000);
		} else {
			updatePlayerScores(++player2Score, player2ScoreDisplay);
			roundWinnerAnnounce.innerText = "wins the round!";
			setTimeout(() => {
				roundWinnerAnnounce.innerText = "'s turn!";
				updateTurnDisplay();
			}, 1000);
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
	if (!xTurn) {
		whoseTurn.classList.remove("player-turn-x");
		whoseTurn.classList.add("player-turn-o");
	} else {
		whoseTurn.classList.add("player-turn-x");
		whoseTurn.classList.remove("player-turn-o");
	}
}

function disableBoard() {
	boardCells.forEach((cell) => {
		cell.removeEventListener("click", handleClick);
		cell.removeEventListener("mouseover", handleMouseOver);
		cell.removeEventListener("mouseleave", handleMouseLeave);
	});
	if (roundsToPlay == player1Score) {
		endScreenDisplay(player1);
		resetPlayersScores();
	} else if (roundsToPlay == player2Score) {
		endScreenDisplay(player2);
		resetPlayersScores();
	} else {
		gameStart();
	}
}

function endScreenDisplay(player) {
	winner.innerText = player;
	endScreen.classList.remove("visible-none");
	setTimeout(() => {
		endScreen.classList.add("visible-none");
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
	player1Score = 0;
	player2Score = 0;
	updatePlayerScores(player1Score, player1ScoreDisplay);
	updatePlayerScores(player2Score, player2ScoreDisplay);
}

resetGameBtn.addEventListener("click", () => {
	resetPlayersScores();
	mainMenuDisplay();
});

// -----------------------------------------------------------------

mainMenuDisplay();
