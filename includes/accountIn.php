<?php
	session_start();
	$db = new SQLite3('accounts.db');
	$db->exec("CREATE TABLE IF NOT EXISTS accounts(id INTEGER PRIMARY KEY, username TEXT, name TEXT, password TEXT,games INTEGER,wins INTEGER,losses INTEGER,active1 TEXT, active2 TEXT, active3 TEXT);");
	
	
	$firstname = "";
	$surname = "";
	$username = "";
	$password = "";
	$confirm = "";


	
	if (isset($_POST["name"])){
		$firstname = $_POST["name"];
	}
	if (isset($_POST["surname"])){
		$surname = $_POST["surname"];
	}
	if (isset($_POST["username"])){
		$username = $_POST["username"];
	}
	if (isset($_POST["password"])){
		$password = $_POST["password"];
	}

	$hashedPassword = password_hash($password, PASSWORD_BCRYPT);
	$nextID = $db->querySingle("SELECT COUNT(*) as count FROM accounts") +1;
	$name = $firstname." ".$surname; 
 
	$checkUserExists = 'SELECT * from accounts WHERE username = :username';
	$stmt = $db->prepare($checkUserExists);
	$stmt->bindParam(1, $username);
	$result = $stmt->execute();
	$count = 0;
	while (($row = $result->fetchArray())) {
		$count++;
	}
	
	if ($count >0){
		$confirm = "USERNAME TAKEN";
	}
	
	else{
		$db->exec("INSERT INTO accounts(id,username,name,password) VALUES('$nextID','$username','$name','$hashedPassword');");
		mkdir("gameSaves/".$username);
		$confirm = "Account Made! Hello ".$username."!";
	}
	
?>