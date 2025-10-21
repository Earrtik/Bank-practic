<?php
session_start();
header('Content-Type: application/json');
include "config.php"; // conexiunea la baza de date

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Nu esti logat']);
    exit;
}

// Preluare date din POST
$id_utilizator = $_SESSION['user_id'];
$tip_credit = $_POST['tip_credit'] ?? '';
$suma = $_POST['suma'] ?? 0;
$perioada = $_POST['perioada'] ?? 0;
$tip_rata = $_POST['tip_rata'] ?? '';
$perioada_gratie = $_POST['perioada_gratie'] ?? null;
$tip_dobanda = $_POST['tip_dobanda'] ?? null;
$dobanda_mixta = $_POST['dobanda_mixta'] ?? null;
$perioada_gratie_mixta = $_POST['perioada_gratie_mixta'] ?? null;
$avans = $_POST['avans'] ?? 0;
$salariu = $_POST['salariu'] ?? 0;
$suma_rambursare = $_POST['suma_rambursare'] ?? null;
$optiune_rambursare = $_POST['optiune_rambursare'] ?? null;
$rata_lunara = $_POST['rata_lunara'] ?? 0;
$rata_totala = $_POST['rata_totala'] ?? 0;

// Pregatire interogare
$sql = "INSERT INTO simulari (
    id_utilizator, tip_credit, suma, perioada, tip_rata, perioada_gratie, tip_dobanda, dobanda_mixta, perioada_gratie_mixta, 
    avans, salariu, suma_rambursare, optiune_rambursare, rata_lunara, rata_totala
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "isdisssssdddsdd", 
    $id_utilizator, $tip_credit, $suma, $perioada, $tip_rata, $perioada_gratie, $tip_dobanda, $dobanda_mixta, $perioada_gratie_mixta,
    $avans, $salariu, $suma_rambursare, $optiune_rambursare, $rata_lunara, $rata_totala
);

if($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Simulare salvata cu succes!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Eroare la salvare: '.$stmt->error]);
}
$stmt->close();
$conn->close();
