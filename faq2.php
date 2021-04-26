<?php
	session_start();
?>

<html>
    <head>
        <title>FAQ Page</title>

            <meta name="viewport" content="width=device-width, initial scale=1.0">
            <link rel="stylesheet" href="css/stylesheet.css">
         <link href="https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap" rel="stylesheet">
            </head>
    
    <body>
    <div class="container">
        <nav>
            <div class="logo"> 
                <a class="header-logo"><img src="img/catan.png"></a>
                <a class="header-img"><img src="img/settlers-of-catan-logo.png"></a></div>
            <div class="navBar">
                <ul>
                <li><a href="account.php">Account</a></li>  
                <li><a href="faq.php">FAQ</a></li>
                <li><a href="tutorial.php">Tutorial</a></li>
                <li><a href="home.php">Homepage</a></li>
               </ul>
            </div>      
        </nav>
        <header>How can we help you? </header>
          <div id="sideBar">
             <ul>
             <?php
                if (isset($_SESSION["id"])){
					echo '<li><a href="rules.php"><button>Play Game</button></a></li><br>
						<li><div id="logOutButton">
						<form id="form" action="loggedOut.php" method="POST">
						<button type="submit">LOG OUT</button>
						</form></div></li>
						<script src="js/proto.js"></script>';
                } else {
					echo '<li><a href="signIn.php"><button>Sign In</button></a></li><br>';
                }
             ?>
             <li><a href="register.php"><button>Create an Account</button></a></li> <br>
            </ul>
        </div>
        
        <div id="category">
            <div>
            <br><br>
            <li><a href="faq.php">Development Cards</a></li><br>
            <li id="current"><a href="faq2.php">Knight / Monopoly</a></li><br>
            <li><a href="faq3.php">Road Building / Longest Road</a></li><br>
            <li><a href="faq4.php">Gameplay / Largest Army / Roads </a></li><br>
            <li><a href="faq5.php"> Resources </a></li><br>
            <li><a href="faq6.php">Rolling a 7 the Robber</a></li><br>
            <li><a href="faq7.php">Trade / Victory / Victory Point</a></li><br>
             <li><a href="faq8.php">Cities and Settlements</a></li><br>
             </div>
        </div>
        
        <div id="questions">
         <button class="accordion">Q1. Do players with more than 7 cards have to discard half of them when a Knight card is played?
            </button>
        <div class="panel">
            <p>A1. No, this rule only applies to when a 7 is rolled, when a Knight is played, all other rules regarding moving the Robber apply (Move the Robber to a tile, choose a player with a settlement adjacent to that tile and take a random card from their hand).
            </p>
        </div>
        
        <button class="accordion">Q2. When can I play the Knight card? Can I play it before rolling the dice, or only after?</button>
        <div class="panel">
            <p>A2. A player can play a Knight card before or after they roll the dice on their turn.</p>
        </div>
        
        <button class="accordion">Q3. What happens after I play a Knight card?</button>
        <div class="panel">
            <p>A3. Leave the Knight card face up in front of you for the rest of the players to see it, allowing everyone to keep track of the largest army.</p>
        </div>
          <button class="accordion">Q4. Does the Robber have to be on a tile I have a settlement on to play a Knight?</button>
        <div class="panel">
            <p>A4. No, you may play a Knight without having the Robber on your tile.</p>
        </div>
         <button class="accordion">Q5. Can I force the other players to show me their hand to prove they have given me all resources of the declared type?</button>
            <div class="panel">
            <p>A5. No, it is assumed that players are honest in the rules, a player who lies about not having the declared resource is cheating.</p>
            </div>
            <button class="accordion">Q6. Can I offer an opponent a trade in order to determine what resources they have?</button>
        <div class="panel">
            <p>A6. You may offer an opponent a trade to strategically determine what resources they have, however they are required neither to accept it, not to be honest about what resources they own, until Monopoly is played.</p>
        </div>
        </div>
        
         <script src="js/faq.js"></script>
    </div>        
    </body>
</html>