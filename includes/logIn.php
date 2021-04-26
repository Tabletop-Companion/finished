<?php
	session_start();
	$db = new SQLite3('accounts.db');
	$db->exec("CREATE TABLE IF NOT EXISTS accounts(id INTEGER PRIMARY KEY, username TEXT, name TEXT, password TEXT,games INTEGER,wins INTEGER,losses INTEGER,active1 TEXT, active2 TEXT, active3 TEXT);");
	
	
	$username = "";
	$password = "";
	$id = "";
	$confirm = "";
		
	if (isset($_POST["username"])){
		$username = $_POST["username"];
	}
	if (isset($_POST["password"])){
		$password = $_POST["password"];
	}

	
	$checkUserExists = 'SELECT * from accounts WHERE username = :username';
	$stmt = $db->prepare($checkUserExists);
	$stmt->bindParam(1, $username);
	$result = $stmt->execute();
	
	while (($row = $result->fetchArray())) {
		$encryptedPass = $row['password'];
		if (($row['username'] == $username) && (password_verify($password, $encryptedPass))){
			$confirm ="Logged In! Welcome ".$row['name'].".";
			$_SESSION["id"] = $row['id'];
			$_SESSION["username"] = $row['username'];
			$_SESSION["name"] = $row['name'];
			$_SESSION["games"] = $row['games'];
			$_SESSION["wins"] = $row['wins'];
			$_SESSION["losses"] = $row['losses'];
		}
		else{
			 $confirm ="ERROR! Incorrect Username or Password!";
		}
	}
?>