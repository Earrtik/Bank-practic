<?php
session_start();
$loggedIn = isset($_SESSION['user_id']); // verificăm dacă utilizatorul este logat
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
                <a href="index.php" class="a1 spinner-link">Acasă</a>
                <a href="credite.php" class="a2 spinner-link">Calculator Credite</a>
                <a href="informatii.php" class="a3 spinner-link">Informații</a>
            </div>

            <?php if (!$loggedIn): ?>
                <!-- Vizitatori -->
                <a href="../../frontend/html/login.html" class="login spinner-link">Login</a>
                <button class="register spinner-link">Register</button>
            <?php else: ?>
                <!-- Utilizatori logați -->
                <a href="istoric.php" class="spinner-link"><i class="bi bi-clock-history"></i></a>
                <a href="favorite.php" class="spinner-link"><i class="bi bi-heart" id="heart"></i></a>
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
    <p class="logo">Diny bank</p>
</header>

<main> 
     <img src="../../photo/register_login.png" alt="">

    <div class="content">
        <div class="form-box">
            <form action="../../backend/php/register.php" method="POST" id="registerForm">
                <div class="in-form-box">
                    <h1>Înregistrare</h1>
                    <h3>Crează un cont</h3>

                    <label for="username">Nume</label>    
                    <input type="text" name="username" id="username" placeholder="Numele tău" required>
                    <div id="error-username" class="error"></div>

                    <label for="email">Adresa de Email</label>    
                    <input type="email" name="email" id="email" placeholder="exemplu@gmail.com" required>
                    <div id="error-email" class="error"></div>

                    <label for="password">Parola</label>    
                    <input type="password" name="password" id="password" placeholder="*********" required>
                    <div id="error-password" class="error"></div>

                    <div class="have-container">
                        <p class="have-account">Ai deja cont?</p>
                        <a href="/frontend/html/login.php">
                            <p class="login-account">Conectează-te</p>
                        </a>
                    </div>

                    <button type="submit" class="login-btn">Înregistrează-te</button>
                </div><br><br>
            </form>
        </div>
    </div>

    <div id="spinner" class="spinner" style="display:none;"></div>
</main>

<br><br><br>

<footer class="footer">
    Dinybank | © Copyright 2025 Toate drepturile rezervate.
</footer>

<script src="../js/repeat.js"></script>
</body>
</html>
