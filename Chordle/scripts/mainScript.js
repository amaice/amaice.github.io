guesses = [
	[],
	[],
	[],
	[],
	[]
];

answers = [
	['F3','C4','G4','A4','E5']
];

enharmonics = ['C#/Db',	'D#/Eb', 'F#/Gb', 'G#/Ab', 'A#/Bb'];

var x = 0;
var y = 0;
var currentAnswer = 0;

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
			  noteGuessBox.style.background=colorCorrect;
			  document.getElementById(currentNote).style.fill = colorCorrect;
			} 
			// if wrong position but right octave (blue)
			else if(answers[currentAnswer].includes(currentNote)){
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
		}
		x = 0;
		y++;
	}
}

function win(){
	alert("yay u win");
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