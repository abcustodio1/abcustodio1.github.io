function loadSpreadsheet() {

	var url = document.location.href;
	var gameId = new URL(url).searchParams.get("gameId");
	var playerId = new URL(url).searchParams.get("playerId");
	if (gameId && playerId) {
		var frameElement = document.getElementById("spreadsheet");
		frameElement.src = "https://docs.google.com/spreadsheets/d/"+gameId+"/edit?rm=minimal#gid="+playerId;
		frameElement.style.display = "block";

		var loadingElement = document.getElementById("loading");
		loadingElement.style.display = "none";
	}
	
	// try to play background music
	setTimeout(() => { 
			turnOnMusic(); 
	}, 5000);
}

function turnOnMusic() {
	var bgMusic = document.getElementById("bg-music");
	var volume = document.getElementById("volume");
	bgMusic.volume = volume.value/100; 
 	bgMusic.play().then(() => {
		// hide off icon, display on icon and volume slider
		document.getElementById("off").style.display = "none";
		document.getElementById("on").style.display = "block";
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
}

function updateVolume(volume) {
	var bgMusic = document.getElementById("bg-music");
	bgMusic.volume = volume/100;        
}