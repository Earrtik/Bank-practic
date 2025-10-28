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
    <link rel="stylesheet" href="../style/favorite.css">
    <link rel="stylesheet" href="../style/repeat.css">
    <link rel="stylesheet" href="../style/favorit_istoric_repeat.css">
    <title>Favorite</title>
</head>
<body>
<header>
    <div class="menu-container">
        <div class="hamburger" id="hamburger"><span></span><span></span><span></span></div>
        <div class="menu-items" id="menu-items">
            <div class="menu">
                <a class="a1" href="" data-lang="acasa">Acasă</a>
                <a href="credite.php" class="a2 spinner-link" data-lang="calculator_credit">Calculator Credite</a>
                <a href="informatii.php" class="a3 spinner-link" data-lang="informatii">Informații</a>
            </div>

            <?php if (!$loggedIn): ?>
                <a href="../../frontend/html/login.php" class="login spinner-link" data-lang="login">Login</a>
                <a href="../../frontend/html/register.php" class="spinner-link">
                    <button class="register" data-lang="register">Register</button>
                </a>
            <?php else: ?>
                <a><i class="bi bi-heart" id="heart"></i></a>
                <a href="istoric.php" class="spinner-link"><i class="bi bi-clock-history" id="history"></i></a>
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
            <button class="favorite" data-lang="favorite">Favorite</button>
            <a href="../../frontend/html/istoric.php" class="spinner-link">
                <button class="istoric" data-lang="istoric">Istoric</button>
            </a>
        </div>
    </div>

<?php if (!$loggedIn): ?>
    <div class="content" id="content-favorite">
        <div class="login-text">
            <h1 data-lang="login_required">Intra în cont pentru a vedea simulările favorite</h1>
            <a href="../../frontend/html/login.php" class="spinner-link">
                <button class="login-favorit-button" data-lang="intra_cont">Intra în Cont</button>
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
        if (!empty($row['id_simulare'])) $favorites[] = $row;
    }
    $hasFavorites = count($favorites) > 0;
    ?>

    <?php if ($hasFavorites): ?>
        <div class="sterge-toate-wrapper">
            <button class="sterge-toate"><i class="bi bi-trash"></i> <span data-lang="sterge_toate">Șterge toate favoritele</span></button>
        </div>
    <?php endif; ?>

    <div class="container-div">
        <?php if ($hasFavorites): $index = 1; ?>
            <?php foreach($favorites as $row): ?>
                <div class="favorite-card">
                    <h3  >
                        <span class="favorite-title" data-lang="favorite_num">Favorite</span> #<?= $index++ ?>
                    </h3>
                    <p><strong data-lang="tip_credit">Tip Credit :</strong> <span class="val" data-field="tip_credit"><?= $row['tip_credit'] ?></span></p>
                    <p><strong data-lang="suma">Suma :</strong> <span class="val" data-field="suma"><?= number_format($row['suma'], 0, '.', ',') ?> lei</span></p>
                    <p><strong data-lang="perioada">Perioada :</strong> <span class="val" data-field="perioada"><?= $row['perioada'] ?> luni</span></p>
                    <p><strong data-lang="tip_rata">Tip rată :</strong> <span class="val" data-field="tip_rata"><?= $row['tip_rata'] ?></span></p>
                    <p><strong data-lang="perioada_gratie">Perioada de gratie :</strong> <span class="val" data-field="perioada_gratie"><?= $row['perioada_gratie'] ?: 'NU' ?></span></p>
                    <p><strong data-lang="tip_dobanda">Tip dobândă :</strong> <span class="val" data-field="tip_dobanda"><?= $row['tip_dobanda'] ?: 'NU' ?></span></p>
                    <p><strong data-lang="dobanda_mixta">Dobândă mixtă :</strong> <span class="val" data-field="dobanda_mixta"><?= $row['dobanda_mixta'] ?: 'NU' ?></span></p>
                    <p><strong data-lang="avans">Avans :</strong> <span class="val" data-field="avans"><?= number_format($row['avans'], 0, '.', ',') ?> lei</span></p>
                    <p><strong data-lang="salariu">Salariu lunar :</strong> <span class="val" data-field="salariu"><?= number_format($row['salariu'], 0, '.', ',') ?> lei</span></p>
                    <p><strong data-lang="optiune_rambursare">Rambursare anticipată :</strong> <span class="val" data-field="optiune_rambursare"><?= $row['optiune_rambursare'] ?: 'NU' ?></span></p>
                    <hr class="hr-div-card">
                    <div class="buttons-row">
                        <button class="creaza-link"><i class="bi bi-link-45deg"></i> <span data-lang="creaza_link">Crează link</span></button>
                        <button class="sterge" data-id="<?= $row['id_simulare'] ?>"><i class="bi bi-trash"></i> <span data-lang="sterge">Șterge</span></button>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <div class="content" id="content-favorite-login">
                <div class="login-text">
                    <h1 data-lang="no_favorites">Nu există simulări favorite</h1>
                    <a href="credite.php" class="spinner-link">
                        <button class="login-favorit-button" data-lang="mergi_credit">Mergi la Credite</button>
                    </a>
                </div>
            </div>
        <?php endif; ?>
    </div>
<?php endif; ?>

<div id="spinner" class="spinner" style="display:none;"></div>
</main>

<footer class="footer">
    <p>Dinybank | © Copyright 2025 Toate drepturile rezervate.</p>
</footer>

<script src="../js/repeat.js"></script>
<script src="../js/favorite.js"></script>
<script src="../js/lang/favorite-language.js"></script>
</body>
</html>
