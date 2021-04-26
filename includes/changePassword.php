<?php
	session_start();
	$db = new SQLite3('accounts.db');
	$db->exec("CREATE TABLE IF NOT EXISTS accounts(id INTEGER PRIMARY KEY, username TEXT, name TEXT, password TEXT,games INTEGER,wins INTEGER,losses INTEGER,active1 TEXT, active2 TEXT, active3 TEXT);");
	
	
	$oldPassword = "";
	$newPassword = "";
	$verifyPassword = "";
	$confirm = "";
	$id = $_SESSION["id"];
	
	if (isset($_POST["oldPassword"])){
		$oldPassword = $_POST["oldPassword"];
	}
	if (isset($_POST["newPassword"])){
		$newPassword = $_POST["newPassword"];
	}
	if (isset($_POST["verifyPassword"])){
		$verifyPassword = $_POST["verifyPassword"];
	}
	
	
	$hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
	
	$findUser = 'SELECT * from accounts WHERE id = :id';
	$stmt = $db->prepare($findUser);
	$stmt->bindParam(1, $id);
	$result = $stmt->execute();
	while (($row = $result->fetchArray())) {
		$encryptedPass = $row['password'];
	
		if (password_verify($oldPassword, $encryptedPass)){
			if ($newPassword == $verifyPassword){
				if(strlen($newPassword)>6){		
					$updatePass = 'UPDATE accounts SET password = :password WHERE id = :id';
					$stmt2 = $db->prepare($updatePass);
					$stmt2->bindParam(1, $hashedPassword);
					$stmt2->bindParam(2, $id);
					$stmt2->execute();
					$confirm = "Password Changed!";
				}
				else{ 
					$confirm = "Password must be longer than 6 characters!";
				}
			}
			else{
				$confirm = "Passwords do not match!";
			}
		}
		else{
			 $confirm ="Old Password Incorrect!";
		}
	}
	
?>