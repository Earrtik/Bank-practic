<?php
session_start(); // pornim sesiunea
$loggedIn = isset($_SESSION['user_id']); // verificăm dacă utilizatorul este logat
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link rel="stylesheet" href="../style/credite.css" />
    <link rel="stylesheet" href="../style/repeat.css" />

    <title>Diny bank credite</title>
   
</head>
<body>
    <!-- Header -->
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
                    <a href="credite.php" class="a2" data-translate="a2">Calculator Credite</a>
                    <a href="informatii.php" class="a3 spinner-link" data-translate="a3">Informații</a>
                </div>

                <?php if (!$loggedIn): ?>
                    <a href="../../frontend/html/login.php" class="login spinner-link">Login</a>
                    <a href="/frontend/html/register.php" class="spinner-link">
                        <button class="register">Register</button>
                    </a>
                <?php else: ?>
                    <a href="istoric.php" class="spinner-link"><i class="bi bi-clock-history"></i></a>
                    <a href="../../frontend/html/favorite.php" class="spinner-link"><i class="bi bi-heart" id="heart"></i></a>
                    <a href="../../backend/php/logout.php" class="spinner-link"><i class="bi bi-box-arrow-right" id="logout"></i></a>
                <?php endif; ?>

                <div class="language-select">
                    <hr class="left-language" />
                    <select id="lang">
                        <option value="ro">RO</option>
                        <option value="ru">RU</option>
                        <option value="en">EN</option>
                    </select>
                    <hr class="right-language" />
                </div>
            </div>
        </div>
    </header>

    <!-- Main content -->
    <main>
        <div class="content">
            <!-- Calculator header -->
            <div>
                <h1 class="calculator-st" data-translate="calculator-st">Calculator</h1>
                <h3 class="for-credit" data-translate="for-credit">Pentru credite</h3>
                <hr />
                <p class="type-valuta" id="currency">
                    <span data-translate="type-valuta">Alege valuta: </span>
                    <a href="#" class="valuta-mdl" data-valuta="MDL">MDL</a>
                    <a href="#" class="valuta" data-valuta="EUR">EUR</a>
                    <a href="#" class="valuta" data-valuta="USD">USD</a>
                </p>
                <hr />
            </div>

            <form id="calculator-form"  action="../../backend/php/credite.php" method="POST">
                <!-- Form credit -->
                <div class="credit-form">
                    <h3 data-translate="tip-credit">Tip credit</h3>
                    <select name="" class="input-tip-credit">
                        <option value="" data-translate-option="opt-credit">-- Alege tipul de credit --</option>
                        <option value="ipotecar" data-translate-option="opt-ipotecar">Credit ipotecar / imobiliar</option>
                        <option value="nevoi" data-translate-option="opt-nevoi">Credit de nevoi personale</option>
                        <option value="auto" data-translate-option="opt-auto">Credit auto</option>
                        <option value="linie" data-translate-option="opt-linie">Linie de credit (overdraft)</option>
                        <option value="refinantare" data-translate-option="opt-refinantare">Credit de refinanțare</option>
                    </select>
                    <div class="error error-tip-credit"></div>

                    <br /><br />
                    <!-- Suma imprumutata -->
                    <span class="span-content" data-translate="suma-imprumutata">Suma Imprumutata</span>
                    <div class="input-wrapper">
                      <input type="number" min="1000" max="100000000" step="200" class="suma input-suma" placeholder=" " data-translate-placeholder="ph-suma" />
                        <span class="placeholder-left">1000 - 100,000,000</span>
                        <span class="placeholder-right">LEI</span>
                    </div>
                    <div class="error error-suma"></div>

                    <br />
                    <!-- Perioada -->
                    <span class="span-content" data-translate="perioada">Perioada</span>
                    <div class="input-wrapper">
                        <input type="number" min="2" max="360" class="suma input-perioada" placeholder="" data-translate-placeholder="ph-perioada" />
                        <span class="placeholder-left" data-translate="ph-perioada-label">Perioada</span>
                    </div>
                    <div class="error error-perioada"></div>
                </div>

                <!-- Tip rata -->
                <div class="into-border-div">
                    <div class="text-form">
                        <span class="span-content" data-translate="tip-rata">Tip Rata</span>
                        <select class="input-tip-rata">
                            <option value="" data-translate-option="opt-rata">-- Alege tipul de rata --</option>
                            <option value="contant" data-translate-option="opt-constanta">Rate cu Anuități Constante</option>
                            <option value="descrescatoare" data-translate-option="opt-descrescatoare">Rate Descrescătoare</option>
                        </select>
                        <div class="error error-tip-rata"></div>


                        <input type="checkbox" id="gratie-checkbox" class="checkbox" />
                        <span class="span-chekbox" data-translate="include-gratie">Include Perioada de gratie Optional</span>

                        <div class="conditional" data-target="gratie-checkbox" style="display:none;">
                            <br />
                            <span class="span-content" data-translate="durata-gratie">Durata perioada de gratie</span>
                            <select class="input-durata-gratie">
                                <option value="" data-translate-option="opt-gratie">-- Alege durata de gratie --</option>
                                <option value="prima-luna" data-translate-option="opt-1luna">Prima Luna</option>
                                <option value="luna-3" data-translate-option="opt-3luni">Primele 3 luni</option>
                                <option value="luna-6" data-translate-option="opt-6luni">Primele 6 luni</option>
                                <option value="luna-9" data-translate-option="opt-9luni">Primele 9 luni</option>
                                <option value="luna-12" data-translate-option="opt-12luni">Primele 12 luni</option>
                            </select>
                            <div class="error error-durata-gratie"></div>
                            <br /><br />
                        </div>
                    </div>
                </div>

                <!-- Tip dobanda -->
                <div class="into-border-div">
                    <div class="text-form">
                        <p data-translate="tip-dobanda">Tip Dobândă</p>
                        <select class="input-tip-dobanda">
                            <option value="" data-translate-option="opt-dobanda">-- Alege tipul de Dobândă --</option>
                            <option value="fixa" data-translate-option="opt-fixa">Dobândă Fixă</option>
                            <option value="variabila" data-translate-option="opt-variabila">Dobândă Variabilă</option>
                        </select>
                        <div class="error error-tip-dobanda"></div>

                        <input type="checkbox" id="dobinda-mixta-checkbox" class="checkbox" />
                        <span class="span-chekbox" data-translate="include-mixta">Include Dobinda mixta Optional</span>

                        <div class="conditional" data-target="dobinda-mixta-checkbox" style="display:none;">
                            <br />
                            <span class="span-content" data-translate="initial-mixta">Initial Dobinda Fixa dupa Dobinda Variabilă</span>
                            <select class="input-initial-mixta">
                                <option value="" data-translate-option="opt-initial-dobinda">-- Alege Initial tip Dobinda --</option>
                                <option value="start-fixa" data-translate-option="opt-start-fixa">Inital Dobândă Fixă</option>
                                <option value="start-variabila" data-translate-option="opt-start-variabila">Initial Dobinda Variabilă</option>
                            </select>
                            <div class="error error-initial-mixta"></div>

                            <br /><br /><br />
                            <span class="span-content" data-translate="durata-gratie">Durata perioada de gratie</span>
                            <select class="input-durata-gratie-mixta">
                                <option value="" data-translate-option="opt-gratie">-- Alege durata de gratie --</option>
                                <option value="prima-luna" data-translate-option="opt-1luna">Prima Luna</option>
                                <option value="luna-3" data-translate-option="opt-3luni">Primele 3 luni</option>
                                <option value="luna-6" data-translate-option="opt-6luni">Primele 6 luni</option>
                                <option value="luna-9" data-translate-option="opt-9luni">Primele 9 luni</option>
                                <option value="luna-12" data-translate-option="opt-12luni">Primele 12 luni</option>
                            </select>
                            <div class="error error-durata-gratie-mixta"></div>
                            <br /><br />
                        </div>
                    </div>
                </div>

                <!-- Avans si salariu -->
                <div class="credit-form">
                    <span class="span-content" data-translate="avans">Avans</span>
                    <div class="input-wrapper">
                       <input type="number" min="1000" max="60000000" step="200" class="avans input-avans" placeholder=" " data-translate-placeholder="ph-avans" />
                        <span class="placeholder-left">1000 - 60,000,000</span>
                        <span class="placeholder-right">LEI</span>
                    </div>
                    <div class="error error-avans"></div>
                    <br />
                    <span class="span-content" data-translate="salariu">Salariul</span>
                    <div class="input-wrapper">
                       <input type="number" min="1000" max="300000" step="200" class="salariu input-salariu" placeholder=" " data-translate-placeholder="ph-salariu" />
                        <span class="placeholder-left">1000 - 300,000</span>
                        <span class="placeholder-right">LEI</span>
                    </div>
                    <div class="error error-salariu"></div>
                    <br />
                </div>

                <!-- Rambursare anticipata -->
                <div class="into-border-div">
                    <div class="text-form">
                        <input type="checkbox" id="rambursare-checkbox" class="checkbox" />
                        <span class="span-chekbox" data-translate="rambursare">Activeaza rambursarea Optional</span>

                        <div class="conditional" data-target="rambursare-checkbox" style="display:none;">
                            <br />
                            <span class="span-content" data-translate="suma-rambursare">Suma pentru rambursare anticipata</span>
                            <div class="input-wrapper">
                                <input type="number" class="input-suma-rambursare" min="1000" max="300000" step="200" data-translate-placeholder="ph-suma-rambursare" />
                                <span class="placeholder-left">1000 - 300,000</span>
                                <span class="placeholder-right">Lei</span>
                            </div>
                            <div class="error error-suma-rambursare"></div>

                            <br />
                            <span class="span-content" data-translate="optiune-rambursare">Optiunea de rambursare anticipata</span>
                            <select class="input-optiune-rambursare">
                                <option value="" data-translate-option="opt-gratie">-- Alege durata de gratie --</option>
                                <option value="reduce-perioada" data-translate-option="opt-reduce-perioada">Reducere perioadă, rata rămâne aceeași</option>
                                <option value="reduce-rata" data-translate-option="opt-reduce-rata">Reducere rată, perioada rămâne aceeași</option>
                            </select>
                            <div class="error error-optiune-rambursare"></div>
                            <br /><br />
                        </div>
                    </div>
                </div>

                <!-- Buton calcul -->
                <br />
                <div class="credit-form">
                    
                        <button class="btn-calcul  " data-translate="btn-calcul">Calculeaza</button>
                    
                    <br /><br />
                    <div class="eur-usd-rate">
                        <div>1 EUR = <span id="eur-rate">…</span> MDL</div>
                        <div>1 USD = <span id="usd-rate">…</span> MDL</div>
                    </div>
                    <br />
                </div>
            </form>
        </div>

        <!-- Afisare rezultate -->
        <br><br>
        <div class="content-rezult">
            <p class="p-rez" data-translate="rezultate">Rezultatele</p>
            <div class="rezult" data-target="rezultate">
                <p data-translate="rez-rata-lunara">Rata lunara:</p>
                <p data-translate="rez-rata-totala">Rata totala:</p>
                <p data-translate="rez-dobanda-lunara">Dobanda lunara:</p>
                <p data-translate="rez-dobanda-totala">Dobanda totala:</p>
                <p data-translate="rez-comision">Comisionul:</p>
                <p data-translate="rez-dae">DAE:</p>
                <p data-translate="rez-comisie-rata">Comisie si rata totala:</p>
                <hr>
               
            </div>
        </div>

        <br />
        
        
        <div class="content-grafic" style="display:none;">
            <h2 data-translate="grafic-rambursare">Grafic de rambursare</h2>
            <!-- Canvas pentru grafic -->
            <canvas class="grafic-rambursare" width="800" height="400"></canvas>

            
            <div class="all-icons">
                <div class="div-icon1">
                    <a>
                        <i class="bi bi-heart" id="icon1" data-id="<?= $simulare_id ?>"></i> 
                        <span data-translate="icon-favorit">Adauga la favorit</span>
                    </a>
                </div>
                <div class="div-icon2">
                    <a><i class="bi bi-download" id="icon2"></i> <span data-translate="icon-pdf">Export tot PDF</span></a>
                </div>
     <div class="div-icon3">
         <a><i class="bi bi-box-arrow-up-right" id="icon3"></i> <span data-translate="icon-link">Creaza link</span></a>
        </div>
    </div>
    <!-- Tabel pentru amortizare -->
    <div class="tabel-amortizare" style="margin-top:20px;"></div>
        </div>



        </div>
        <div id="spinner" class="spinner" style="display:none;"></div>
    </main>

    <br /><br />
    <footer class="footer" data-translate="footer">
        <p>Dinybank | © Copyright 2025 Toate drepturile rezervate.</p>
    </footer>
    <script src="../js/credite.js"></script>
    <script src="../js/lang/credit-language.js"></script>
    <script src="../js/repeat.js"></script>
    <script src="../js/validate-credit.js"></script>
    <script src="../js/favorite.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

</body>
</html>
