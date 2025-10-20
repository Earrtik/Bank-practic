<?php
$server = "localhost";
$username = "root";
$password = "";
$database = "diny_bank";

$conn = new mysqli($server,$username,$password,$database);

if ($conn->connect_error) {
   
    die("Error sql" . $conn->connect_error);
} else {
   
    echo "Succes sql";
}

?>