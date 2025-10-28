// --- Obiect cu traduceri ---
// --- CODUL COMUN ---
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
const translations = {
    ro: {
        "home": "Acasă",
        "calculator": "Calculator Credite",
        "info": "Informații",
        "login": "Login",
        "register": "Register",
        "logo": "Diny Bank",

        "register-title": "Înregistrare",
        "register-subtitle": "Crează un cont",
        "name-label": "Nume",
        "email-label": "Adresa de Email",
        "password-label": "Parola",
        "have-account": "Ai deja cont?",
        "login-account": "Conectează-te",
        "register-btn": "Înregistrează-te",
        "footer": "Dinybank | © Copyright 2025 Toate drepturile rezervate.",

        // Placeholders
        "name-placeholder": "Numele tău",
        "email-placeholder": "exemplu@gmail.com",
        "password-placeholder": "*******"
    },
    en: {
        "home": "Home",
        "calculator": "Credit Calculator",
        "info": "Information",
        "login": "Login",
        "register": "Register",
        "logo": "Diny Bank",

        "register-title": "Register",
        "register-subtitle": "Create an account",
        "name-label": "Name",
        "email-label": "Email Address",
        "password-label": "Password",
        "have-account": "Already have an account?",
        "login-account": "Login",
        "register-btn": "Sign Up",
        "footer": "Dinybank | © Copyright 2025 All rights reserved.",

        // Placeholders
        "name-placeholder": "Your name",
        "email-placeholder": "example@gmail.com",
        "password-placeholder": "*******"
    },
    ru: {
        "home": "Главная",
        "calculator": "Калькулятор Кредитов",
        "info": "Информация",
        "login": "Вход",
        "register": "Регистрация",
        "logo": "Diny Bank",

        "register-title": "Регистрация",
        "register-subtitle": "Создайте аккаунт",
        "name-label": "Имя",
        "email-label": "Электронная почта",
        "password-label": "Пароль",
        "have-account": "Уже есть аккаунт?",
        "login-account": "Войти",
        "register-btn": "Зарегистрироваться",
        "footer": "Dinybank | © Copyright 2025 Все права защищены.",

        // Placeholders
        "name-placeholder": "Ваше имя",
        "email-placeholder": "пример@gmail.com",
        "password-placeholder": "*******"
    }
};

// --- Funcție pentru actualizarea textului ---
function translatePage(lang) {
    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // traducem și placeholder-urile
    document.querySelectorAll("[data-placeholder]").forEach(input => {
        const key = input.getAttribute("data-placeholder");
        if (translations[lang] && translations[lang][key]) {
            input.placeholder = translations[lang][key];
        }
    });
}

// --- Detectarea schimbării limbii și salvare în localStorage ---
document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("lang");

    // Verificăm dacă există o limbă salvată
    const savedLang = localStorage.getItem("language") || "ro";
    langSelect.value = savedLang;
    translatePage(savedLang);

    // Când se schimbă limba
    langSelect.addEventListener("change", () => {
        const lang = langSelect.value;
        localStorage.setItem("language", lang);
        translatePage(lang);
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