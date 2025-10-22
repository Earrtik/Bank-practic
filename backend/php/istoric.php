<?php
header('Content-Type: application/json');
include "config.php";
session_start();

$user_id = $_SESSION['user_id'] ?? null;

if ($user_id) {
    $sql = "SELECT * FROM simulari WHERE id_utilizator = ? ORDER BY data_simulare DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
} else {
    $sql = "SELECT * FROM simulari ORDER BY data_simulare DESC";
    $stmt = $conn->prepare($sql);
}

$stmt->execute();
$result = $stmt->get_result();
$simulari = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($simulari);
