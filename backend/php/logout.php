<?php
session_start();

// Șterge toate variabilele de sesiune și distruge sesiunea
session_unset();
session_destroy();

// Preia pagina de redirect din URL sau folosește credite.php ca default
$redirect = isset($_GET['redirect']) ? $_GET['redirect'] : '../../frontend/html/credite.php';

// Redirecționează utilizatorul
header("Location: $redirect");
exit;
?>
