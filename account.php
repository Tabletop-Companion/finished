<?php session_start();?>
<html>
    <head>
        <title>Account Page</title>
          <meta name="viewport" content="width=device-width, initial scale=1.0">
          <link rel="stylesheet" href="css/stylesheet.css">
          <link rel="stylesheet" href="css/style.php">
        <link href="https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap" rel="stylesheet">
        </head>
    <body>
    <div class="accountContainer">
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
					<form class="form" action="loggedOut.php" method="POST">
					<button type="submit">LOG OUT</button>
					</form></div></li>
					<script src="js/proto.js"></script>';
				}
				else{
					echo "<li><a href=\"signIn.php\"><button>Sign In</button></a></li><br>";
				}
				?>
             <li><a href="register.php"><button>Create an Account</button></a></li> <br>
            </ul>
        </div>
        
       <div id="accountHeader">Account</div>
        <div id="accountInfo1">
		<div id="subHeader1">General information:</div>
        <div id="accountText">
		<?php
			if (isset($_SESSION["id"])){
			echo 
            "<div id=\"subDetail1\"> 
                <a>Your name: </a>".$_SESSION["name"].
                "<br>
                <a> Your username: </a>".$_SESSION["username"]."
            </div>";
			}
			else{
				echo "YOU MUST BE LOGGED IN TO SEE ACCOUNT INFO";
			}
         ?>     
         </div> 
        </div>
        
        <!--------------change password--------------->
       <div id="accountInfo2">
        <div id="subHeader2">Change Password:</div>
        <div id="passwordChanged">
		<?php
		if (isset($_SESSION["id"])){
         echo 
			"<form id=\"form\" action=\"passwordChanged.php\" method=\"POST\">
                <div id=\"signInInfo\">
               <a> Old Password: </a> <br>
                <input id=\"oldPassword\" name=\"oldPassword\" type=\"password\" placeholder=\"Your password...\" ><br>
               <br> 
                  <a> New Password: </a> <br>
                <input id=\"newPassword\" name=\"newPassword\" type=\"password\" placeholder=\"Your password...\" ><br>
				<br> 
                  <a> Repeat Password: </a> <br>
                <input id=\"verifyPassword\" name=\"verifyPassword\" type=\"password\" placeholder=\"Your password...\" ><br>
   
         
            <br><button type=\"submit\">Change Password</button>
            <br><div id=\"error\"></div>
            </form>";
		}
		else{
			echo "YOU MUST BE LOGGED IN TO SEE ACCOUNT INFO";
		}
		?>
        </div>
        </div>
        
      </div>
    </body>
</html>