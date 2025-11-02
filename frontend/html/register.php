<?php
session_start();
$loggedIn = isset($_SESSION['user_id']); // verificam daca utilizatorul este logat
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style/register.css">
    <link rel="stylesheet" href="../style/repeat.css">
    <link rel="stylesheet" href="../style/login_register_repeat.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <title>Diny-Bank Register</title>
</head>
<body>
<header>
    <div class="menu-container">
        <div class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div class="menu-items" id="menu-items">
            <div class="menu">
                <a href="index.php" class="a1 spinner-link" data-translate="home">Acasă</a>
                <a href="credite.php" class="a2 spinner-link" data-translate="calculator">Calculator Credite</a>
                <a href="informatii.php" class="a3 spinner-link" data-translate="info">Informații</a>
            </div>

            <?php if (!$loggedIn): ?>
                <!-- Vizitatori -->
                <a href="../../frontend/html/login.php" class="login spinner-link" data-translate="login">Login</a>
                <button class="register" data-translate="register">Register</button>
            <?php else: ?>
                <!-- Utilizatori logați -->
                <a href="favorite.php" class="spinner-link"><i class="bi bi-heart" id="heart"></i></a>
                <a href="istoric.php" class="spinner-link"><i class="bi bi-clock-history"id="history"></i></a>
                <a href="../../backend/php/logout.php" class="spinner-link"><i class="bi bi-box-arrow-right" id="logout"></i></a>
            <?php endif; ?>

            <div class="language-select">
                <hr class="left-language">
                <select id="lang">
                    <option value="ro">RO</option>
                    <option value="ru">RU</option>
                    <option value="en">EN</option>
                </select>
                <hr class="right-language">
            </div>
        </div>
    </div>
    <p class="logo" data-translate="logo">Diny Bank</p>
</header>

<main> 
     <img src="../../photo/register_login.png" alt="">

    <div class="content">
        <div class="form-box">
            <form method="POST" id="registerForm">
                <div class="in-form-box">
                    <h1 data-translate="register-title">Înregistrare</h1>
                    <h3 data-translate="register-subtitle">Crează un cont</h3>

                    <label for="username" data-translate="name-label">Nume</label>    
                    <input type="text" name="username" id="username" 
                        data-placeholder="name-placeholder" placeholder="Numele tău" 
                        required <?php if ($loggedIn) echo 'disabled'; ?>>
                    <div id="error-username" class="error"></div>

                    <label for="email" data-translate="email-label">Adresa de Email</label>    
                    <input type="email" name="email" id="email" 
                        data-placeholder="email-placeholder" placeholder="exemplu@gmail.com" 
                        required <?php if ($loggedIn) echo 'disabled'; ?>>
                    <div id="error-email" class="error"></div>

                    <label for="password" data-translate="password-label">Parola</label>    
                    <input type="password" name="password" id="password" 
                        data-placeholder="password-placeholder" placeholder="*******" 
                        required <?php if ($loggedIn) echo 'disabled'; ?>>
                    <div id="error-password" class="error"></div>

                    <div class="have-container">
                        <p class="have-account" data-translate="have-account">Ai deja cont?</p>
                        <a href="../../frontend/html/login.php">
                            <p class="login-account" data-translate="login-account">Conectează-te</p>
                        </a>
                    </div>

                    <button type="submit" class="login-btn" 
                        data-translate="register-btn" <?php if ($loggedIn) echo 'disabled'; ?>>
                        Înregistrează-te
                    </button>

                    <?php if ($loggedIn): ?>
                        <p style="color:gray; margin-top:10px; text-align:center;">
                            Ești deja logat — nu poți crea un nou cont.
                        </p>
                    <?php endif; ?>
                </div>
            </form>
        </div>
    </div>

    <div id="spinner" class="spinner" style="display:none;"></div>
</main>

<footer class="footer" data-translate="footer">
    Dinybank | © Copyright 2025 Toate drepturile rezervate.
</footer>

<script src="../../frontend/js/lang/register-language.js"></script>
<script src="../../frontend/js/repeat.js"></script>
<script src="../../frontend/js/register.js"></script>
</body>
</html>
