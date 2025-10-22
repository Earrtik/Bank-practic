<?php
session_start();
header('Content-Type: application/json');
require_once "config.php";

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Nu ești logat.']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$id_utilizator = $_SESSION['user_id'];
$tip_credit = $data['tip_credit'] ?? '';
$suma = $data['suma'] ?? 0;
$perioada = $data['perioada'] ?? 0;
$tip_rata = $data['tip_rata'] ?? '';
$perioada_gratie = $data['perioada_gratie'] ?? '';
$tip_dobanda = $data['tip_dobanda'] ?? '';
$dobanda_mixta = $data['dobanda_mixta'] ?? '';
$perioada_gratie_mixta = $data['perioada_gratie_mixta'] ?? '';
$avans = $data['avans'] ?? 0;
$salariu = $data['salariu'] ?? 0;
$suma_rambursare = $data['suma_rambursare'] ?? 0;
$optiune_rambursare = $data['optiune_rambursare'] ?? '';
$rata_lunara = $data['rata_lunara'] ?? '';
$rata_totala = $data['rata_totala'] ?? '';

if (empty($tip_credit) || empty($suma) || empty($perioada) || empty($tip_rata)) {
    echo json_encode(['status' => 'error', 'message' => 'Date insuficiente pentru salvare.']);
    exit;
}

$sql = "INSERT INTO favorite (
    id_utilizator, tip_credit, suma, perioada, tip_rata, perioada_gratie,
    tip_dobanda, dobanda_mixta, perioada_gratie_mixta, avans, salariu,
    suma_rambursare, optiune_rambursare, rata_lunara, rata_totala, data_simulare
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

$stmt = $conn->prepare($sql);
$stmt->bind_param("isissssssddiiss",
    $id_utilizator,
    $tip_credit,
    $suma,
    $perioada,
    $tip_rata,
    $perioada_gratie,
    $tip_dobanda,
    $dobanda_mixta,
    $perioada_gratie_mixta,
    $avans,
    $salariu,
    $suma_rambursare,
    $optiune_rambursare,
    $rata_lunara,
    $rata_totala
);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Simulare adăugată la favorite.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Eroare la salvare în baza de date.']);
}
