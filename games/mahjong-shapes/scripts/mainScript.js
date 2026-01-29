$( document ).ready(function() {
	generate_hand()
});

let hand = []
const SUITS = ["Sou", "Man", "Pin"]
const HAND_SIZE = 13;

function generate_hand() {
	// prevent from hand having more than 4 of one tile
	let tiles_left = [0,4,4,4,4,4,4,4,4,4]

	for (let i = 0; i < HAND_SIZE; i++) {
		let tile_valid = false;
		let i;
		while(!tile_valid){
			i = getRandomInt(1, 10);
			if (tiles_left[i] - 1 > 0){
				tile_valid = true;
			}
		}
		tiles_left[i] -= 1;
		hand.push(i);
	}
	hand.sort()

	let suit = SUITS[getRandomInt(0, SUITS.length)];

	// Set each tile visually
	let tiles = document.getElementsByClassName("hand-tiles");
	let i = 0;
	Array.prototype.forEach.call(tiles, function(tile){
		tile.src = "media/" + suit + hand[i] + ".svg";
		i += 1;
	})


	let win_tiles = document.getElementsByClassName("win-tiles");
	i = 1;
	Array.prototype.forEach.call(win_tiles, function(win_tile){
		win_tile.src = "media/" + suit + i + ".svg";
		i += 1;
	})

	let tile_nums = document.getElementsByClassName("tile-num");
	i = 0;
	Array.prototype.forEach.call(tile_nums, function(tile_num){
		tile_num.innerText = hand[i].toString();
		i += 1;
	})
}

function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
	// The maximum is exclusive and the minimum is inclusive
}