<?php
	session_start();
?>

<html>
    <head>
        <title>Sign Up Page</title>
          <meta name="viewport" content="width=device-width, initial scale=1.0">
          <link rel="stylesheet" href="css/stylesheet.css">
		  <link href="https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap" rel="stylesheet">
			
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
        <!--<div id="sideBar">
             <ul>
             <li><a href="rules.php"><button>Play Game</button></a></li><br>
             <li><a href="signIn.php"><button>Sign In</button></a></li><br>
             <li><a href="register.php"><button>Create an Account</button></a></li> <br>
            </ul>
        </div>-->
        <div id="signInheader">Create an account Here</div>
        <div id="signInImage"><img src="img/login.png"></div>
            
        <div id="signInMain"> 
            <form id="form" action="confirm.php" method="POST"> 
            <div id="signInInfo1">
                <a>Name: </a>
                <input id="name" name="name" type="text" required placeholder="Your name..">
                <br>
                <a>Surname: </a>
                <input id="surname" name="surname" type="text" required placeholder="Your surname..">
            </div>
            
              <button type="submit">LOG IN</button>
            <br><div id="error"></div>
            
          
        </div>
          
        <div id="signInMain2"> 
            <div id="signInInfo">
               <a> Username: </a> <br>
                <input id="username" name="username" type="text" placeholder="Your username..">
                <br>
               <br> 
                  <a> Password: </a> <br>
                <input id="password" name="password" type="password" placeholder="Your password.." ><br>
            </div>
			</form>
         
         </div>

     
        <div id="signInText"><h4>Already have an account? <a href="signIn.php">Click here to Sign In</a></h4></div>

         <script src="js/proto.js"></script>
    </div>        
    </body>
</.php>