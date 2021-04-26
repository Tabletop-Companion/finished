<?php
/*** set the content type header ***/
/*** Without this header, it wont work ***/
header('Content-type: text/css');

$font_family = 'Raleway, sans-serif';
$font_size = '1.8em';
$border = '1px solid';
$text_align = 'center';
$margin_top = '100px';
$margin_bottom = '100px';
$padding = '10px';
$border_radius = '20px';
$opacity = '0.6';
 //$background_color = '(207,185,151)';

 //for account page
 $accFont_family = 'Raleway, sans-serif';
 $accFont_size = '1.2em';
 $line_height = '50%';
 $accBorder_radius = '5px';
 $accBorder = '3px solid #B39283';
 $accWidth = '70%';
 $accPadding = ' 12px 20px';
 $buttonBorder = 'none';
 $cursor = 'pointer';

 //for logout
 $logOut_width = '70%';
 $logOut_padding = '20px';

$logOut_radius= '10px';
$logOut_font = 'fantasy';
$logOut_fontSize = '16px';
//  width: 70%;
?>

#signInMain {
background-color:#E1C699;
font-family: <?=$font_family?>;
font-size: <?=$font_size?>;
text-align: <?=$text_align?>;
border-radius: <?=$border_radius?>;
}

#welcomeText , #confirmText {
    margin-top: <?=$margin_top?>;
    background-color: rgba(126, 25, 27, 0.8);
    color: #E1C699;
    opacity: <?=$opacity?> ;
    padding: <?=$padding?>;
}

#accountText , #accountText2, #passwordChanged{
font-family: <?=$accFont_family?>;
color: #80604D;
font-size: <?=$accFont_size?>;
}

#passwordChanged input{
 border-radius: <?=$accBorder_radius?>;
 background-color: oldlace;
 border: <?=$accBorder?>;
 width: <?=$accWidth?>;
 padding: <?=$accPadding?>;

}

#passwordChanged a{
    font-family: <?=$accFont_family?>;
    color: #80604D;
}

#passwordChanged button{
 border: <?=$buttonBorder?>;
 padding: <?=$accPadding?>;
 border-radius: <?=$accBorder_radius?>;
background-color: brown;
color: oldlace;
cursor: <?=$cursor?>;
}

#passwordChanged button:hover{
    background-color: #D1C0A8; 
}

#logOutButton button{
   width: <?=$logOut_width?>;
   background-color: #FB6D4C;
   color: white;
   font-family: <?=$logOut_font?>;
   font-size: <?=$logOut_fontSize?>;
   border: <?=$buttonBorder?>;
   padding: <?=$logOut_padding?>;
   border-radius: <?=$logOut_radius?>;
   cursor: <?=$cursor?>;
}

#logOutButton button:hover{
    background-color: brown;
}