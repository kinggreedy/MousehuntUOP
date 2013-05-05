<?php
	if ($_SERVER['REQUEST_METHOD'] == 'POST')
	{
		require 'connect.php';
		$team = $_POST['team'];
		$tour = $_POST['tour'];
		$status = $_POST['status'];
		$timeleft = $_POST['timeleft'];
		$fromip = $_SERVER['REMOTE_ADDR'];
		//INSERT INTO TOUR : TOURID , STATUS, TIMELEFT
		//INSERT : TOURID, TEAMID, IP
		//<?php
		//$dbh = new PDO('odbc:sample', 'db2inst1', 'ibmdb2');
		
		/* Delete all rows from the FRUIT table */
		//$count = $dbh->exec("DELETE FROM fruit WHERE colour = 'red'");
		
		/* Return number of rows that were deleted */
		//print("Deleted $count rows.\n");
		//
		//<?php
			//function getFruit($conn) {
				//$sql = 'SELECT name, color, calories FROM fruit ORDER BY name';
				//foreach ($conn->query($sql) as $row) {
					//print $row['name'] . "\t";
					//print $row['color'] . "\t";
					//print $row['calories'] . "\n";
				//}
			//}
		echo "OK";
	}
	else if ($_SERVER['REQUEST_METHOD'] == 'GET')
	{
		require 'connect.php';
		$arr = array('6931' => array('team' => array(0 => 947),'status' => 'active'),
					 '6936' => array('team' => array(0 => 11054),'status' => 'active'),
					 '6945' => array('team' => array(0 => 77350),'status' => 'pending'));
		echo json_encode($arr);
	}
?>