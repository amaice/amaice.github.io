guesses = [
	[],
	[],
	[],
	[],
	[]
];

answers = [
	['F3','C4','G4','A4','E5'],	// Fmaj9 very open voicing - spirited away
	['B3', 'Bb4', 'Db5', 'Eb5', 'Gb5'],	// Bmaj9 - giant steps
	['C3', 'G3', 'D4', 'A4', 'E5'],	// stack of fifths
	['Db3', 'G3', 'F4', 'B4', 'Eb5'],	// Db9b5
	['E3', 'A3', 'D4', 'G4', 'B4'],	// Em11 - famous so what voicing
	['Bb3', 'Eb4', 'C5', 'F5', 'A5'],	// Eb7#11
	['F3', 'A3', 'Eb4', 'Ab4', 'Db5'],	// F7(#9, b13)
	['Ab3', 'Db4', 'Gb4', 'B4', 'E5'],	// stack of fourths
	['E3', 'G4', 'B4', 'Eb5', 'Gb5'],	// EmM9 - james bond
	['Eb3', 'G4', 'Bb4', 'Db5', 'E5'],	// E7b9
	['Ab4', 'Db5', 'Eb5', 'G5', 'Bb5'], // Am9sus4
	['Gb3', 'E4', 'Ab4', 'Bb4', 'D5'],	// Gb9#5
	['Db', 'Bb', 'E', 'G', 'C'],	// Petrushka chord but without the bass note cause it's a 6 note chord lol
	['G3', 'F4', 'A3', 'C4', 'E4'],	// G13 - one of my favorite chords ever	
	['D4', 'F4', 'Ab4', 'C5', 'E5'], // Dm9b5
	['C3', 'Bb3', 'E4', 'Ab4', 'D5']	// C9#5
	//['', '', '', '', '']	
];

enharmonics = ['C#/Db',	'D#/Eb', 'F#/Gb', 'G#/Ab', 'A#/Bb'];

var dayOfLaunch = new Date("04/03/2022");
var today = new Date();

var differenceInTime = today.getTime() - dayOfLaunch.getTime();
var differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

// if 4 days since launch, choose 4th chord, use modulus to through chords infinitely
var currentAnswer = differenceInDays % answers.length;
var x = 0;
var y = 0;

var COLUMNS = 5;

var colorCorrect = '#55c555';
var colorRightOctave = '#55cccc';
var colorRightPosition = '#ccc555';
var colorWrong = '#444448';

// create onclicklistener for every element with the class 'key'
document.querySelectorAll('.key').forEach(item => {
  item.addEventListener('click', (elem) => {
	var t = elem.target;
    //console.log("clicked by " + t.id);
	
	// if not out of bounds 
	if (x != COLUMNS){
		guesses[y].push(t.id);
		document.getElementById((y + 1) + '-' + (x + 1)).innerText=t.id;
		x++;	
	}

  })
})

// Add event listener on keydown
document.addEventListener('keydown', (event) => {
var name = event.key;
	var code = event.code;
	if (name === 'Backspace') {
		backspace();
		return;
	}
}, false);

document.getElementById("backspace").addEventListener("click", backspace);
function backspace(){
	// if not out of bounds
	if(x != 0){
		guesses[y].pop();
		x--;
		document.getElementById((y + 1) + '-' + (x + 1)).innerText="";
	}
}

document.getElementById("submit").addEventListener("click", submit);
function submit(){
	// valid guess must have all notes filled
	if(x == COLUMNS){
		answerNoteNames = answers[currentAnswer].map(string => string.slice(0, -1));
		for (let i = 0; i < COLUMNS; i++) {
			var currentNote = guesses[y][i];
			var currentNoteName = currentNote.slice(0, -1);
			var noteGuessBox = document.getElementById((y + 1) + '-' + (i + 1));
			
			// if right position and right octave (green)
			if(currentNote == answers[currentAnswer][i]){
				// if D4 is correct, set all other D's to gray
				keys = document.getElementsByClassName(currentNoteName);
				Array.prototype.forEach.call(keys, function(key) {
					key.style.fill = colorWrong;
				});
				
				noteGuessBox.style.background=colorCorrect;
				document.getElementById(currentNote).style.fill = colorCorrect;
			} 
			// if wrong position but right octave (blue)
			else if(answers[currentAnswer].includes(currentNote)){
				// if D4 is right octave, set all other D's to gray
				keys = document.getElementsByClassName(currentNoteName);
				Array.prototype.forEach.call(keys, function(key) {
					key.style.fill = colorWrong;
				});
				
				noteGuessBox.style.background = colorRightOctave;
				document.getElementById(currentNote).style.fill = colorRightOctave;
			} 
			// if right position but wrong octave (yellow)
			else if(answerNoteNames.includes(currentNoteName)){
				noteGuessBox.style.background = colorRightPosition;
				document.getElementById(currentNote).style.fill = colorRightPosition;
			}
			// note is not in the chord
			else{
				noteGuessBox.style.background = colorWrong;
				document.getElementById(currentNote).style.fill = colorWrong;

				keys = document.getElementsByClassName(currentNoteName);
				Array.prototype.forEach.call(keys, function(key) {
					key.style.fill = colorWrong;
				});
			}
		} 
		
		// if all correct
		if(guesses[y].toString() == answers[currentAnswer].toString()){
			win();
			y = 99;	// set out of bounds because u won
		}
		x = 0;
		y++;
	}
}

function win(){
	alert("yay u win");
}

document.getElementById("share").addEventListener("click", share);
function share(){
	var msg = "";
	
	var square_list = document.querySelectorAll('.roundedSquare');
	var square_array = [...square_list]; // convert to array
	square_array.forEach(square => {
		let color = square.style.color;
		if(color == colorCorrect){
			msg = msg.concat('gren');
			alert("gren");
		}
		
		/*
		switch (square){
			case colorCorrect:
				msg = msg.concat('gren');
				alert("gren");
				break;
			default:
				msg += "gray";
		}
		*/
	});
	alert(msg);

	
	/*
	document.querySelectorAll('.roundedSquare').forEach(item => {
		if(item.style.background == colorCorrect){
			alert("green");
		}
		
		
		switch (item){
			case colorCorrect:
				msg += 'gren';
				alert("gren");
				break;
			default:
				msg += "gray";
		}
	});
	*/
	
}

document.getElementById("flip").addEventListener("click", flip);
function flip(){
	var note = document.getElementById((y + 1) + '-' + (x)).innerText;
	// ex: note = Ab4 -> noteName = Ab; octave = 4;
	var noteName = note.slice(0, -1);
	var octave = note.charAt(note.length - 1);
	var result = [];
	
	// find noteName and change text to its enharmonic note name
	for(var i = 0, len = enharmonics.length; i < len; i++) {
		if(enharmonics[i].includes(noteName)) {
			result = enharmonics[i].split('/');
			break;
		}
	}
	if (result[0] == noteName){
		document.getElementById((y + 1) + '-' + (x)).innerText = result[1] + octave;
	}
	else {
		document.getElementById((y + 1) + '-' + (x)).innerText = result[0] + octave;
	}
}