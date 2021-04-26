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
            <li id="current"><a href="faq4.php">Gameplay / Largest Army / Roads </a></li><br>
            <li><a href="faq5.php"> Resources </a></li><br>
            <li><a href="faq6.php">Rolling a 7 the Robber</a></li><br>
            <li><a href="faq7.php">Trade / Victory / Victory Point</a></li><br>
             <li><a href="faq8.php">Cities and Settlements</a></li><br>
             </div>
        </div>
        
        <div id="questions">
         <button class="accordion">Q1. How do I place Harbor Pieces?
          </button>
        <div class="panel">
            <p>A1. A Harbor piece should be placed so both “points” of the tile line up with the vertices of a tile, so that there are two points which a settlement may be built upon to make use of the harbor.
            </p>
        </div>
        
        <button class="accordion">Q2.Who goes first?</button>
        <div class="panel">
            <p>A2. Traditionally, the oldest player goes first, however this is a formality for newer players, and another way of determining who goes first may be agreed upon.</p>
        </div>
        
        <button class="accordion">Q3. May I ally with another player against a third player?</button>
        <div class="panel">
            <p>A3. The rules do not prohibit this, meaning that you may do so if you wish.</p>
        </div>
          <button class="accordion">Q4. What should I do if another player now has a larger army than me?</button>
        <div class="panel">
            <p>A4. Give them the Largest Army Card and deduct 2 Victory Points from your score.</p>
        </div>
         <button class="accordion">Q5. Do unplayed Knights count towards the Largest Army?</button>
            <div class="panel">
            <p>A5. No, a knight must be played to be counted.</p>
        </div>
        <button class="accordion">Q6. Do unplayed Knights count towards the Largest Army?</button>
            <div class="panel">
            <p>A5. No, a knight must be played to be counted.</p>
        </div>
        <button class="accordion">Q7. Is a chain of individual road pieces that goes all around a terrain hex a closed continuous road?</button>
        <div class="panel">
        <p>A7. No, a road is only considered closed if it connects two settlements.</p>
        </div>
        <button class="accordion">Q8. How many roads can I build on my turn?</button>
            <div class="panel">
            <p>A8. As many as you can afford.</p>
        </div>
        <button class="accordion">Q9. Can I extend a road even if it’s interrupted?</button>
        <div class="panel">
        <p>A9. Yes, you can extend a road even if it’s interrupted by an opposing settlement.</p>
        </div>
        <button class="accordion">Q10.Can I build a road through another player’s settlement?</button>
        <div class="panel">
        <p>A10. No, if a settlement is in the way you may not build a road, as it would not be connected to a settlement or road owned by you.</p>
        </div>
        </div>
        
         <script src="js/faq.js"></script>
    </div>        
    </body>
</html>