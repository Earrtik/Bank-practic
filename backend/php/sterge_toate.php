<?php
session_start();
include "config.php"; // conexiunea la DB

if (!isset($_SESSION['user_id'])) exit;

$user_id = intval($_SESSION['user_id']);

// Șterge toate simulările
$stmt = $conn->prepare("DELETE FROM simulari WHERE id_utilizator = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->close();
$conn->close();

