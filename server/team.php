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
	
	$sql = "INSERT INTO Team(ID,tourID,IP) SELECT ?,?,? WHERE NOT EXISTS (SELECT * FROM Team WHERE ID = ? AND tourID = ?)";
	$count = $conn->prepare($sql);
	$count->execute(array($team,$tour,$fromip,$team,$tour));

	echo "OK";
}
else if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
	require 'connect.php';
	
	//$arr = array();
	//$sql = 'SELECT ID, status, timeleft FROM Tour ORDER BY ID';
	//$res = $conn->query($sql)
	//foreach ($res as $row) {
		//$arr[$row['ID']] = array('team' => array(),'status' => $row['status'],'timeleft' => $row['timeleft']);
	//}

	$arr = array('6931' => array('team' => array(947),'status' => 'active'),
				 '6936' => array('team' => array(11054),'status' => 'active'),
				 '6945' => array('team' => array(77350),'status' => 'pending'));
	echo json_encode($arr);
}
?>