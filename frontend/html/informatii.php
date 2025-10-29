<?php
session_start(); // pornim sesiunea
$loggedIn = isset($_SESSION['user_id']); // verificăm dacă utilizatorul este logat
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style/informatii.css">
    <link rel="stylesheet" href="../style/repeat.css">
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <title>Diny Bank Informatii</title>
</head>
<body>

<header>
    <div class="menu-container">
        <p class="logo">Diny bank</p>
        <div class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="menu-items" id="menu-items">
            <div class="menu">
                <a class="a1" data-translate="a1">Acasă</a>
                <a href="credite.php" class="a2 spinner-link" data-translate="a2">Calculator Credite</a>
                <a href="informatii.php" class="a3 spinner-link" data-translate="a3">Informații</a>
            </div>

            <?php if (!$loggedIn): ?>
                <!-- Vizitatori neautentificati -->
                <a href="../../frontend/html/login.php" class="login spinner-link" data-translate="login" >Login</a>
                <a href="../../frontend/html/register.php" class="spinner-link">
                    <button class="register" data-translate="register" >Register</button>
                </a>
            <?php else: ?>
                <!-- Utilizatori logati -->
                <a href="../../frontend/html/favorite.php" class="spinner-link"><i class="bi bi-heart" id="heart"></i></a>
                <a href="istoric.php" class="spinner-link"><i class="bi bi-clock-history" id="history"></i></a>
                <a href="../../backend/php/logout.php" class="spinner-link"><i class="bi bi-box-arrow-right" id="logout"></i></a>
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
</header>
    
<main>
 <!-- Div cu toate cards -->
