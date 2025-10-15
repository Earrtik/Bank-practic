<?php
$server = "localhost";
$username = "root";
$password = "";
$database = "diny_bank";

$connection = new mysqli($server,$username,$password,$database);

if ($connection->connect_error) {
   
    die("Error sql" . $connection->connect_error);
} else {
   
    echo "Succes sql";
}
$connection->close();
?>