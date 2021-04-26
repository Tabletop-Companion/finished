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
            <li><a href="faq7.php">Trade / Victory / Victory Point</a></li><br>
             <li id="current"><a href="faq8.php">Cities and Settlements</a></li><br>
             </div>
        </div>

        <div id="questions">
            
        <!------------------Cities and Settlements-------------->
            
        <button class="accordion">Q1. Can I build a City without having an existing Settlement?</button>
        <div class="panel">
        <p>A1. No, Cities upgrade existing Settlements, though you can buy a Settlement then immediately upgrade it into a City.
        </p>
        </div>
        
        <button class="accordion">Q2. Can I build a Settlement/City on an interrupted road?</button>
        <div class="panel">
         <p>A2. Yes, if you own the road it’ll connect to.</p>
        </div>
        
        <button class="accordion">Q3. Can I build a Settlement at a Harbour during the set-up phase?</button>
        <div class="panel">
         <p>A3. Yes, if that’s what you want.</p>
        </div>
            
        <button class="accordion">Q4. Can I build a Settlement/City on an intersection of my road?</button>
        <div class="panel">
        <p>A4. Yes, and it does not interrupt the road.</p>
        </div>
            
         <button class="accordion">Q5. Can I Sell/Remove/Move a Settlement?</button>
        <div class="panel">
         <p>A5. No, once built, a Settlement is there for the remainder of the game.</p>
        </div>
            
        <button class="accordion">Q6. Can I build a settlement on an intersection that does not connect to any Roads?</button>
        <div class="panel">
         <p>A6. Only during the set-up phase.</p>
        </div>
            
        <button class="accordion">Q7. What is the Distance Rule?</button>
        <div class="panel">
        <p>A7. The Distance Rule states that to be able to build on an intersection, that intersection must have 3 adjacent intersections that are not being occupied by a settlement.</p>
        </div>
            
        <button class="accordion">Q8. What happens to my Settlement after I upgrade it to a City?</button>
        <div class="panel">
        <p>A8. the settlement returns to your supply pile to be built again.</p>
         </div>
            
        </div>
        
         <script src="js/faq.js"></script>
    </div>        
    </body>
</html>