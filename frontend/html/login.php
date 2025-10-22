<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style/login.css">
    <link rel="stylesheet" href="../style/repeat.css">
    <link rel="stylesheet" href="../style/login_register_repeat.css">
    <title>Diny-Bank Login</title>
</head>
<body>
    <header>
        <div class="menu-container">
            <div class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="menu-items" id="menu-items">
                <div class="menu">
                    <a href="" class="a1" data-translate="home">Acasă</a>
                    <a href="credite.php" class="a2" data-translate="calculator">Calculator Credite</a>
                    <a href="informatii.php" class="a3" data-translate="info">Informații</a>
                </div>

                <div id="guest-menu">
                    <a  class="login" data-translate="login">Login</a>
                    <a href="register.php">
                        <button class="register" data-translate="register">Register</button>
                    </a>
                </div>

                <div id="user-menu" style="display:none;">
                    <a  ><img src="../photo/user_icon.png" alt="Profil"></a>
                    <a href="mesaje.php"><img src="../photo/message_icon.png" alt="Mesaje"></a>
                    <a href="setari.php"><img src="../photo/settings_icon.png" alt="Setări"></a>
                    <a href="../../backend/php/logout.php"><img src="../photo/logout_icon.png" alt="Logout"></a>
                </div>

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
        <p class="logo" data-translate="logo">Diny Bank</p>
    </header>

    <main> 
        <img src="../../photo/register_login.png" alt="">
        <div class="content">
            <div class="form-box">
                <form action="../../backend/php/login.php" method="POST">
                    <div class="in-form-box">
                        <h1 data-translate="login-title">Conectare</h1>
                        <h3 data-translate="login-subtitle">Intra în contul tău</h3>

                        <label for="email" data-translate="email-label">Adresa de Email</label>    
                        <input type="email" name="email" id="email" placeholder="Exemplu@gmail.com" required>
                        
                        <label for="password" data-translate="password-label">Parola</label>    
                        <input type="password" name="password" id="password" placeholder="*********" required>
                        
                        <div id="login-errors" style="color:red; margin-top:5px;"></div>

                        <br>
                        <a href="" class="forgout-password">
                            <p data-translate="forgot">Ai uitat parola?</p>
                        </a>
                        <button type="submit" class="login-btn" data-translate="login-btn">Intra în cont</button>

                        <div class="dont-have-container">
                            <p class="dont-have-account" data-translate="no-account">Nu ai cont?</p>
                            <a href="register.php">
                                <p class="register-account" data-translate="register-account">Înregistrare</p>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div id="spinner" class="spinner" style="display: none;"></div>
    </main>
        <br><br>
    <footer class="footer" data-translate="footer">
        Dinybank | © Copyright 2025 Toate drepturile rezervate.
    </footer>

    <script src="../js/lang/login-language.js"></script>
</body>
</html>
