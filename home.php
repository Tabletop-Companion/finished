<?php
	session_start();
?>

<html>
    <head>
        <title>Home Page</title>
          <meta name="viewport" content="width=device-width, initial scale=1.0">
          <link rel="stylesheet" href="css/stylesheet.css">

        <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Bad+Script&display=swap" rel="stylesheet">
	</head>
    <body>
    <div class="homeContainer">
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
        
       <div id="homeText">
           <a>Welcome to THE SETTLERS OF CATAN companion website! We are here to assist you. All of the information you need are all here! Including the FAQs, Tutorial, the main game companion and many more features. Enjoy!
           </a>
        </div>
        <div id="homeSlider">
          <div id="homeFrame">
                <div id="home-slides">
                <figure>
                <img src="img/home1.png" />
                <img src="img/home2.png" />
                <img src="img/home3.png" />
                <img src="img/home4.png" />
                </figure>
                </div>
            </div>  
        </div>
    </div>        
    </body>
</html>
