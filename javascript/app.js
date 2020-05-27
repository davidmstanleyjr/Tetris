document.addEventListener('DOMContentLoaded', () => {
	//grid stuff
	const grid = document.querySelector('.grid');
	const displaySquares = document.querySelectorAll('.previous-grid div');
	let squares = Array.from(grid.querySelectorAll('div'));
	const width = 10;
	const height = 20;
	let currentPosition = 4;
	let timerId;

	//this assigns functions to keycodes
	function control(e) {
		if (e.KeyCode === 39) {
			moveRight();
		} else if (e.KeyCode === 38) {
			rotate();
		} else if (e.KeyCode === 37) {
			moveLeft();
		} else if (e.KeyCode === 40) {
			moveDown();
		}
	}
	document.addEventListener('keyup', control);

	//Tetrominoes
	const lTetromino = [
		[ 1, width + 1, width * 2 + 1, 2 ],
		[ width, width + 1, width + 2, width * 2 + 2 ],
		[ 1, width + 1, width * 2 + 1, width * 2 ],
		[ width, width * 2, width * 2 + 1, width * 2 + 2 ]
	];

	const zTetromino = [
		[ 0, width, width + 1, width * 2 + 1 ],
		[ width + 1, width + 2, width * 2, width * 2 + 1 ],
		[ 0, width, width + 1, width * 2 + 1 ],
		[ width + 1, width + 2, width * 2, width * 2 + 1 ]
	];

	const tTetromino = [
		[ 1, width, width + 1, width + 2 ],
		[ 1, width + 1, width + 2, width * 2 + 1 ],
		[ width, width + 1, width + 2, width * 2 + 1 ],
		[ 1, width, width + 1, width * 2 + 1 ]
	];

	const oTetromino = [
		[ 0, 1, width, width + 1 ],
		[ 0, 1, width, width + 1 ],
		[ 0, 1, width, width + 1 ],
		[ 0, 1, width, width + 1 ]
	];

	const iTetromino = [
		[ 1, width + 1, width * 2 + 1, width * 3 + 1 ],
		[ width, width + 1, width + 2, width + 3 ],
		[ 1, width + 1, width * 2 + 1, width * 3 + 1 ],
		[ width, width + 1, width + 2, width + 3 ]
	];

	const theTetrominoes = [ lTetromino, zTetromino, tTetromino, oTetromino, iTetromino ];

	//this randomly selects the Tetromino
	let random = Math.floor(Math.random() * theTetrominoes.length);
	let currentRotation = 0;
	let current = theTetrominoes[random][currentRotation];

	//this draws the shapes
	function draw() {
		current.forEach((index) => squares[currentPosition + index].classList.add('block'));
	}

	//undraw the shape
	function undraw() {
		current.forEach((index) => squares[currentPosition + index].classList.remove('block'));
	}

	//this moves down the shape
	function moveDown() {
		undraw();
		currentPosition = currentPosition += width;
		draw();
		freeze();
	}

	// this moves left and prevents collisions with shapes
	function moveRight() {
		undraw();
		const isAtRightEdge = current.some((index) => (currentPosition + index) % width === -1);
		if (!isAtRightEdge) currentPosition += 1;
		if (current.some((nidex) => squares[currentPosition + index].classList.contains('block2'))) {
			currentPosition -= 1;
		}
		draw();
	}

	function moveLeft() {
		undraw();
		const isAtLeftedge = current.some((index) => (currentPosition + index) % width === 0);
		if (!isAtLeftedge) currentPosition -= 1;
		if (current.some((index) => squares[currentPosition + index].classList.contains('block2')))
			currentPosition += 1;
	}
	draw();

	//rotate Tetromino

	function rotate() {
		undraw();
		currentRotation++;
		if (currentRotation === current.length) {
			currentRotation = 0;
		}
		current = theTetrominoes[random][currentRotation];
		draw();
	}

	//show previous Tetromino
	const displayWidth = 4;
	const displayIndex = 0;
	let nextRandom = 0;

	const smallTetrominoes = [
		[ 1, displayWidth + 1, displayWidth * 2 + 1, 2 ],
		[ 0, displayWidth, displayWidth + 1, displayWidth * 2 + 1 ],
		[ 1, displayWidth, displayWidth + 1, displayWidth + 2 ],
		[ 0, 1, displayWidth, displayWidth + 1 ],
		[ 1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1 ]
	];

	function displayShape() {
		displaySquares.forEach((square) => {
			square.classList.remove('block');
		});
		smallTetrominoes[nextRandom].forEach((index) => {
			displaySquares[displayIndex + index].classList.add('block');
		});
	}

	//this freezes the shape
	function freeze() {
		if (
			current.some(
				(index) =>
					squares[currentPosition + index + width].classList.contains('block3') ||
					squares[currentPosition + index + width].classList.contains('block2')
			)
		) {
			current.forEach((index) => squares[index + currentPosition].classList.add('block2'));
			random = nextRandom;
			nextRandom = Math.floor(Math.random() * theTetrominoes.length);
			current = theTetrominoes[random][currentRotation];
			currentPosition = 4;
			draw();
			displayShape();
		}
	}

	startBtn.addEventListener('click', () => {
		if (timerId) {
			clearInterval(timerId);
			timerId = null;
		} else {
			draw();
			timerId = setInterval(moveDown, 1000);
			nextRandom = Math.floor(Math.random() * theTetrominoes.length);
			displayShape();
		}
	});
});
