document.addEventListener('DOMContentLoaded', () => {
	//grid stuff
	const grid = document.querySelector('.grid');
	const width = 10;
	const height = 20;

	//Tetrominoes
	const lTetromino = [
		[ 1, width + 1, width * 2 + 1, 2 ],
		[ width, width + 1, width + 2, width * 2 + 2 ],
		[ 1, width + 1, width * 2 + 1, width * 2 ],
		[ width, width * 2, width * 2 + 1, width * 2 + 2 ]
	];
});
