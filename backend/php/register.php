<?php
require_once "config.php"; // conexiunea la baza de date

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // curățare de bază împotriva XSS
    function clean($data) {
        return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
    }

    // luăm datele din formular
    $username = isset($_POST['username']) ? clean($_POST['username']) : '';
    $email    = isset($_POST['email']) ? clean($_POST['email']) : '';
    $password = isset($_POST['password']) ? clean($_POST['password']) : '';

    // verificăm dacă sunt completate
    if ($username === '' || $email === '' || $password === '') {
        echo "Toate câmpurile sunt obligatorii!";
        exit;
    }

    // criptăm parola
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // verificăm dacă emailul există deja
    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo "Acest email este deja folosit!";
        exit;
    }

    $check->close();

    // inserăm datele
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    if (!$stmt) {
        die("Eroare la pregătirea interogării SQL: " . $conn->error);
    }

    $stmt->bind_param("sss", $username, $email, $hashedPassword);

    if ($stmt->execute()) {
        // redirecționare după succes
        header("Location: /frontend/html/credit.html");
        exit;
    } else {
        echo "Eroare la înregistrare: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();

?>