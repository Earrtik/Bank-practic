 <?php
session_start();
require_once "config.php"; // conexiunea la baza de date

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // curățare XSS
    function clean($data) {
        return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
    }

    $email = isset($_POST['email']) ? clean($_POST['email']) : '';
    $password = isset($_POST['password']) ? clean($_POST['password']) : '';

    if ($email === '' || $password === '') {
        header("Location: /frontend/html/login.html?error=" . urlencode("Toate câmpurile sunt obligatorii!"));
        exit;
    }

    // verificăm utilizatorul în baza de date
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
    if (!$stmt) {
        die("Eroare la pregătirea interogării SQL: " . $conn->error);
    }
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $username, $hashedPassword);

    if ($stmt->num_rows === 1) {
        $stmt->fetch();
        if (password_verify($password, $hashedPassword)) {
            // login reușit
            $_SESSION['user_id'] = $id;
            $_SESSION['username'] = $username;
            $_SESSION['email'] = $email;

            // redirecționăm către credit.html sau altă pagină
            header("Location: ../../frontend/html/credite.php");
            exit;
        }   
    }
    
    $stmt->close();
}

$conn->close();
?> 