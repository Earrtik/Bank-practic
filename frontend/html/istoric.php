<?php
session_start();
require_once "../../backend/php/config.php";

$loggedIn = isset($_SESSION['user_id']);
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../style/istoric.css">
    <link rel="stylesheet" href="../style/repeat.css">
    <link rel="stylesheet" href="../style/favorit_istoric_repeat.css">
    <title>Istoric Credite</title>
</head>
<body>
<header>
    <div class="menu-container">
        <div class="hamburger" id="hamburger"><span></span><span></span><span></span></div>
        <div class="menu-items" id="menu-items">
            <div class="menu">
                <a href="" class="a1">Acasă</a>
                <a href="credite.php" class="a2 spinner-link">Calculator Credite</a>
                <a href="informatii.php" class="a3 spinner-link">Informații</a>
            </div>

            <?php if (!$loggedIn): ?>
                <a href="../../frontend/html/login.php" class="login spinner-link">Login</a>
                <a href="../../frontend/html/register.php" class="spinner-link">
                    <button class="register">Register</button>
                </a>
            <?php else: ?>
                <a href=""><i class="bi bi-clock-history" id="icon-history"></i></a>
                <a href="../../frontend/html/favorite.php" class="spinner-link"><i class="bi bi-heart" id="icon-heart"></i></a>
                <a class="spinner-link" href="../../backend/php/logout.php?redirect=<?= urlencode($_SERVER['PHP_SELF']) ?>"><i class="bi bi-box-arrow-right" id="logout"></i></a>
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
            <a href="../../frontend/html/favorite.php" class="spinner-link">
                <button class="favorite">Favorite</button>
            </a>
            <button class="istoric">Istoric</button>
        </div>
    </div>

    <?php if (!$loggedIn): ?>
        <div class="login-text">
            <div class="content" id="content-istoric" >
            <h1>Intra în cont pentru a vedea istoricul simulărilor tale</h1>
            <a href="../../frontend/html/login.php" class="spinner-link">
                <button class="login-favorit-button">Intra în cont</button>
            </a>
        </div>
        </div>
    <?php else: ?>
        <?php
        $user_id = $_SESSION['user_id'];
        $sql = "SELECT * FROM simulari WHERE id_utilizator = '$user_id' ORDER BY id_simulare DESC";
        $result = $conn->query($sql);
        $has_simulari = $result->num_rows > 0;
        ?>

        <?php if ($has_simulari): ?>
            <div class="sterge-toate-wrapper">
                <button class="sterge-toate"><i class="bi bi-trash"></i> Șterge toată istoria</button>
            </div>

            <div class="container-div">
                <?php
                $index = 1;
                while ($row = $result->fetch_assoc()):
                ?>
                <div class="istoric-card">
                    <h3>Istoric #<?= $index++ ?></h3>
                    <p><strong>Tip Credit :</strong> <?= $row['tip_credit'] ?></p>
                    <p><strong>Data/Ora :</strong> <?= $row['data_simulare'] ?></p>
                    <p><strong>Suma :</strong> <?= number_format($row['suma'], 0, '.', ',') ?> lei</p>
                    <p><strong>Perioada :</strong> <?= $row['perioada'] ?> luni</p>
                    <p><strong>Tip rată :</strong> <?= $row['tip_rata'] ?></p>
                    <p><strong>Perioada de gratie :</strong> <?= $row['perioada_gratie'] ?: 'NU' ?></p>
                    <p><strong>Tip dobândă :</strong> <?= $row['tip_dobanda'] ?: 'NU' ?></p>
                    <p><strong>Dobândă mixtă :</strong> <?= $row['dobanda_mixta'] ?: 'NU' ?></p>
                    <p><strong>Avans :</strong> <?= number_format($row['avans'], 0, '.', ',') ?> lei</p>
                    <p><strong>Salariu lunar :</strong> <?= number_format($row['salariu'], 0, '.', ',') ?> lei</p>
                    <p><strong>Rambursare anticipată :</strong> <?= $row['optiune_rambursare'] ?: 'NU' ?></p>
                    <hr class="hr-div-card">
                    <div class="buttons-row">
                        <button class="creaza-link"><i class="bi bi-link-45deg"></i> Crează link</button>
                        <button class="sterge" data-id="<?= $row['id_simulare'] ?>"><i class="bi bi-trash"></i> Șterge</button>
                    </div>
                </div>
                <?php endwhile; ?>
            </div>
        <?php else: ?>
            <div class="content" id="content-d" >
                <div class="login-text"     >
                    <h1>Nu există simulări în istoric</h1>
                    <a href="credite.php" class="spinner-link">
                        <button class="login-favorit-button">Mergi la Credite</button>
                    </a>
                </div>
            </div>
        <?php endif; ?>
    <?php endif; ?>
      <div id="spinner" class="spinner" style="display:none;"></div>
</main>

<footer class="footer">
    <p>Dinybank | © Copyright 2025 Toate drepturile rezervate.</p>
</footer>

<script src="../js/repeat.js"></script>
<script src="../js/istoric.js"></script>

</body>
</html>
