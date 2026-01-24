guesses = [
	[],
	[],
	[],
	[],
	[]
];

// chords must be written in flats (no Cb or Fb)
answers = [
	['F3' ,	'C4' ,	'G4' ,	'A4' ,	'E5' 	,"The famous F△9 from spirited away"],
	['B3' ,	'Bb4',	'Db5',	'Eb5',	'Gb5' 	,"B△9 - giant steps"],
	['C3' ,	'G3' , 	'D4' , 	'A4' , 	'E5' 	,"C6/9 - stack of fifths"],
	['Db3', 'G3' , 	'F4' , 	'B4' , 	'Eb5' 	,"Db9b5"],
	['E3' ,	'A3' , 	'D4' , 	'G4' , 	'B4' 	,"E-11 - so what voicing"],
	['Bb3', 'Eb4',	'C5' , 	'F5' , 	'A5' 	,"Eb7#11"],
	['F3' ,	'A3' , 	'Eb4',	'Ab4',	'Db5' 	,"F7(b13, #9)"],
	['Ab3', 'Db4',	'Gb4',	'B4' , 	'E5' 	,"Ab-11? - Stack of fourths"],
	['E3' ,	'G4' , 	'B4' , 	'Eb5',	'Gb5' 	,"E-△9 - James Bond"],
	['Eb3', 'G4' , 	'Bb4',	'Db5',	'E5' 	,"Eb7b9"],
	['Ab4', 'Db5',	'Eb5',	'G5' , 	'Bb5' 	,"A-9sus4"],
	['Gb3', 'E4' , 	'Ab4',	'Bb4',	'D5' 	,"Gb9#5"],
	['Gb3', 'Bb3',	'E4' , 	'G4' , 	'C5' 	,"F#7(b9,#11) or C/F#, the Petrushka chord without a C# cause that's a 6 note chord lol"],
	['G3' ,	'F4' , 	'A4' , 	'C5' , 	'E5' 	,"G13"],
	['D4' ,	'F4' , 	'Ab4',	'C5' , 	'E5' 	,"D-9b5"],
	['C3' ,	'Bb3',	'E4' , 	'Ab4',	'D5' 	,"C9#5"],
	['G3' ,	'Bb3',	'Db4',	'F4' , 	'Gb5' 	,"G-7(b9, b5)"],
	['Db4', 'G4', 'C5', 'F5', 'Bb5', "Quartal Db△13#11"],
	['Ab3', 'B3', 'D4', 'E4', 'G4', "Rootless Bb13(b9, b5)"],
	['A3', 'F4', 'G4', 'C5', 'E5', "Fmaj9/A"]
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

answer = "";
let temp_answer;
temp_answer = answers[currentAnswer].slice();	// shallow copy!
temp_answer.pop() // remove comment
answer = temp_answer.toString();

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
	if (name === 'Enter') {
		submit();
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
		
		// valid guess must have 5 unique pitches
		// if set is shorter, then there are repeat pitches
		checkSet = new Set(guesses[y]);		
		if(checkSet.size === guesses[y].length){
			for (let i = 0; i < COLUMNS; i++) {
				var currentNote = guesses[y][i];
				var currentNoteName = currentNote.slice(0, -1);
				var noteGuessBox = document.getElementById((y + 1) + '-' + (i + 1));
				
				keys = document.getElementsByClassName(currentNoteName);
				// if right position and right octave (green)
				if(currentNote == answers[currentAnswer][i]){
					// if D4 is correct, set all other D's to gray
					Array.prototype.forEach.call(keys, function(key) {
						key.style.fill = colorWrong;
					});
					
					noteGuessBox.style.background=colorCorrect;
					document.getElementById(currentNote).style.fill = colorCorrect;
				} 
				// if wrong position but right octave (blue)
				else if(answers[currentAnswer].includes(currentNote)){
					// if D4 is right octave, set all other D's to gray
					Array.prototype.forEach.call(keys, function(key) {
						key.style.fill = colorWrong;
					});
					
					noteGuessBox.style.background = colorRightOctave;
					document.getElementById(currentNote).style.fill = colorCorrect;
				} 
				// if right position but wrong octave (yellow)
				else if(answerNoteNames.includes(currentNoteName)){
					noteGuessBox.style.background = colorRightPosition;
					// If D4 is yellow, then its not D4 (gray) but D3 and D5 are possible (yellow)
					Array.prototype.forEach.call(keys, function(key) {
						key.style.fill = colorRightPosition;
					});
					document.getElementById(currentNote).style.fill = colorWrong;
				}
				// note is not in the chord
				else{
					noteGuessBox.style.background = colorWrong;
					document.getElementById(currentNote).style.fill = colorWrong;
					Array.prototype.forEach.call(keys, function(key) {
						key.style.fill = colorWrong;
					});
				}
			}
			
			let s = guesses[y].toString()
			// if all correct
			if(guesses[y].toString() === answer){
				win(answers[currentAnswer][5]);
				y = 99;	// set out of bounds because u won
				return;
			}
			x = 0;
			y++;
			// loss
			if(y >= 5){				
				var popup = document.getElementById("alert-lose");
				popup.style.visibility = "visible";
				var popupText = document.getElementById("alert-lose-text");
				popupText.innerText = "Better luck next time! The chord was: " + answers[currentAnswer][5];
				
				var i = 0;
				var notes = document.getElementsByClassName("lose-note");
				Array.prototype.forEach.call(notes, function(note) {
					note.innerText = answers[currentAnswer][i];
					i += 1;
				});
			}
		}
		else{
			alert("Each chord has 5 unique pitches! Make sure your guess does too!");
		}
		
	}
}

function win(comment){
	var popup = document.getElementById("alert-win");
	popup.style.visibility = "visible";
	var popupText = document.getElementById("alert-win-text");
	popupText.innerText = "You got it! The chord was: " + comment;
	var i = 0;
	var notes = document.getElementsByClassName("win-note");
	Array.prototype.forEach.call(notes, function(note) {
		note.innerText = answers[currentAnswer][i];
		i += 1;
	});
}


document.getElementById("respell").addEventListener("click", respell);
function respell(){
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