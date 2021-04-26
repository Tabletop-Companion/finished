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
        <header>How can we help you?</header>
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
            <li><a href="faq2.php">Knight / Monopoly</a></li><br>
            <li><a href="faq3.php">Road Building / Longest Road</a></li><br>
            <li><a href="faq4.php">Gameplay / Largest Army / Roads </a></li><br>
            <li><a href="faq5.php"> Resources </a></li><br>
            <li><a href="faq6.php">Rolling a 7 the Robber</a></li><br>
            <li id="current"><a href="faq7.php">Trade / Victory / Victory Point</a></li><br>
             <li><a href="faq8.php">Cities and Settlements</a></li><br>
             </div>
        </div>
        
        <div id="questions">
            
        <!------------Trade / Victory / Victory Point----------->
            
        <button class="accordion">Q1. If the Robber is blocking a tile, can the player still trade for that resource? </button>
        <div class="panel">
        <p>A1. Yes, the Robber only stops the tile from generating the resource, it doesn’t stop the player from obtaining it in other ways.
        </p>
        </div>
        
        <button class="accordion">Q2. Is a “triangular trade” permitted? On player A’s turn, are player B and player C allowed to trade with each other if afterwards one of them uses the obtained resource for trading with player A?</button>
        <div class="panel">
         <p>A2. No, players may only trade with the player whose turn it is.</p>
        </div>
        
        <button class="accordion">Q3. Can I give away resources?</button>
        <div class="panel">
         <p>A3. No, trades must be mutual, though not necessarily equal, both players must give up one or more Resource Cards in return for other Resource Cards.</p>
        </div>
            
        <button class="accordion">Q4. Can I trade in secret?</button>
        <div class="panel">
        <p>A4. No, trades are done out in the open, and as such everyone knows what was traded.</p>
        </div>
            
         <button class="accordion">Q5. Can I trade with a Harbor on the same turn as I build it?</button>
        <div class="panel">
         <p>A5. No, the build phase comes after the trade phase.</p>
        </div>
            
        <button class="accordion">Q6. Can I trade at a Harbor where an opponent is settled?</button>
        <div class="panel">
         <p>A6. No, you must own the Harbor to use it.</p>
        </div>
            
        <button class="accordion">Q7. Can I trade on credit? E.g. A player trades me 3 wool on the promise I trade him 2 wood next turn?</button>
        <div class="panel">
        <p>A7. No, you can only trade resources that you have available to you, and cannot give away Resource Cards.</p>
        </div>
            
        <button class="accordion">Q8. When can I declare victory?</button>
        <div class="panel">
        <p>A8. During your own turn, if you have enough Victory points.</p>
        </div>
        
        <button class="accordion">Q9. If a player has enough Victory Points but doesn’t realise and doesn’t declare it, do they still win?</button>
        <div class="panel">
        <p>A9. Yes, they win as soon as they have 10 Victory points on their turn.</p>
        </div>
            
       <button class="accordion">Q10. Does the one Development Card per turn limit apply to Victory Point Cards?</button>
        <div class="panel">
        <p>A10. No, unlike other Development Cards, you do not play Victory Point Cards, instead you reveal them when you have enough to win the game, at which point you reveal all Victory Point Cards in hand.</p>
        </div>       
            
        </div>
        
         <script src="js/faq.js"></script>
    </div>        
    </body>
</html>