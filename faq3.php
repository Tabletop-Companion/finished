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
            <li id="current"><a href="faq3.php">Road Building / Longest Road</a></li><br>
            <li><a href="faq4.php">Gameplay / Largest Army / Roads </a></li><br>
            <li><a href="faq5.php"> Resources </a></li><br>
            <li><a href="faq6.php">Rolling a 7 the Robber</a></li><br>
            <li><a href="faq7.php">Trade / Victory / Victory Point</a></li><br>
             <li><a href="faq8.php">Cities and Settlements</a></li><br>
             </div>
        </div>
        
        <div id="questions">
         <button class="accordion">Q1. Does playing Road Building during my Trade Phase end it?
          </button>
        <div class="panel">
            <p>A1. No, unlike regular building activities that end the Trade Phase, Road Building does not, and may be played in the middle of the Trade Phase.
            </p>
        </div>
        
        <button class="accordion">Q2. Can the Longest Road be circular?</button>
        <div class="panel">
            <p>A2. Yes, so long as the road is continuous (An opponent has not got a settlement breaking the connection between road pieces at any point).</p>
        </div>
        
        <button class="accordion">Q3. Do my settlements interrupt my roads? </button>
        <div class="panel">
            <p>A3. No, only opposing settlements.</p>
        </div>
          <button class="accordion">Q4. How can I interrupt a road?</button>
        <div class="panel">
            <p>A4. You should try to build a settlement between an opponent’s road pieces, this will interrupt the road and make it ineligible for the Longest Road.</p>
        </div>
         <button class="accordion">Q5. Can I fix an interrupted Road?</button>
            <div class="panel">
            <p>A5. You cannot remove an opponent’s settlement, however you may be able to continue building the road in such a way that it is no longer interrupted by the opponent’s settlement.</p>
            </div>
        <button class="accordion">Q6. What happens if two roads are tied for Longest Road?</button>
        <div class="panel">
            <p>A6. The Longest Road Card stays with the original owner.</p>
        </div>
        <button class="accordion">Q7. What Happens when the Longest Road is broken?</button>
        <div class="panel">
        <p>A7. The card goes to the owner of the new Longest Road, or if no one is eligible for the Longest Road, it is owned by no one.</p>
        </div>
        </div>
        
         <script src="js/faq.js"></script>
    </div>        
    </body>
</html>