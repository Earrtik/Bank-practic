<?php
session_start();
require_once "config.php";  

if (!isset($_SESSION['user_id'])) exit;

if (isset($_POST['id_simulare'])) {
    $id_simulare = intval($_POST['id_simulare']);
    $user_id = intval($_SESSION['user_id']);

    $stmt = $conn->prepare("DELETE FROM simulari WHERE id_simulare=? AND id_utilizator=?");
    $stmt->bind_param("ii", $id_simulare, $user_id);
    $stmt->execute();
    $stmt->close();
}

$conn->close();
