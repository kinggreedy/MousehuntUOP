<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	require 'connect.php';
	$team = $_POST["team"];
	$tour = $_POST["tour"];
	$status = $_POST['status'];
	$timeleft = $_POST['timeleft'];
	$fromip = ip2long($_SERVER['REMOTE_ADDR']);

	$sql = "INSERT INTO Tour(ID,status,timeleft) SELECT ?,?,? WHERE NOT EXISTS (SELECT * FROM Tour WHERE ID = ?)";
	$count = $conn->prepare($sql);
	$count->execute(array($tour,$status,$timeleft,$tour));
	
	$sql = "UPDATE Tour SET status = ?, timeleft = ? WHERE ID = ?";
	$count = $conn->prepare($sql);
	$count->execute(array($status,$timeleft,$tour));
	
	$sql = "INSERT INTO Team(ID,tourID,IP) SELECT ?,?,? WHERE NOT EXISTS (SELECT * FROM Team WHERE ID = ? AND tourID = ?)";
	$count = $conn->prepare($sql);
	$count->execute(array($team,$tour,$fromip,$team,$tour));

	echo "OK";
}
else if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
	require 'connect.php';
	
	$arr = array();
		
	$sql = 'SELECT ID, status, timeleft FROM Tour ORDER BY ID';
	$res = $conn->query($sql);
	
	$sql = 'DELETE FROM Tour WHERE ID = ?';
	$count = $conn->prepare($sql);
	
	foreach ($res as $row) {
		if ($row['timeleft'] < (time() + 30 * 60))
		{
			$count->execute(array($row['ID']));
		}
		else
		{
			$arr[$row['ID']] = array('team' => array(),'status' => $row['status'],'timeleft' => $row['timeleft']);
		}
	}

	$sql = 'SELECT ID, tourID FROM Team';
	$res = $conn->query($sql);
	foreach ($res as $row) {
		array_push($arr[$row['tourID']]['team'], $row['ID']);
	}

	echo json_encode($arr);
}
?>