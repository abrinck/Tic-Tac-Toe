let playerScore = 0;
let computerScore = 0;

$(document).ready(function () {
	$('.gameCell').on('click', selectSquare);
});

function clearGameBoard() {
	$('.gameCell').html('');
}

function selectSquare(event) {
	console.log('this:', this);
	console.log('event:', event);

	this.innerHTML = 'X';
}
