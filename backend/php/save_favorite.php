<?php
session_start();
include "config.php";
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status'=>'error','message'=>'Nu ești autentificat']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(['status'=>'error', 'message'=>'Date invalide']);
    exit;
}

$id_utilizator = $_SESSION['user_id'];

// --- Preluare date cu valori implicite ---
$tip_credit = trim($data['tip_credit'] ?? '');
$suma = isset($data['suma']) ? round(floatval($data['suma']),2) : 0;
$perioada = isset($data['perioada']) ? intval($data['perioada']) : 0;
$tip_rata = trim($data['tip_rata'] ?? '');
$perioada_gratie = trim($data['perioada_gratie'] ?? '');
$tip_dobanda = trim($data['tip_dobanda'] ?? '');
$dobanda_mixta = trim($data['dobanda_mixta'] ?? '');
$perioada_gratie_mixta = trim($data['perioada_gratie_mixta'] ?? '');
$avans = isset($data['avans']) ? round(floatval($data['avans']),2) : 0;
$salariu = isset($data['salariu']) ? round(floatval($data['salariu']),2) : 0;
$suma_rambursare = isset($data['suma_rambursare']) ? round(floatval($data['suma_rambursare']),2) : 0;
$optiune_rambursare = !empty($data['optiune_rambursare']) ? trim($data['optiune_rambursare']) : 'NU';
$rata_lunara = isset($data['rata_lunara']) ? round(floatval($data['rata_lunara']),2) : 0;
$rata_totala = isset($data['rata_totala']) ? round(floatval($data['rata_totala']),2) : 0;

// --- Verificare simulare existentă ---
$sqlCheck = "SELECT id_simulare FROM favorite 
             WHERE id_utilizator=? 
               AND TRIM(tip_credit)=? 
               AND suma=? 
               AND perioada=? 
               AND TRIM(tip_rata)=? 
               AND TRIM(perioada_gratie)=? 
               AND TRIM(tip_dobanda)=? 
               AND TRIM(dobanda_mixta)=? 
               AND TRIM(perioada_gratie_mixta)=? 
               AND avans=? 
               AND salariu=? 
               AND suma_rambursare=? 
               AND TRIM(optiune_rambursare)=? 
               AND rata_lunara=? 
               AND rata_totala=? 
             LIMIT 1";

$stmt = $conn->prepare($sqlCheck);
$stmt->bind_param(
    "isdisssssddiidd",
    $id_utilizator, $tip_credit, $suma, $perioada, $tip_rata,
    $perioada_gratie, $tip_dobanda, $dobanda_mixta, $perioada_gratie_mixta,
    $avans, $salariu, $suma_rambursare, $optiune_rambursare,
    $rata_lunara, $rata_totala
);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->close();
    $conn->close();
    exit;
}

// --- Inserare simulare noua ---
$sqlInsert = "INSERT INTO favorite 
(id_utilizator, tip_credit, suma, perioada, tip_rata, perioada_gratie, tip_dobanda, dobanda_mixta, perioada_gratie_mixta, avans, salariu, suma_rambursare, optiune_rambursare, rata_lunara, rata_totala, data_simulare)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())";

$stmtInsert = $conn->prepare($sqlInsert);
$stmtInsert->bind_param(
    "isdisssssddiidd",
    $id_utilizator, $tip_credit, $suma, $perioada, $tip_rata,
    $perioada_gratie, $tip_dobanda, $dobanda_mixta, $perioada_gratie_mixta,
    $avans, $salariu, $suma_rambursare, $optiune_rambursare,
    $rata_lunara, $rata_totala
);

if ($stmtInsert->execute()) {

    // --- LOGARE simulare în logs_favorite ---
    $sqlLog = "INSERT INTO logs_favorite 
    (id_utilizator, tip_credit, suma, perioada, tip_rata, perioada_gratie, tip_dobanda, dobanda_mixta, perioada_gratie_mixta, avans, salariu, suma_rambursare, optiune_rambursare, rata_lunara, rata_totala, data_simulare)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())";

    $stmtLog = $conn->prepare($sqlLog);
    $stmtLog->bind_param(
        "isdisssssddiidd",
        $id_utilizator, $tip_credit, $suma, $perioada, $tip_rata,
        $perioada_gratie, $tip_dobanda, $dobanda_mixta, $perioada_gratie_mixta,
        $avans, $salariu, $suma_rambursare, $optiune_rambursare,
        $rata_lunara, $rata_totala
    );
    $stmtLog->execute();
    $stmtLog->close();

    echo json_encode(['status'=>'success','message'=>'Simulare adăugată la favorite ']);
} else {

}

$stmtInsert->close();
$stmt->close();
$conn->close();
?>
