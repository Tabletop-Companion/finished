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
            <li id="current"><a href="faq6.php">Rolling a 7 the Robber</a></li><br>
            <li><a href="faq7.php">Trade / Victory / Victory Point</a></li><br>
             <li><a href="faq8.php">Cities and Settlements</a></li><br>
             </div>
        </div>

        <div id="questions">
            
        <!------------Rolling a 7 the Robber----------->
            
        <button class="accordion">Q1. If I roll a 7 can I trade with another player? </button>
        <div class="panel">
        <p>A1. If you roll a 7 you cannot trade with another player until after the results of it have been resolved..
        </p>
        </div>
        
        <button class="accordion">Q2. Can I blackmail a player with the Robber?</button>
        <div class="panel">
         <p>A2. Players can talk at any time, so you can blackmail a player into a future trade if you roll a 7.</p>
        </div>
        
        <button class="accordion">Q3. Can I place the Robber on the same hex he’s currently on?</button>
        <div class="panel">
         <p>A3.No, you must move the Robber to a new hex.</p>
        </div>
            
        <button class="accordion">Q4. Does the Robber prevent players building on that tile?</button>
        <div class="panel">
        <p>A4. No, the Robber, only prevents the collection of that tile’s resources.</p>
        </div>
            
         <button class="accordion">Q5. Can the Robber block a Harbor?</button>
        <div class="panel">
         <p>A5. No, it only blocks the collection of that tile’s resources.</p>
        </div>
            
        <button class="accordion">Q6. If I still have more than 7 cards after discarding, do I still need to discard?</button>
        <div class="panel">
         <p>A6. No, you only need to discard once when a 7 is rolled.</p>
        </div>
            
        <button class="accordion">Q7. If I move the Robber to the desert tile, can I still take a resource from a player?</button>
        <div class="panel">
        <p>A7. Yes, if there are adjacent Settlements.</p>
        </div>
            
        <button class="accordion">Q8. Do I continue with my turn as normal after rolling a 7?</button>
        <div class="panel">
        <p>A8.Yes, you continue with your turn as normal after resolving the roll.</p>
        </div>
        
        <button class="accordion">Q9. May I move the Robber to the Desert?</button>
        <div class="panel">
        <p>A9. Yes, the Desert is a valid tile.</p>
        </div>
            
       <button class="accordion">Q10. Can I move the Robber twice if I have a   Knight card?</button>
        <div class="panel">
        <p>A10. Yes, you may use a Knight to move the Robber a second time.</p>
        </div>
            
        <button class="accordion">Q11. Can I show a player my hand to dissuade them from stealing from me?</button>
        <div class="panel">
        <p>A11. No, your hand is private and should not be shown to other players.</p>
        </div>
            
        <button class="accordion">Q12. Can I give a card to an opponent instead of letting him draw it?</button>
        <div class="panel">
        <p>A12. No, you must let them pick the card at random.</p>
        </div>
            
        <button class="accordion">Q13. What happens if the play I try and steal from has no resource cards?</button>
        <div class="panel">
        <p>A13. You gain no resource cards.</p>
        </div>
        
            
        </div>
        
         <script src="js/faq.js"></script>
    </div>        
    </body>
</html>