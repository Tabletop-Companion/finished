<html>
    <head>
        <title>Sign Up Page</title>
          <meta name="viewport" content="width=device-width, initial scale=1.0">
          <link rel="stylesheet" href="css/stylesheet.css">
          <link rel="stylesheet" href="css/style.php">
		  <link href="https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap" rel="stylesheet">
			<?php include 'includes/accountIn.php' ?>
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
            <li><a href="signIn.php"><button>Sign In</button></a></li><br>
			<li><a href="register.php"><button>Create an Account</button></a></li>
            </ul>
        </div>

    
        <div id="signInMain"> 
            <div id="confirmText">
         <?php echo $confirm 
        ?> </div>
        </div>
          
 
<!--        <div id="signInText"><h4>Already have an account? <a href="signIn.php">Click here to Sign In</a></h4></div>-->

         <script src="js/proto.js"></script>
    </div>        
    </body>
