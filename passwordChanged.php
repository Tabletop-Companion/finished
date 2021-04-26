<?php session_start(); ?>
<html>
    <head>
        <title>Sign Up Page</title>
          <meta name="viewport" content="width=device-width, initial scale=1.0">
          <link rel="stylesheet" href="css/stylesheet.css">
          <link rel="stylesheet" href="css/style.php">
		  <link href="https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap" rel="stylesheet">
			<?php include 'includes/changePassword.php' ?>
            </head>
    <body>
    <div class="registerContainer">
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
             <div id="logOutButton">
             <?php
				if (isset($_SESSION["id"])){
				echo 
				"<li><a href=\"rules.php\"><button>Play Game</button></a></li><br>
				<div id=\"logOutButton\">
				<form id=\"form\" action=\"loggedOut.php\" method=\"POST\">
				 <button type=\"submit\">LOG OUT</button>
				</div>
				</form>
				 <script src=\"js/proto.js\"></script>";
				}
				else{
					echo "<li><a href=\"signIn.php\"><button>Sign In</button></a></li><br>";
				}
				?>
            </div>
           
            </ul>
        </div>
    
        <div id="signInMain"> 
         <?php echo $confirm ?>     
        </div>
          
 
      

         <script src="js/proto.js"></script>
    </div>        
    </body>
</html>