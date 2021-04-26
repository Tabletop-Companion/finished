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
            <li id="current"><a href="faq5.php"> Resources </a></li><br>
            <li><a href="faq6.php">Rolling a 7 the Robber</a></li><br>
            <li><a href="faq7.php">Trade / Victory / Victory Point</a></li><br>
             <li><a href="faq8.php">Cities and Settlements</a></li><br>
             </div>
        </div>
        
        <div id="questions">
            
        <!--------------Resources--------->
         <button class="accordion">Q1. Can I choose not to take Resource Cards?
          </button>
        <div class="panel">
            <p>A1. No, you must take any and all resources that you roll, unless there are no resources left to take from the bank, or there are not enough resources left for each player to take their owed resources (in which case the disputed resources go to no one).
            </p>
        </div>
        
        <button class="accordion">Q2. Do I need to tell my opponents how many Resource Cards I have in my hand?</button>
        <div class="panel">
         <p>A2. Yes, you must let your opponents know how many of your cards are Resource Cards if asked, though you are not required to tell them what type they are.</p>
        </div>
        
        <button class="accordion">Q3. Do I have to keep my resource cards face down?</button>
        <div class="panel">
         <p>A3.Yes, your opponents should not know how many of each Resource Card you currently have, only the total amount.</p>
        </div>
            
          <button class="accordion">Q4. What happens if I am owed a resource but there is not enough of it in the bank?</button>
        <div class="panel">
        <p>A4. If there are multiple players owed that resource, neither player gets the resource, however if you are the only person who is owed it as a result of that roll, you take all remaining Resource Cards of that type.</p>
        </div>
            
         <button class="accordion">Q5. What happens if multiple players are owed a resource but there is not enough for everyone?</button>
        <div class="panel">
         <p>A5. No players get that resource for the turn.</p>
        </div>
            
         <button class="accordion">Q6. Can I add more cards to the supply piles?</button>
        <div class="panel">
         <p>A6. If you want to, you may play Catan with more cards that are in the box, such as if you own multiple sets of the game.</p>
        </div>
         <button class="accordion">Q7. Can I count how many cards are left in the supply pile?</button>
        <div class="panel">
         <p>A7. Only if you are distributing the cards and have reason to believe there is not enough for everyone.</p>
        </div>
        
            
        </div>
        
         <script src="js/faq.js"></script>
    </div>        
    </body>
</html>