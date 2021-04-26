<?php session_start(); ?>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Play Game page</title>         
		<link rel= "stylesheet" href="css/stylesheet.css">
		<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap" rel="stylesheet">
		<script src="js/p5.js"></script>
		<script src="rules.js"></script>
	</head>

	<body>
		<div class="playGameContainer">
			<nav>
				<a class="header-logo"><img src="img/catan.png"></img></a>
				<a class="header-img"><img src="img/settlers-of-catan-logo.png"></img></a>

				<ul>
					<li><a href="account.php">Account</a></li>  
					<li><a href="faq.php">FAQ</a></li>
					<li><a href="tutorial.php">Tutorial</a></li>
					<li><a href="home.php">Homepage</a></li>
				</ul>
			</nav>
			
			
			<a id="userName" style="visibility: hidden;"><?php echo "{$_SESSION['username']}"; ?></a>
			
			<div id="game">
				<form id="nameForm">
										<label for="name1">Player 1:</label>
										<input type="text" id="name1" name="name1" value="Thomas"></input>
										<label for="name2">Player 2:</label>
										<input type="text" id="name2" name="name2" value="Nini"></input>
										<label for="name3">Player 3:</label>
										<input type="text" id="name3" name="name3" value="Jay"></input>
										<label for="name4">Player 4:</label>
										<input type="text" id="name4" name="name4" value="Sam"></input>
										<button type="button" id="startButton" value="Start Game">Start Game</button>
									</form>

									<script src="js/game.js"></script>

									<div class="tradeForm" id="bankForm" style="visibility: hidden;">
										<select id="input">
										</select>

										<select id="resType1">
										</select>

										<select id="ratio">
										</select>

										<select id="resType2">
										</select>

										<a id="output">0</a>

										<button onclick="tradeHUD.bankerWindow.trade()">Trade
										</button>
									</div>

									<div class="tradeForm" id="playerForm" style="visibility: hidden;">
										<select id="lose">
										</select>

										<select id="currentRes">
										</select>

										<a>for</a>

										<select id="gain">
										</select>

										<select id="playerRes">
										</select>

										<select id="otherPlayer">
										</select>

										<button onclick="tradeHUD.playerWindow.trade()">Trade
										</button>
									</div>
								</div>
			<div id="rulesInfo">
				<div id="naming">
					<a>Your current rules:</a>
					<p id="result5"> </p>
					<br>
					<p id="result6"></p>
					<br>
					<p id="result7"> </p>
					<br>
				</div>
				
				<script>
					var val5 = localStorage.getItem("textValue5");
					document.getElementById("result5").innerHTML= val5;
				
					var val6 = localStorage.getItem("textValue6");
					document.getElementById("result6").innerHTML= val6;
				
					var val7 = localStorage.getItem("textValue7");
					document.getElementById("result7").innerHTML= val7;
				</script>
			</div>
			
			<div id="saveLoad">
				<div id="slot1">
					<button id="saveGame1" onclick="saveGame(1)"> Save Game </button>
					<input class="saveName" id="saveName1"> </input>
						
					<button id="loadGame1" onclick="loadGame(1)"> Load Game </button>
					<a id="fileName1" class="fileName"><?php
						if (isset($_SESSION["active1"])) {
								echo "{$_SESSION['active1']}";
							} else {
								echo "Empty Slot";
							}
						?></a>
				</div>
						
				<div id="slot2">
					<button id="saveGame2" onclick="saveGame(2)"> Save Game </button>
					<input class="saveName" id="saveName2"> </input>
				
					<button id="loadGame2" onclick="loadGame(2)"> Load Game </button>
					<a id="fileName2" class="fileName"><?php 
							if (isset($_SESSION["active2"])) {
								echo "{$_SESSION['active2']}";
							} else {
								echo "Empty Slot";
							}
						?></a>
				</div>
				
				<div id="slot3">
					<button id="saveGame3" onclick="saveGame(3)"> Save Game </button>
					<input class="saveName" id="saveName3"> </input>
					
					<button id="loadGame3" onclick="loadGame(3)"> Load Game </button>
					<a id="fileName3" class="fileName"><?php 
							if (isset($_SESSION["active3"])) {
								echo "{$_SESSION['active3']}";
							} else {
								echo "Empty Slot";
							}
						?></a>	
				</div>
			</div>
			
			<div id="gameCredit">
				<a>Tile Art by Blaise Vincz</a>
			</div>
		</div>
	</body>


</html>