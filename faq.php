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
        
        <!-- categoryy-->
        <div id="category">
            <div>
            <br><br>
            <li id="current"><a href="faq.php">Development Cards</a></li><br>
            <li><a href="faq2.php">Knight / Monopoly</a></li><br>
            <li><a href="faq3.php">Road Building / Longest Road</a></li><br>
            <li><a href="faq4.php">Gameplay / Largest Army</a></li><br>
            <li><a href="faq2.php">Resources/ Roads /Cities and Settlements</a></li><br>
            <li><a href="faq3.php">Rolling a 7 the Robber</a></li><br>
            <li><a href="faq4.php">Trade / Victory / Victory Point</a></li><br>
             </div>
        </div>
        
        <div id="questions">
         <button class="accordion">Q1. How Many Development Cards can I buy on my turn?</button>
        <div class="panel">
            <p>A1. You may buy as many as you can afford with your resources.</p>
        </div>
        
        <button class="accordion">Q2. Can I play a Development Card on the same turn I buy them?</button>
        <div class="panel">
            <p>A2. A Development Card may not be played on the same turn it is bought.</p>
        </div>
        
        <button class="accordion">Q3. How many Development Cards may I play in a turn?</button>
        <div class="panel">
            <p>A3. You are limited to playing only one development card a turn, and it must not have been bought on that same turn.</p>
        </div>
          <button class="accordion">Q4. May I play a Development Card before rolling?</button>
        <div class="panel">
            <p>A4. Development Cards may be played before or after rolling, however you may only play one Development card a turn.</p>
        </div>
            <button class="accordion">Q5. What happens after I play a Development Card?</button>
        <div class="panel">
            <p>A5. If it is a Knight, keep it face up in front of you for other players to see, if it is another card (Invention, Monopoly, Road Building), if it is a Victory Point Card then you do not play them, and instead reveal them from your hand when they would grant you enough Victory Points to win the game.</p>
        </div>
            <button class="accordion">Q6. Do I have to play a Victory Point Card to get a Victory Point?</button>
        <div class="panel">
            <p>No, you should leave them in your hand until they would give you enough Victory Points to win, at which point you should reveal all your Victory Point Cards and declare victory.</p>
        </div>
        </div>
        
         <script src="js/faq.js"></script>
    </div>        
    </body>
</.php>