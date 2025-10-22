<?php
session_start();
require_once "../../backend/php/config.php"; // conexiunea la DB

$loggedIn = isset($_SESSION['user_id']);
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../style/repeat.css">
    <link rel="stylesheet" href="../style/favorite.css">
    <link rel="stylesheet" href="../style/favorit_istoric_repeat.css">
    <title>Favorite</title>
</head>
<body>
<header>
    <div class="menu-container">
        <div class="hamburger" id="hamburger"><span></span><span></span><span></span></div>
        <div class="menu-items" id="menu-items">
            <div class="menu">
                <a class="a1" href="../../frontend/html/index.php">Acasă</a>
                <a href="credite.php" class="a2 spinner-link">Calculator Credite</a>
                <a href="informatii.php" class="a3 spinner-link">Informații</a>
            </div>

            <?php if (!$loggedIn): ?>
                <a href="../../frontend/html/login.html" class="login spinner-link">Login</a>
                <button class="register spinner-link">Register</button>
            <?php else: ?>
                <a href="istoric.php" class="spinner-link"><i class="bi bi-clock-history"></i></a>
                <a><i class="bi bi-heart" id="heart"></i></a>
                <a class="spinner-link" href="../../backend/php/logout.php?redirect=<?= urlencode($_SERVER['PHP_SELF']) ?>">
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
            <button class="favorite">Favorite</button>
            <a href="../../frontend/html/istoric.php" class="spinner-link">
                <button class="istoric">Istoric</button>
            </a>
        </div>
    </div>

<?php if (!$loggedIn): ?>
    <div class="content">
        <div class="login-text">
            <h1>Intra în cont pentru a vedea simulările favorite</h1>
            <a href="../../frontend/html/login.php" class="spinner-link">
                <button class="login-favorit-button">Intra în Cont</button>
            </a>
        </div>
    </div>
<?php else: ?>
    <?php
    $user_id = $_SESSION['user_id'];
    $sql = "SELECT * FROM favorite WHERE id_utilizator = ? ORDER BY id_simulare DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $favorites = [];
    while($row = $result->fetch_assoc()){
        if (!empty($row['id_simulare'])) {
            $favorites[] = $row;
        }
    }
    $hasFavorites = count($favorites) > 0;
    ?>

    <?php if ($hasFavorites): ?>
        <div class="sterge-toate-wrapper">
            <button class="sterge-toate"><i class="bi bi-trash"></i> Șterge toate favoritele</button>
        </div>
    <?php endif; ?>

    <div class="container-div">
        <?php if ($hasFavorites): $index = 1; ?>
            <?php foreach($favorites as $row): ?>
                <div class="favorite-card">
                    <h3>Favorite #<?= $index++ ?></h3>
                    <p><strong>Tip Credit :</strong> <?= $row['tip_credit'] ?></p>
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
            <?php endforeach; ?>
        <?php else: ?>
            <div class="content">
                <div class="login-text">
                    <h1>Nu există simulări favorite</h1>
                    <a href="credite.php" class="spinner-link">
                        <button class="login-favorit-button">Mergi la Credite</button>
                    </a>
                </div>
            </div>
        <?php endif; ?>
    </div>
<?php endif; ?>
</main>

<footer class="footer">
    <p>Dinybank | © Copyright 2025 Toate drepturile rezervate.</p>
</footer>

<script src="../js/repeat.js"></script>
<script src="../js/favorite.js"></script>
</body>
</html>
