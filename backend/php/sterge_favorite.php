<?php
session_start();
require_once "config.php";

if (!isset($_SESSION['user_id'])) exit;

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? 0;

if (!$id) exit;

$sql = "DELETE FROM favorite WHERE id_simulare = ? AND id_utilizator = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id, $user_id);
$stmt->execute();
?>
