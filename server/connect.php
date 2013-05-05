<?php
require 'config.php';

try {
	$conn = new PDO($servertype . ":server = tcp:" . $server . "; Database = " . $database, $username, $password);
    $conn->setAttribute( PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
}
catch ( PDOException $e ) {
	exit;
}

?>