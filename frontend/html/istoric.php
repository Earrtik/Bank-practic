<?php
session_start();
$loggedIn = isset($_SESSION['user_id']); // verificăm dacă utilizatorul este logat
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <link rel="stylesheet" href="../style/repeat.css">
    <link rel="stylesheet" href="../style/istoric.css">
    <link rel="stylesheet" href="../style/favorit_istoric.css">
    <title>Istoric</title>
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
                <a href="index.php" class="a1">Acasă</a>
                <a href="credite.php" class="a2">Calculator Credite</a>
                <a href="informatii.html" class="a3">Informații</a>
            </div>

            <?php if (!$loggedIn): ?>
                <a href="../../frontend/html/login.html" class="login">Login</a>
                <button class="register">Register</button>
            <?php else: ?>
                <a href="   "><i class="bi bi-clock-history"></i></a>
                <a href="../../frontend/html/favorite.php"><i class="bi bi-heart" id="heart"></i></a>
                
                <a href="../../backend/php/logout.php?redirect=<?= urlencode($_SERVER['PHP_SELF']) ?>">
                    <i class="bi bi-box-arrow-right" id="logout"></i>
                </a>
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
    <div class="content">
        <div class="buttons">
            <a href="../../frontend/html/favorite.php">
                <button class="favorite">Favorite</button>
            </a>
            <button class="istoric">Istoric</button>
        </div>
    </div>

    <div class="content" id="content2">
        <div class="login-text">
            <?php if (!$loggedIn): ?>
                <h1>Intra in cont pentru a vedea istoricul simulărilor favorite</h1>
                <a href="../../frontend/html/login.html">
                    <button class="login-favorit-button">Intra in Cont</button>
                </a>
            <?php else: ?>
                <h1>Nu exista simulări în istoric</h1>
                <a href="credite.php">
                    <button class="login-favorit-button">Mergi la Credite</button>
                </a>
            <?php endif; ?>
        </div>
    </div>
</main>

<footer class="footer" data-translate="footer">
    <p>Dinybank | © Copyright 2025 Toate drepturile rezervate.</p>
</footer>
<script src="../js/repeat.js"></script>
</body>
</html>
