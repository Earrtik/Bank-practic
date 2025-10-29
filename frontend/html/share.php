<?php
session_start();
include "../../backend/php/config.php"; // ajusteaza calea dupa nevoie


// Preluare ID simulare din URL
$id = $_GET['id'] ?? 0;

// Interogare simulare
$sql = "SELECT * FROM simulari WHERE id_simulare=? AND id_utilizator=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id, $_SESSION['user_id']);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo "<h1>Simulare inexistentă sau nu ai acces la aceasta!</h1>";
    exit;
}

$simulare = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simulare Credit #<?= $simulare['id_simulare'] ?></title>
    <link rel="stylesheet" href="../style/repeat.css">
    <link rel="stylesheet" href="../style/share.css">
</head>
<body>
    <div class="container">
        <h1>Simulare Credit #<?= $simulare['id_simulare'] ?></h1>
        <div class="content" id="simulare-share" >
            <p><strong>Tip credit:</strong> <?= $simulare['tip_credit'] ?></p>
            <p><strong>Suma:</strong> <?= number_format($simulare['suma'], 2, ',', '.') ?> LEI</p>
            <p><strong>Perioada:</strong> <?= $simulare['perioada'] ?> luni</p>
            <p><strong>Tip rată:</strong> <?= $simulare['tip_rata'] ?></p>
            <p><strong>Perioadă grație:</strong> <?= $simulare['perioada_gratie'] ?? 'NU' ?> luni</p>
            <p><strong>Tip dobândă:</strong> <?= $simulare['tip_dobanda'] ?? 'NU' ?></p>
            <p><strong>Dobândă mixtă:</strong> <?= $simulare['dobanda_mixta'] ?></p>
            <p><strong>Perioadă grație mixtă:</strong> <?= $simulare['perioada_gratie_mixta'] ?? 'NU' ?></p>
            <p><strong>Avans:</strong> <?= number_format($simulare['avans'], 2, ',', '.') ?> LEI</p>
            <p><strong>Salariu:</strong> <?= number_format($simulare['salariu'], 2, ',', '.') ?> LEI</p>
            <p><strong>Rată lunară:</strong> <?= number_format($simulare['rata_lunara'], 2, ',', '.') ?> LEI</p>
            <p><strong>Rată totală:</strong> <?= number_format($simulare['rata_totala'], 2, ',', '.') ?> LEI</p>
            <p><strong>Rambursare anticipată:</strong> <?= number_format($simulare['suma_rambursare'], 2, ',', '.') ?> LEI</p>
            <p><strong>Opțiune rambursare:</strong> <?= $simulare['optiune_rambursare'] ?></p>
            <p><strong>Data simulării:</strong> <?= $simulare['data_simulare'] ?></p>
            <div class="actions">
                <a href="javascript:window.print()" class="btn">Printează simularea</a>
                <a href="../../frontend/html/credite.php" class="btn">Înapoi la calculator</a>
            </div>
        </div>

    </div>
</body>
</html>

<?php
$stmt->close();
$conn->close();
?>
