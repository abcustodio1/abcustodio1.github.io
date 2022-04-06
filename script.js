function highscoreData() {
	var lastGameDate = "04/06/2022";
	
	var scores = [
			{name:"ALEX",scores:[101,121,36,101,162,91,90,68,90,106,77,100,121,95]},
			{name:"ROMEO",scores:[103,148,74,111,123,124,115,122,107,83,173,152,190]},
			{name:"SHEKI",scores:[113,92,57,120,147,52,124,124,111,122,100,193,122,78]},
			{name:"HAZEL",scores:[68,102,76,76,99,102,67,86,101,85,100,136,105,105]},
			{name:"CLINT",scores:[103,120,125,112,113,90,115]},
			{name:"RK",scores:[71,86,80,125]},
			{name:"YVES",scores:[65]},
			{name:"NICOLE",scores:[154]},
			{name:"SHAIRA",scores:[86]},
			{name:"David",scores:[43,115,32,89,87,85,104,97,111,112,101,165]},
			{name:"PatMae",scores:[76,100,103]}
		     ]

	return {date: lastGameDate, playerScores: scores};
}
////////////////////////////////////////////////////////////////////////////////


function loadHighscores() {
	var data = highscoreData();
	
	// set date
	document.getElementById("highscore-latest-date").innerHTML = "(AVERAGE SCORE PER GAME FROM 03/13/2022 to "+data.date+")";


	var playerScores = data.playerScores;

	var scores = [];
	for (let i = 0; i < playerScores.length; ++i) {
		var playerData = playerScores[i];
		var playerName = playerData.name;
		var numberOfGames = playerData.scores.length;
		var averageScore = playerData.scores.reduce((partialSum, a) => partialSum + a, 0)/numberOfGames;

		scores.push({name: playerName, averageScore: averageScore.toFixed(2), numberOfGames: numberOfGames})
	}

	var sorted = scores.sort((a,b) => ((b.numberOfGames*1000) - (a.numberOfGames*1000)) + (b.averageScore - a.averageScore));

	var namesInnerHTML = "";
	for (let j = 0; j < sorted.length; ++j) {
		namesInnerHTML += ("<pre><strong>"+sorted[j].name+"</strong>        "+sorted[j].averageScore+" (Played "+sorted[j].numberOfGames+" games)</pre>\n");
	}
	// set scores
	document.getElementById("highscore-names").innerHTML = namesInnerHTML;
	
}

function toggleHighscore() {
	var highscoreDiv = document.getElementById("highscores");
	if (highscoreDiv.style.display == "none") {
		loadHighscores();
		highscoreDiv.style.display = "block";
	} else if (highscoreDiv.style.display == "block") {
		highscoreDiv.style.display = "none";
	}
}

function loadSpreadsheet() {

	var url = document.location.href;
	var gameId = new URL(url).searchParams.get("gameId");
	var playerId = new URL(url).searchParams.get("playerId");
	if (gameId && playerId) {
		setTimeout(() => { openSheet(gameId, playerId); },0);
	}
	
	// try to play background music
	setTimeout(() => { 
			turnOnMusic(); 
	}, 5000);
}

function openSheet(gameId, playerId) {
	var loadingText = document.getElementById("loading-text");
	var timeleft = 5;
	var openTimer = setInterval(function(){
  		if(timeleft <= 0){
    			clearInterval(openTimer);
    			var frameElement = document.getElementById("spreadsheet");
			frameElement.src = "https://docs.google.com/spreadsheets/d/"+gameId+"/edit?rm=minimal#gid="+playerId;
			frameElement.style.display = "block";

			var loadingElement = document.getElementById("loading");
			loadingElement.style.display = "none";			
  		} else {
			loadingText.innerHTML = "O p e n i n g &nbsp;&nbsp;  i n &nbsp;&nbsp;&nbsp;<span style=\"color: red; font-weight: bold; \">"+ timeleft +"</span>&nbsp;. . .";    			
  		}
  		timeleft -= 1;
	}, 1000);
}

function turnOnMusic() {
	var bgMusic = document.getElementById("bg-music");
	var volume = document.getElementById("volume");
	bgMusic.volume = volume.value/100; 
 	bgMusic.play().then(() => {
		// hide off icon, display on icon and volume slider
		document.getElementById("off").style.display = "none";
		document.getElementById("on").style.display = "block";
		document.getElementById("music-changer").style.display = "inline-block";
	}, () => {
		console.log("Music not played!");
	});	
}

function turnOffMusic() {
	var bgMusic = document.getElementById("bg-music");
	var volume = document.getElementById("volume");
 	bgMusic.pause();
	// hide on icon and volume slider, display on icon
	document.getElementById("off").style.display = "block";
	document.getElementById("on").style.display = "none";
	document.getElementById("music-changer").style.display = "none";
}

function updateVolume(volume) {
	var bgMusic = document.getElementById("bg-music");
	bgMusic.volume = volume/100;        
}

function changeMusic() {
	var musicChanger = document.getElementById("music-changer");
	var bgMusic = document.getElementById("bg-music");
	if (musicChanger.alt == "default") {
		musicChanger.src = "leni.png";
		musicChanger.alt = "leni";
		bgMusic.src = "bg-music.mp3";
		bgMusic.play();	
	} else if (musicChanger.alt == "leni") {
		musicChanger.src = "default.jpg";
		musicChanger.alt = "default";
		bgMusic.src = "leni.mp3";
		bgMusic.play();
	}
}
