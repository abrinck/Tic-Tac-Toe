let playerScore = 0;
let computerScore = 0;
let isPlayerTurn = true;
let isGameOver = false;
let turnNumber = 1;

$(document).ready(function () {
	$('.gameCell').on('click', selectSquare);
});

function resetGame() {
	$('.gameCifell').html('');
	playerScore = 0;
	computerScore = 0;
	isPlayerTurn = true;
}

function selectSquare(event) {
	if (isPlayerTurn && !isGameOver) {
		isPlayerTurn = false;
		if (this.innerHTML == ''){
			this.innerHTML = 'X';
			turnNumber++;
		} else {
			return;
		}
		if (checkForWin('X')){
			alert('YOU WON!!!');
			isGameOver = true;
		} else if(turnNumber > 9) {
			isGameOver = true;
			alert('YOU TIED!!')
		}else {
			computerTurn();
		}

	}
}

function computerTurn() {
	if (lookForWin()){} 
	else if (lookForBlock()) {} 
	else if (lookForTrap()) {}
	else {
		placeRandomMarker()
	}


	if (checkForWin('O')) {
		alert('YOU LOST!!!');
		isGameOver = true;
	} else {
		isPlayerTurn = true;
		turnNumber++;
	}
}

function placeRandomMarker() {
	while (true) {
		let randomRow = Math.floor(Math.random() * 3) + 1;
		let randomCol = Math.floor(Math.random() * 3) + 1;
		let cellId = `#gameGrid${randomRow}-${randomCol}`;
		if ($(cellId).html() == '') {
			$(cellId).html('O');
			break;
		}
	}
}

function checkForWin(marker) {
	if (checkHorizontalWin(marker) || checkVerticalWin(marker) || checkDiagonalWin(marker)){
		return true;
	} else {
		return false;
	}
}

function checkVerticalWin(marker) {
	for (let col = 1; col <= 3; col++) {
		for (let row = 1; row <= 3; row++){
			let cellId = `#gameGrid${row}-${col}`;
			if ($(cellId).html() != marker) {
				break;
			} else if (row === 3) {
				return true;
			}
		}
	}
	return false;
}

function checkDiagonalWin(marker) {
	for (let i = 1; i <= 3; i++) {
		let cellId = `#gameGrid${i}-${i}`;
		if ($(cellId).html() != marker) {
			break;
		} else if (i === 3) {
			return true;
		}
	}

	for (let i = 1; i <= 3; i++) {
		let cellId = `#gameGrid${i}-${4 - i}`;
		if ($(cellId).html() != marker) {
			break;
		} else if (i === 3) {
			return true;
		}
	}
	return false;
}

function checkHorizontalWin(marker) {
	for (let row = 1; row <= 3; row++) {
		for (let col = 1; col <= 3; col++){
			let cellId = `#gameGrid${row}-${col}`;
			if ($(cellId).html() != marker) {
				break;
			} else if (col === 3) {
				return true;
			}
		}
	}
	return false;
}

function lookForTrap() {
	if (turnNumber == 2) {
		if ($('#gameGrid2-2').html() == 'X') {
			$('#gameGrid1-1').html('O');
			return true;
		} else {
			$('#gameGrid2-2').html('O');
			return true;
		}
	} else if (turnNumber == 4) {
		if (
			($('#gameGrid1-1').html() == 'X' && $('#gameGrid3-3').html() == 'X') ||
			($('#gameGrid1-3').html() == 'X' && $('#gameGrid3-1').html() == 'X')
			){
				$('#gameGrid2-1').html('O')
				return true;
			}
	}
}

function lookForWin() {}

function lookForBlock() {}