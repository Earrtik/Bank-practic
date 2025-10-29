<?php
session_start();
require_once "config.php";

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    function clean($data) {
        return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
    }

    $username = clean($_POST['username'] ?? '');
    $email = clean($_POST['email'] ?? '');
    $password = clean($_POST['password'] ?? '');

    // Validare
    if (strlen($username) < 3) {
        echo json_encode(['success'=>false,'errorField'=>'username','message'=>'Numele trebuie să aibă minim 3 caractere!']);
        exit;
    }

    if (strlen($password) < 6) {
        echo json_encode(['success'=>false,'errorField'=>'password','message'=>'Parola trebuie să aibă minim 6 caractere!']);
        exit;
    }

    // Verificare email
    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();
    if ($check->num_rows > 0) {
        echo json_encode(['success'=>false,'errorField'=>'email','message'=>'Emailul este deja folosit!']);
        exit;
    }
    $check->close();

    // Inserare utilizator
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (username,email,password) VALUES (?,?,?)");
    $stmt->bind_param("sss", $username, $email, $hashedPassword);

    if ($stmt->execute()) {
        $user_id = $stmt->insert_id; // preluam ID-ul dupa executare

        $_SESSION['user_id'] = $user_id;
        $_SESSION['username'] = $username;
        $_SESSION['email'] = $email;

        //  Log register
        $log = $conn->prepare("INSERT INTO logs_users (id_utilizator, actiune) VALUES (?, 'register')");
        if ($log) {
            $log->bind_param("i", $user_id);
            $log->execute();
            $log->close();
        }

        echo json_encode(['success'=>true]);
    } else {
        echo json_encode(['success'=>false,'errorField'=>'username','message'=>'A apărut o eroare la inserare!']);
    }
    $stmt->close();
}
$conn->close();
?>
