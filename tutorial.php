<?php
	session_start();
?>

<html>
    <head>
        <title>Tutorial Page</title>
          <meta name="viewport" content="width=device-width, initial scale=1.0">
          <link rel="stylesheet" href="css/stylesheet.css">

        <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@300anddisplay=swap" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Rammetto+Oneanddisplay=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Chakra+Petchanddisplay=swap" rel="stylesheet">
            </head>
    <body>
    <div class="tutorialContainer">
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
        
    <div id="tutorialHeader">
		<a>Tutorial</a>
    </div>
        
        
    <div id="tutorialSlider">
    
    <div class="slideshow-container">
 
    <div class="mySlides fade">
    <img src="img/tutorial1.png" style="width:1000px" height="500px">
      <div id="slideText"><a>1. The island of Catan lies before you. The isle consists of 19 terrain tiles surrounded by ocean. Your goal is to settle on Catan, & expand your territory until it becomes the largest & most glorious in Catan.</a>
     </div>
  </div>

  <div class="mySlides fade">
    <img src="img/tutorial2.png" style="width:1000px" height="500px">
    <div id="slideText"><a>2. There are five productive terrain types & one desert on Catan. Each terrain type produces a different type of resource (The desert produces nothing). Each resource you receive is represented by a card. Here's what each terrain produces.</a></div>
  </div>

                
  <div class="mySlides fade">
    <img src="img/tutorial3.jpg" style="width:1000px" height="500px">
    <div id="slideText"><a>3. You begin the game with 2 settlements & 2 roads. Each settlement is worth 1 victory point. You therefore start the game with 2 victory points! The first player to acquire around 10 (depends on the length of game chosen) victory points on their turn wins the game.</a> </div>
  </div>
             
                
  <div class="mySlides fade">
    <img src="img/tutorial4.jpg" style="width:1000px" height="500px">
    <div id="slideText"><a>4. To gain more victory points, you must build new roads, settlements & upgrade your settlements to cities. Each city is worth 2 victory points. To build or upgrade, you need to acquire resources. </a></div>
  </div>
                

  <div class="mySlides fade">
    <img src="img/tutorial5.jpg" style="width:1000px" height="500px">
   <div id="slideText"><a>5. How do you acquire resources? It is simple. Each turn, you roll 2 dice to determine which terrain hexes produce resources. Each terrain hex is marked with a round number token. If, for example, a "10" is rolled, all terrain hexes with a "10" number token produce resources-in the illustration above, those terrain hexes are a mountains hex (ore) & a hills hex (brick). </a></div>
  </div>
                
                
   <div class="mySlides fade">
    <img src="img/tutorial6.jpg" style="width:1000px" height="500px">
    <div id="slideText"><a>6. You only collect resources if you own a settlement or city bordering these terrain hexes. In the illustration, the red settlement [A] borders the "10" mountains & orange settlement [B] borders the "10" hills. If a "10" is rolled, the red player receives 1 ore card & the orange player receives 1 brick card. Cities collect twice the resources as settlements.</a></div>
  </div>
                
    
 <div class="mySlides fade">
    <img src="img/tutorial7.png" style="width:1000px" height="500px">
    <div id="slideText"><a>7. Since the settlements & cities usually border on 2-3 terrain types, they can "harvest" up to 3 different resources based on the dice roll. Here, the white settlement [C] borders on forest, mountains, & pasture. A settlement at [D] would only harvest the production from 2 terrain hexes (hills & mountains). Finally, a settlement at [E] would only harvest the production from 1 terrain hex (pasture). However [E] is also at a wool harbor. </a></div>
  </div>
                
 <div class="mySlides fade">
    <img src="img/tutorial8.jpg" style="width:1000px" height="500px">
    <div id="slideText"><a>8. Since it's impossible for you to have settlements adjacent to all terrain hexes & number tokens, you may receive certain resources only at rare intervals-or never. This is tough, because building requires specific resource combinations. </a> </div>
  </div>

 <div class="mySlides fade">
    <img src="img/tutorial9.jpg" style="width:1000px" height="500px">
    <div id="slideText"><a>9. For this reason, you can trade with other players. Make them an offer! A successful trade might yield you a big build! </a></div>
  </div>
                
 <div class="mySlides fade">
    <img src="img/tutorial10.png" style="width:1000px" height="500px">
    <div id="slideText"><a>10. You can only build a new settlement on an unoccupied intersection if you have a road leading to that intersection & the nearest settlement is at least two intersections away. </a></div>
  </div>
                
 <div class="mySlides fade">
    <img src="img/tutorial11.jpg" style="width:1000px" height="500px">
   <div id="slideText">11. Carefully consider where you build settlements. The numbers on the round tokens are depicted in varying sizes. They also have dots (pips) below the numbers. The taller the depicted number, & the more pips it has, the more likely that number is to be rolled. The red numbers 6 & 8 are the tallest numbers with the most pips; they are likely to be rolled most frequently.</div>
  </div>
  
  <div class="mySlides fade">
    <img src="img/tutorial12.png" style="width:1000px" height="500px">
   <div id="slideText">12. Whenever a 7 is rolled, everyone who is over 7 total resources has to get rid of half their resources.</div>
  </div>
  
  <div class="mySlides fade">
    <img src="img/tutorial13.png" style="width:1000px" height="500px">
   <div id="slideText">13. We have added an admin menu that can change resources or victory points. It can be accessed by pressing the grave key. (¬). You can also delete buildings by hovering over them & pressing the 'DELETE' key.</div>
  </div>

  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
</div>
<br>

<div style="text-align:center">
  <span class="dot" onclick="currentSlide(1)"></span>
  <span class="dot" onclick="currentSlide(2)"></span>
  <span class="dot" onclick="currentSlide(3)"></span>
  <span class="dot" onclick="currentSlide(4)"></span>
  <span class="dot" onclick="currentSlide(5)"></span>
  <span class="dot" onclick="currentSlide(6)"></span>
  <span class="dot" onclick="currentSlide(7)"></span>
  <span class="dot" onclick="currentSlide(8)"></span>
  <span class="dot" onclick="currentSlide(9)"></span>
  <span class="dot" onclick="currentSlide(10)"></span>
  <span class="dot" onclick="currentSlide(11)"></span>
  <span class="dot" onclick="currentSlide(12)"></span>
  <span class="dot" onclick="currentSlide(13)"></span>
    
</div>
        </div>
              <script src="js/slideshow.js"></script>
    </div>
        
            
        
    </body>
</html>