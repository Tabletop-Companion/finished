<?php 
		session_start();
			$_SESSION["id"] = null;
			$_SESSION["username"] = null;
			$_SESSION["name"] = null;
			$_SESSION["games"] = null;
			$_SESSION["wins"] = null;
			$_SESSION["losses"] = null;
			session_destroy();
		?>

<html>
    <head>
        <title>Sign Up Page</title>
          <meta name="viewport" content="width=device-width, initial scale=1.0">
          <link rel="stylesheet" href="css/stylesheet.css">
		  <link href="https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap" rel="stylesheet">
            </head>
    <body>
    <div class="loggedOutContainer">
        <nav>
            <div class="logo"> 
                <a class="header-logo"><img src="img/catan.png"></a>
                <a class="header-img"><img src="img/settlers-of-catan-logo.png"></a>
            </div>
            
            <div class="navBar">
                <ul>
                <li><a href="account.php">Account</a></li>  
                <li><a href="faq.php">FAQ</a></li>
                <li><a href="tutorial.php">Tutorial</a></li>
                <li><a href="home.php">Homepage</a></li>
               </ul>
            </div>      
        </nav>
    
        <div id="loggedOutMain">

        <div id ="loggedOutText">
         <a>You are now logged out! </a>
         </div>
        </div>
     
 
        <!-- <div id="signInText"><h4>Already have an account? <a href="signIn.php">Click here to Sign In</a></h4></div> -->

         <script src="js/proto.js"></script>
    </div>        
    </body>
</html>