<div class="all-cards">

    <!-- Card Secțiunea 1 -->
    <div class="cards">
       <section class="section-1">
            <h2 data-translate="sectiune-1-titlu"><b>1.Tipuri de credite</b></h2>
            <hr>
            <p><b data-translate="credit-ipotecar">Credit ipotecar / imobiliar</b></p>
            <ul>
                <li data-translate="credit-ipotecar-1">Pentru achiziția sau construcția unei locuințe.</li>
                <li data-translate="credit-ipotecar-2">Avans minim: 10% din valoarea locuinței.</li>
                <li data-translate="credit-ipotecar-3">Rol: reduce suma împrumutată și dobânda totală.</li>
            </ul>

            <p><b data-translate="credit-auto">Credit auto</b></p>
            <ul>
                <li data-translate="credit-auto-1">Pentru achiziția unui autovehicul nou sau second-hand.</li>
                <li data-translate="credit-auto-2">Avans recomandat: 10-20%.</li>
            </ul>

            <p><b data-translate="credit-nevoi">Credit de nevoi personale</b></p>
            <ul>
                <li data-translate="credit-nevoi-1">Pentru cheltuieli diverse: mobilă, renovare, vacanțe, educație.</li>
                <li data-translate="credit-nevoi-2">De regulă nu necesită avans.</li>
            </ul>

            <p><b data-translate="linie-credit">Linie de credit (overdraft)</b></p>
            <ul>
                <li data-translate="linie-credit-1">Permite acces rapid la fonduri disponibile în cont.</li>
                <li data-translate="linie-credit-2">Limitele se stabilesc în funcție de venitul lunar și istoricul financiar.</li>
            </ul>

            <p><b data-translate="credit-refinantare">Credit de refinanțare</b></p>
            <ul>
                <li data-translate="credit-refinantare-1">Reunește mai multe credite într-unul singur, cu o rată lunară unică și dobândă negociată.</li>
                <li data-translate="credit-refinantare-2">Poate include rambursarea avansului deja plătit la creditele vechi.</li>
            </ul>
        </section>
    </div>

    <!-- Card Secțiunea 2 -->
    <div class="cards">
        <section class="section-2">
            <h2 data-translate="sectiune-2-titlu"><b>2.Tipuri de rată și subcategoriile lor</b></h2>
            <hr>
            <p><b data-translate="rata-anuitate">Rată cu anuități constante (Anuitate)</b></p>
            <ul>
                <li data-translate="rata-anuitate-1">Plata lunară este fixă pe toată perioada creditului.</li>
                <li data-translate="rata-anuitate-2">Avantaj: buget predictibil, ușor de planificat.</li>
            </ul>

            <p><b data-translate="rata-descrescatoare">Rată descrescătoare (Rate egale de capital)</b></p>
            <ul>
                <li data-translate="rata-descrescatoare-1">Rata lunară scade treptat pe măsură ce soldul creditului scade.</li>
                <li data-translate="rata-descrescatoare-2">Primele rate sunt mai mari, dar costul total al dobânzii este mai mic.</li>
            </ul>

            <p><b data-translate="sub-rata-gratie">Subcategorie: Rate cu perioadă de grație</b></p>
            <ul>
                <li data-translate="sub-rata-gratie-1">Se poate aplica ambelor tipuri de rată (anuitate sau descrescătoare).</li>
                <li data-translate="sub-rata-gratie-2">În perioada de grație, utilizatorul plătește doar dobânda, nu și principalul.</li>
                <li data-translate="sub-rata-gratie-3">Avantaj: reduce presiunea financiară inițială, util la credite mari sau proiecte noi.</li>
            </ul>
        </section>
    </div>

    <!-- Card Secțiunea 3 -->
    <div class="cards">
        <section class="section-3">
            <h2 data-translate="sectiune-3-titlu"><b>3.Tipuri de dobândă și subcategoriile lor</b></h2>
            <hr>
            <p><b data-translate="dobanda-fixa">Dobândă fixă</b></p>
            <ul>
                <li data-translate="dobanda-fixa-1">Rata dobânzii rămâne neschimbată pe toată perioada creditului.</li>
                <li data-translate="dobanda-fixa-2">Avantaj: siguranță și predictibilitate a plăților.</li>
            </ul>

            <p><b data-translate="dobanda-variabila">Dobândă variabilă</b></p>
            <ul>
                <li data-translate="dobanda-variabila-1">Rata dobânzii se ajustează periodic în funcție de un indice de referință.</li>
                <li data-translate="dobanda-variabila-2">Avantaj: posibilă reducere a costului dacă dobânzile de piață scad.</li>
            </ul>

            <p><b data-translate="dobanda-mixta">Subcategorie: Dobândă mixtă</b></p>
            <ul>
                <li data-translate="dobanda-mixta-1">Se poate aplica ambelor tipuri (fixă sau variabilă).</li>
                <li data-translate="dobanda-mixta-2">Primele luni sau ani: dobândă fixă sau variabilă, apoi trece la variabilă sau fixă.</li>
                <li data-translate="dobanda-mixta-3">Avantaj: combină siguranța inițială cu flexibilitatea pe termen lung.</li>
            </ul>
        </section>
    </div>

    <!-- Card Secțiunea 4 -->
    <div class="cards">
        <section class="section-4">
            <h2 data-translate="sectiune-4-titlu"><b>4.Rolul avansului și utilizarea lui</b></h2>
            <hr>
            <p data-translate="avans-info-1">Avansul reprezintă suma plătită înainte de a primi creditul.</p>
            <p data-translate="avans-info-2">Scade suma finanțată, implicit rata lunară și dobânda totală.</p>
            <p data-translate="avans-info-3">Este folosit mai ales la:</p>
            <ul>
                <li data-translate="avans-info-4">Credite ipotecare</li>
                <li data-translate="avans-info-5">Credite auto</li>
            </ul>

            <p data-translate="avans-info-6">În aplicația web, utilizatorul introduce avansul, iar calculatorul ajustează automat:</p>
            <ul>
                <li data-translate="avans-info-7">Rata lunară</li>
                <li data-translate="avans-info-8">Dobânda lunară și totală</li>
            </ul>
        </section>
    </div>

    <!-- Card Secțiunea 5 -->
    <div class="cards">
        <section class="section-5">
            <h2 data-translate="sectiune-5-titlu"><b>5. Opțiuni de rambursare anticipată</b></h2>
            <hr>
            <p data-translate="rambursare-info-1">Rambursarea anticipată permite plata parțială sau integrală a creditului înainte de termen, reducând dobânda sau perioada.</p>

            <p><b data-translate="reduce-perioada-titlu">Reducere perioadă, rata rămâne aceeași</b></p>
            <ul>
                <li data-translate="reduce-perioada-1">Plata suplimentară scurtează perioada de rambursare.</li>
                <li data-translate="reduce-perioada-2">Rata lunară rămâne aceeași.</li>
                <li data-translate="reduce-perioada-3">Avantaj: creditul se termină mai repede și dobânda totală scade.</li>
            </ul>

            <p><b data-translate="reduce-rata-titlu">Reducere rată, perioada rămâne aceeași</b></p>
            <ul>
                <li data-translate="reduce-rata-1">Plata suplimentară reduce rata lunară.</li>
                <li data-translate="reduce-rata-2">Perioada de rambursare rămâne aceeași.</li>
                <li data-translate="reduce-rata-3">Avantaj: mai ușor de plătit lunar, flexibilitate în buget.</li>
            </ul>
        </section>
    </div>

</div>
<div id="spinner" class="spinner" style="display:none;"></div>
<!-- Sfirsit Div cu taote cards  -->
</main>
<br><br><br>
<footer class="footer" data-translate="footer">
    Dinybank | © Copyright 2025 Toate drepturile rezervate.
</footer>
<script src="../js/repeat.js"></script>
<script src="../js/lang/informatii-language.js"></script>
  
</body>
</html> 