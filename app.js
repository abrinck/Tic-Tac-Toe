let playerScore = 0;
let computerScore = 0;
let isPlayerTurn = true;
let isGameOver = false;
let turnNumber = 1;

$(document).ready(function () {
	$('.gameCell').on('click', selectSquare);
	$('#resetButton').on('click', resetGame);
	$('#playerMessage').addClass('text-primary');
});

function resetGame() {
	$('.gameCell').html('');
	$('.gameCell').removeClass('text-success');
	$('.gameCell').removeClass('text-danger');
	isPlayerTurn = true;
	isGameOver = false;
	turnNumber = 1;
	$('#playerMessage').html('You Go First!');
	$('#playerMessage').addClass('text-primary');
}

function selectSquare(event) {
	if (isPlayerTurn && !isGameOver && this.innerHTML == '') {
		isPlayerTurn = false;
		this.innerHTML = 'X';
		this.classList.add('text-success');
		turnNumber++;
		if (checkForWin('X')) {
			isGameOver = true;
		} else if (turnNumber > 9) {
			isGameOver = true;
			$('#playerMessage').html('You Tied! Would you like to try again?');
			$('#playerMessage').addClass('text-warning');
		} else {
			setTimeout(computerTurn, 500);
		}
	}
}

function computerTurn() {
	if (lookForWin('O')) {
	} else if (lookForWin('X')) {
	} else if (lookForTrap()) {
	} else {
		placeRandomMarker();
	}

	if (checkForWin('O')) {
		$('#playerMessage').html('You Lost! Would you like to try again?');
		$('#playerMessage').addClass('text-danger');
		computerScore++;
		$('#computerScore').html(computerScore);

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
			$(cellId).addClass('text-danger');
			break;
		}
	}
}

function checkForWin(marker) {
	if (checkHorizontalWin(marker) || checkVerticalWin(marker) || checkDiagonalWin(marker)) {
		return true;
	} else {
		return false;
	}
}

function checkVerticalWin(marker) {
	for (let col = 1; col <= 3; col++) {
		for (let row = 1; row <= 3; row++) {
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
		for (let col = 1; col <= 3; col++) {
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
			$('#gameGrid1-1').addClass('text-danger');
			return true;
		} else {
			$('#gameGrid2-2').html('O');
			$('#gameGrid2-2').addClass('text-danger');
			return true;
		}
	} else if (turnNumber == 4) {
		if (($('#gameGrid1-1').html() == 'X' && $('#gameGrid3-3').html() == 'X') || ($('#gameGrid1-3').html() == 'X' && $('#gameGrid3-1').html() == 'X')) {
			$('#gameGrid2-1').html('O');
			$('#gameGrid2-1').addClass('text-danger');
			return true;
		}
	} else {
		return false;
	}
}

function lookForWin(marker) {
	if (lookHorizontal(marker)) {
		return true;
	}
	if (lookVertical(marker)) {
		return true;
	}
	if (lookDiagonal(marker)) {
		return true;
	}
}

function lookHorizontal(marker) {
	let isfinalCellBlank = false;
	let numMarkers = 0;
	let cellIdToTake;

	for (let row = 1; row <= 3; row++) {
		for (let col = 1; col <= 3; col++) {
			let cellId = `#gameGrid${row}-${col}`;
			if ($(cellId).html() == marker) {
				numMarkers++;
			} else if ($(cellId).html() == '') {
				isfinalCellBlank = true;
				cellIdToTake = cellId;
			} else {
				break;
			}
		}
		// After searching a row if there are two of the marker place an O in the remaining spot
		if (numMarkers == 2 && isfinalCellBlank) {
			$(cellIdToTake).html('O');
			$(cellIdToTake).addClass('text-danger');
			return true;
		} else {
			numMarkers = 0;
			isfinalCellBlank = false;
		}
	}

	return false;
}

function lookVertical(marker) {
	let isfinalCellBlank = false;
	let numMarkers = 0;
	let cellIdToTake;

	for (let col = 1; col <= 3; col++) {
		for (let row = 1; row <= 3; row++) {
			let cellId = `#gameGrid${row}-${col}`;
			if ($(cellId).html() == marker) {
				numMarkers++;
			} else if ($(cellId).html() == '') {
				isfinalCellBlank = true;
				cellIdToTake = cellId;
			} else {
				break;
			}
		}
		// After searching a col if there are two of the marker place an O in the remaining spot
		if (numMarkers == 2 && isfinalCellBlank) {
			$(cellIdToTake).html('O');
			$(cellIdToTake).addClass('text-danger');
			return true;
		} else {
			numMarkers = 0;
			isfinalCellBlank = false;
		}
	}

	return false;
}

function lookDiagonal(marker) {
	let isfinalCellBlank = false;
	let numMarkers = 0;
	let cellIdToTake;

	for (let i = 1; i <= 3; i++) {
		let cellId = `#gameGrid${i}-${i}`;
		if ($(cellId).html() == marker) {
			numMarkers++;
		} else if ($(cellId).html() == '') {
			isfinalCellBlank = true;
			cellIdToTake = cellId;
		} else {
			break;
		}
	}

	if (numMarkers == 2 && isfinalCellBlank) {
		$(cellIdToTake).html('O');
		$(cellIdToTake).addClass('text-danger');
		return true;
	} else {
		numMarkers = 0;
		isfinalCellBlank = false;
	}

	for (let i = 1; i <= 3; i++) {
		let cellId = `#gameGrid${i}-${4 - i}`;
		if ($(cellId).html() == marker) {
			numMarkers++;
		} else if ($(cellId).html() == '') {
			isfinalCellBlank = true;
			cellIdToTake = cellId;
		} else {
			break;
		}
	}

	if (numMarkers == 2 && isfinalCellBlank) {
		$(cellIdToTake).html('O');
		$(cellIdToTake).addClass('text-danger');
		return true;
	} else {
		numMarkers = 0;
		isfinalCellBlank = false;
	}
	return false;
}
