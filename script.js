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