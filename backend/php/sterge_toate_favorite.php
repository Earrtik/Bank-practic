<?php
session_start();
require_once "config.php";

if (!isset($_SESSION['user_id'])) exit;

$user_id = $_SESSION['user_id'];

$sql = "DELETE FROM favorite WHERE id_utilizator = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
?>
