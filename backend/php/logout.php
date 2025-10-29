<?php
session_start();
require_once "config.php";

// Log logout doar dacă userul e logat
if (isset($_SESSION['user_id'])) {
    $id = $_SESSION['user_id'];
    $log = $conn->prepare("INSERT INTO logs_users (id_utilizator, actiune) VALUES (?, 'logout')");
    if ($log) {
        $log->bind_param("i", $id);
        $log->execute();
        $log->close();
    }
}

// Sterge toate variabilele de sesiune si distruge sesiunea
session_unset();
session_destroy();

// Redirect
$redirect = isset($_GET['redirect']) ? $_GET['redirect'] : '../../frontend/html/credite.php';
header("Location: $redirect");
exit;
?>
