<?php
    session_start();
    if(!empty($_POST['data'])){
        $data = $_POST['data'];
        $userName = $_POST['userName'];
        $title = $_POST['title'];
		$path = $userName . "/" . $title;
        $index = $_POST['index'];
        $id = $_SESSION["id"];

        $file = fopen($path, 'w');
        fwrite($file, $data);
        fclose($file);

        //change database
        $db = new SQLite3('../accounts.db');
        $db->exec("CREATE TABLE IF NOT EXISTS accounts(id INTEGER PRIMARY KEY, username TEXT, name TEXT, password TEXT,games INTEGER,wins INTEGER,losses INTEGER,active1 TEXT, active2 TEXT, active3 TEXT);");

        $findUser = 'SELECT * from accounts WHERE id = :id';
        $stmt = $db->prepare($findUser);
        $stmt->bindParam(1, $id);
        $result = $stmt->execute();
        while (($row = $result->fetchArray())) {
            $updateFile = "";
			
            switch($index){
                case 1: 
					$updateFile = 'UPDATE accounts SET active1 = :path WHERE id = :id';
					$_SESSION["active1"] = $title;
					break;
                case 2: 
					$updateFile = 'UPDATE accounts SET active2 = :path WHERE id = :id';
					$_SESSION["active2"] = $title;
					break;
                case 3: 
					$updateFile = 'UPDATE accounts SET active3 = :path WHERE id = :id';
					$_SESSION["active3"] = $title;
					break;
            }
			
            $stmt2 = $db->prepare($updateFile);
            $stmt2->bindParam(1, $title);
            $stmt2->bindParam(2, $id);
            $stmt2->execute();
        }
    }
?>