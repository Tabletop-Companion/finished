<?php
	session_start();
?>

<html>
	<head>
		<title>Rules Page</title>
		<meta name="viewport" content="width=device-width, initial scale=1.0">
		<link rel="stylesheet" href="css/stylesheet.css">
		<link href="https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Prompt:wght@600&display=swap" rel="stylesheet">
		<script src="js/loadGame.js"></script>
	</head>
				
	<body>
		<div class="rulesContainer">
			<nav>
				<div class="logo"> 
					<a class="header-logo"><img src="img/catan.png"></img></a>
					<a class="header-img"><img src="img/settlers-of-catan-logo.png"></img></a>
				</div>
				
				<div class="navBar">
					<ul>
						<li><a href="account.php">Account</a></li>  
						<li><a href="faq.php">FAQ</a></li>
						<li><a href="tutorial.php">Tutorial</a></li>
						<li><a href="home.php">Homepage</a></li>
					</ul>				
				</div>      
			</nav>
			
			<div id="rulesHeader">Select rules to Start the Game</div>
				<div id="rules1">  
					<div id="rulesHd">
						<a>Board Generation: Please choose between the beginner non-random board or a generated board </a><br>
					</div>
						<input type="radio" name="rule5" value="Beginner Board" id="beginnerBoard" />								<label for="beginnerBoard">Beginner Board</label><br>
						<input type="radio" name="rule5" value="Generated Board" id="generatedBoard" /> 
						<label for="generatedBoard">Random Board</label><br>
					</div>

					<div id="rules2">
						<div id="rulesHd">
							<a>Ports Generation: Please choose between the beginner non-random ports or a generated ports </a><br>
						</div>
								
								<input type="radio" name="rule6" value="Beginner Ports" id="beginnerPorts"/>
								<label for="beginnerPorts">Beginner Ports</label> 
								<br>
								<input type="radio" name="rule6" value="Generated Ports" id="generatedPorts"/> 
								<label for="generatedPorts">Random Ports</label>
								<br>  
							</div>
							<div id="rules3">
								<div id="rulesHd">
									<a>Victory Points: Please choose how many Victory points to go to </a>
									<br>
								</div>
								
								<input type="radio" name="rule7" value="8 Victory Points" id="8VP" />
								<label for="8VP">8 victory points (Short game, not recommended for 4 players)</label> <br>
								<input type="radio" name="rule7" value="10 Victory Points" id="10VP"/> 
								<label for="10VP">10 victory points (Default Amount)</label>
								<br> 
								<input type="radio" name="rule7" value="12 Victory Points" id="12VP" /> 
								<label for="12VP">12 victory points (Long game, not recommended for 2 players)</label>
								<br> 
							</div>

							<div id="startGameButton">
								<button id="btn1">Play Game</button>
							</div>
							
							<div id="loadGames">
								<div id="load1">
								<button id="loadGame1" onclick="loadGame(1)"> Load Game </button>
								<a id="fileName1" class="fileName"><?php
									if (isset($_SESSION["active1"])) {
										echo "{$_SESSION['active1']}";
									} else {
										echo "Empty Slot";
									}
								?></a>
								</div>
								
								<div id="load2">
								<button id="loadGame2" onclick="loadGame(3)"> Load Game </button>
								<a id="fileName1" class="fileName"><?php
									if (isset($_SESSION["active2"])) {
										echo "{$_SESSION['active2']}";
									} else {
										echo "Empty Slot";
									}
								?></a>
								</div>
								
								<div id="load3">
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
								
							<script src="rules.js"></script>
						</div>        
					</body>
				</html>