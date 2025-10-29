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

// --- Preluare date exacte ---
$tip_credit = $data['tip_credit'] ?? null;
$suma = isset($data['suma']) ? floatval($data['suma']) : null;
$perioada = isset($data['perioada']) ? intval($data['perioada']) : null;
$tip_rata = $data['tip_rata'] ?? null;
$perioada_gratie = $data['perioada_gratie'] ?? null;
$tip_dobanda = $data['tip_dobanda'] ?? null;
$dobanda_mixta = $data['dobanda_mixta'] ?? null;
$perioada_gratie_mixta = $data['perioada_gratie_mixta'] ?? null;
$avans = isset($data['avans']) ? floatval($data['avans']) : null;
$salariu = isset($data['salariu']) ? floatval($data['salariu']) : null;
$rata_lunara = isset($data['rata_lunara']) ? floatval($data['rata_lunara']) : null;
$rata_totala = isset($data['rata_totala']) ? floatval($data['rata_totala']) : null;
$suma_rambursare = isset($data['suma_rambursare']) ? floatval($data['suma_rambursare']) : null;
$optiune_rambursare = $data['optiune_rambursare'] ?? null;

// --- Verificare duplicat simplu ---
$check_sql = "SELECT id_simulare FROM simulari WHERE id_utilizator=? AND tip_credit=? AND suma=? AND perioada=? AND tip_rata=?";
$check_stmt = $conn->prepare($check_sql);
$check_stmt->bind_param("isdss",$id_utilizator,$tip_credit,$suma,$perioada,$tip_rata);
$check_stmt->execute();
$result = $check_stmt->get_result();

if($result && $result->num_rows > 0){
    $row = $result->fetch_assoc();
    $id = $row['id_simulare'];
    $delete_sql = "DELETE FROM simulari WHERE id_simulare=?";
    $delete_stmt = $conn->prepare($delete_sql);
    $delete_stmt->bind_param("i",$id);
    $delete_stmt->execute();
    $delete_stmt->close();
}

// --- Inserare simulare noua ---
$insert_sql = "INSERT INTO simulari 
(id_utilizator,tip_credit,suma,perioada,tip_rata,perioada_gratie,tip_dobanda,dobanda_mixta,perioada_gratie_mixta,avans,salariu,rata_lunara,rata_totala,suma_rambursare,optiune_rambursare,data_simulare)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)";

$insert_stmt = $conn->prepare($insert_sql);
$insert_stmt->bind_param(
    "isdisssssddddss",
    $id_utilizator, $tip_credit, $suma, $perioada, $tip_rata,
    $perioada_gratie, $tip_dobanda, $dobanda_mixta, $perioada_gratie_mixta,
    $avans, $salariu, $rata_lunara, $rata_totala,
    $suma_rambursare, $optiune_rambursare
);

if($insert_stmt->execute()){
    $last_id = $insert_stmt->insert_id;

    // --- Logare simulare în logs_simulari ---
    $log_sql = "INSERT INTO logs_simulari
    (id_simulare, id_utilizator, tip_credit, suma, perioada, tip_rata, perioada_gratie, tip_dobanda, dobanda_mixta, perioada_gratie_mixta, avans, salariu, suma_rambursare, optiune_rambursare, rata_lunara, rata_totala, data_simulare)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)";
    
    $log_stmt = $conn->prepare($log_sql);
    $log_stmt->bind_param(
        "iisdisssssdddddd",
        $last_id, $id_utilizator, $tip_credit, $suma, $perioada, $tip_rata,
        $perioada_gratie, $tip_dobanda, $dobanda_mixta, $perioada_gratie_mixta,
        $avans, $salariu, $suma_rambursare, $optiune_rambursare,
        $rata_lunara, $rata_totala
    );
    $log_stmt->execute();
    $log_stmt->close();

    echo json_encode(['status'=>'success','message'=>'Simulare salvată și logată cu succes!','simulare_id'=>$last_id]);
} else {
    echo json_encode(['status'=>'error','message'=>'Eroare la salvare!']);
}

$insert_stmt->close();
$check_stmt->close();
$conn->close();
?>
