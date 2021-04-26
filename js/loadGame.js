function loadGame(index) {
	var path = document.getElementById("fileName"+index).innerHTML;
	
	if (path == "Empty Slot") {
		return;
	}
	
	location.href = 'playGame.php?'.concat(index);
}