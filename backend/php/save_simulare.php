<?php
session_start();
include "config.php";

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status'=>'error','message'=>'Nu ești logat!']);
    exit;
}

$id_utilizator = $_SESSION['user_id'];

$data = json_decode(file_get_contents("php://input"), true);

$tip_credit = $data['tip_credit'] ?? '';
$suma = floatval($data['suma'] ?? 0);
$perioada = intval($data['perioada'] ?? 0);
$tip_rata = $data['tip_rata'] ?? '';
$perioada_gratie = $data['perioada_gratie'] ?? null;
$tip_dobanda = $data['tip_dobanda'] ?? null;
$dobanda_mixta = $data['dobanda_mixta'] ?? null;
$perioada_gratie_mixta = $data['perioada_gratie_mixta'] ?? null;
$avans = floatval($data['avans'] ?? 0);
$salariu = floatval($data['salariu'] ?? 0);
$rata_lunara = floatval($data['rata_lunara'] ?? 0);
$rata_totala = floatval($data['rata_totala'] ?? 0);

// Verificare daca exista o simulare identica
$check_sql = "SELECT id_simulare FROM simulari 
              WHERE id_utilizator=? AND tip_credit=? AND suma=? AND perioada=? AND tip_rata=?";
$check_stmt = $conn->prepare($check_sql);
$check_stmt->bind_param("isdss", $id_utilizator, $tip_credit, $suma, $perioada, $tip_rata);
$check_stmt->execute();
$result = $check_stmt->get_result();

if ($result && $result->num_rows > 0) {
    // stergere simulare existenta
    $row = $result->fetch_assoc();
    $id = $row['id_simulare'];

    $delete_sql = "DELETE FROM simulari WHERE id_simulare=?";
    $delete_stmt = $conn->prepare($delete_sql);
    $delete_stmt->bind_param("i", $id);
    $delete_stmt->execute();
    $delete_stmt->close();
}

// Inserare nouă simulare
$insert_sql = "INSERT INTO simulari (
    id_utilizator, tip_credit, suma, perioada, tip_rata, perioada_gratie,
    tip_dobanda, dobanda_mixta, perioada_gratie_mixta, avans, salariu,
    rata_lunara, rata_totala, data_simulare
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";
$insert_stmt = $conn->prepare($insert_sql);
$insert_stmt->bind_param(
    "isdisssssdddd",
    $id_utilizator, $tip_credit, $suma, $perioada, $tip_rata,
    $perioada_gratie, $tip_dobanda, $dobanda_mixta, $perioada_gratie_mixta,
    $avans, $salariu, $rata_lunara, $rata_totala
);

if ($insert_stmt->execute()) {
    echo json_encode(['status'=>'success','message'=>'Simulare salvată']);
} else {
    echo json_encode(['status'=>'error','message'=>'Eroare la salvare']);
}

$insert_stmt->close();
$check_stmt->close();
$conn->close();
?>
