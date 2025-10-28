<?php
session_start();
require_once "config.php";
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = htmlspecialchars(trim($_POST['email']));
    $password = htmlspecialchars(trim($_POST['password']));

    if ($email === '' || $password === '') {
        echo json_encode(['success'=>false,'errorField'=>'all','message'=>'Toate câmpurile sunt obligatorii!']);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
    $stmt->bind_param("s",$email);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $username, $hashedPassword);

    if($stmt->num_rows === 0){
        echo json_encode(['success'=>false,'errorField'=>'email','message'=>'Emailul este greșit!']);
        exit;
    }

    $stmt->fetch();

    if(!password_verify($password, $hashedPassword)){
        echo json_encode(['success'=>false,'errorField'=>'password','message'=>'Parola este greșită!']);
        exit;
    }

    $_SESSION['user_id'] = $id;
    $_SESSION['username'] = $username;
    $_SESSION['email'] = $email;

    echo json_encode(['success'=>true]);
    $stmt->close();
    $conn->close();
}
?>
