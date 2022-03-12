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
}