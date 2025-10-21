<?php
header('Content-Type: application/json');


$url = "https://www.bnm.md/ro/official_exchange_rates?get_xml=1&date=" . date('d.m.Y');
$xml = @file_get_contents($url);
$eur = $usd = null;

if ($xml !== false) {
    $data = simplexml_load_string($xml);
    foreach ($data->Valute as $valuta) {
        if ((string)$valuta->CharCode == 'EUR') $eur = (string)$valuta->Value;
        if ((string)$valuta->CharCode == 'USD') $usd = (string)$valuta->Value;
    }
}

echo json_encode(['EUR' => $eur, 'USD' => $usd]);