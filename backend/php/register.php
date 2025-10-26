<?php
session_start();
require_once "config.php"; // conexiunea la baza de date

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    function clean($data) {
        return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
    }

    $username = isset($_POST['username']) ? clean($_POST['username']) : '';
    $email    = isset($_POST['email']) ? clean($_POST['email']) : '';
    $password = isset($_POST['password']) ? clean($_POST['password']) : '';

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // verificăm dacă emailul există deja
    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();
    $check->close();

    // inserăm utilizatorul nou
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $hashedPassword);

    if ($stmt->execute()) {
        
        $user_id = $stmt->insert_id;

        $_SESSION['user_id'] = $user_id;
        $_SESSION['username'] = $username;
        $_SESSION['email'] = $email;

        
        header("Location: ../../frontend/html/credite.php");
        exit;
        } 

    $stmt->close();
}

$conn->close();
?>
