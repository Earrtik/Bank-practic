// --- Obiect cu traduceri ---

const translations = {
    ro: {
        "home": "Acasă",
        "calculator": "Calculator Credite",
        "info": "Informații",
        "login": "Login",
        "register": "Register",
        "logo": "Diny Bank",
        "login-title": "Conectare",
        "login-subtitle": "Intra în contul tău",
        "email-label": "Adresa de Email",
        "password-label": "Parola",
        "forgot": "Ai uitat parola?",
        "login-btn": "Intra în cont",
        "no-account": "Nu ai cont?",
        "register-account": "Înregistrare",
        "footer": "Dinybank | © Copyright 2025 Toate drepturile rezervate.",
        "login" : "Login",
        "register" : "register"
    },
    en: {
        "home": "Home",
        "calculator": "Credit Calculator",
        "info": "Information",
        "login": "Login",
        "register": "Register",
        "logo": "Diny Bank",
        "login-title": "Login",
        "login-subtitle": "Enter your account",
        "email-label": "Email Address",
        "password-label": "Password",
        "forgot": "Forgot password?",
        "login-btn": "Login",
        "no-account": "Don't have an account?",
        "register-account": "Register",
        "footer": "Dinybank | © Copyright 2025 All rights reserved.",
        "login" : "Login",
        "register" : "register"
    },
    ru: {
        "home": "Главная",
        "calculator": "Калькулятор Кредитов",
        "info": "Информация",
        "login": "Вход",
        "register": "Регистрация",
        "logo": "Diny Bank",
        "login-title": "Вход",
        "login" : "Вход",
        "register" : "Регистрация",
        "login-subtitle": "Войдите в свой аккаунт",
        "email-label": "Электронная почта",
        "password-label": "Пароль",
        "forgot": "Забыли пароль?",
        "login-btn": "Войти",
        "no-account": "Нет аккаунта?",
        "register-account": "Регистрация",
        "footer": "Dinybank | © Copyright 2025 Все права защищены."

    }
};

// --- Functie pentru actualizarea textului ---
function translatePage(lang) {
    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        if(translations[lang] && translations[lang][key]){
            el.textContent = translations[lang][key];
        }
    });
}

// --- Detectarea schimbării limbii ---
document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("lang");

    // traducere inițială (RO implicit)
    translatePage(langSelect.value);

    // când se schimbă limba
    langSelect.addEventListener("change", () => {
        translatePage(langSelect.value);
    });
});



// --- CODUL COMUN PNTRU SALVARE LIMBA PE PAGINI ---
document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("lang");
    const savedLang = localStorage.getItem("language") || "ro";
    if (langSelect) langSelect.value = savedLang;
    translatePage(savedLang);
    if (langSelect) {
        langSelect.addEventListener("change", () => {
            const lang = langSelect.value;
            localStorage.setItem("language", lang);
            translatePage(lang);
        });
    }
});