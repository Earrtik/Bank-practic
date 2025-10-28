// language-credit.js

// Obiect cu traduceri pentru toate textele paginii și tabelul
const translations = {
    "ro": {
        "a1": "Acasă",
        "a2": "Calculator Credite",
        "a3": "Informații",
        "calculator-st": "Calculator",
        "for-credit": "Pentru credite",
        "type-valuta": "Alege valuta:",
        "tip-credit": "Tip credit",
        "opt-credit": "-- Alege tipul de credit --",
        "opt-ipotecar": "Credit ipotecar / imobiliar",
        "opt-nevoi": "Credit de nevoi personale",
        "opt-auto": "Credit auto",
        "opt-linie": "Linie de credit (overdraft)",
        "opt-refinantare": "Credit de refinanțare",
        "suma-imprumutata": "Suma Imprumutata",
        "ph-suma": " ",
        "perioada": "Perioada",
        "ph-perioada": "",
        "ph-perioada-label": "Perioada",
        "tip-rata": "Tip Rata",
        "opt-rata": "-- Alege tipul de rata --",
        "opt-constanta": "Rate cu Anuități Constante",
        "opt-descrescatoare": "Rate Descrescătoare",
        "include-gratie": "Include Perioada de gratie Optional",
        "durata-gratie": "Durata perioada de gratie",
        "opt-gratie": "-- Alege durata de gratie --",
        "opt-1luna": "Prima Luna",
        "opt-3luni": "Primele 3 luni",
        "opt-6luni": "Primele 6 luni",
        "opt-9luni": "Primele 9 luni",
        "opt-12luni": "Primele 12 luni",
        "opt-24luni": "Primele 24 luni",
        "tip-dobanda": "Tip Dobândă",
        "opt-dobanda": "-- Alege tipul de Dobândă --",
        "opt-fixa": "Dobândă Fixă",
        "opt-variabila": "Dobândă Variabilă",
        "include-mixta": "Include Dobinda mixta Optional",
        "initial-mixta": "Ce dobinda v-a fi initial",
        "opt-initial-dobinda": "-- Alege Initial tip Dobinda --",
        "opt-start-fixa": "Inital Dobândă Fixă",
        "opt-start-variabila": "Initial Dobinda Variabilă",
        "avans": "Avans",
        "ph-avans": " ",
        "salariu": "Salariul",
        "ph-salariu": " ",
        "rambursare": "Activeaza rambursarea Optional",
        "suma-rambursare": "Suma pentru rambursare anticipata",
        "ph-suma-rambursare": " ",
        "optiune-rambursare": "Optiunea de rambursare anticipata",
        "opt-reduce-perioada": "Reducere perioadă, rata rămâne aceeași",
        "opt-reduce-rata": "Reducere rată, perioada rămâne aceeași",
        "btn-calcul": "Calculeaza",
        "rezultate": "Rezultatele",
        "vezi-tabel": "Vezi tabel cu toate rezultatele",
        "rez-rata-lunara": "Rata lunara :",
        "rez-rata-totala": "Rata totala :",
        "rez-dobanda-lunara": "Dobanda lunara :",
        "rez-dobanda-totala": "Dobanda totala :",
        "rez-comision": "Comisionul :",
        "rez-dae": "DAE :",
        "rez-comisie-rata": "Comisie si rata totala :",
        "icon-favorit": "Adauga la favorit",
        "icon-pdf": "Export tot PDF",
        "icon-link": "Creaza link",
        "grafic-rambursare": "Grafic de rambursare",
        "footer": "Dinybank | © Copyright 2025 Toate drepturile rezervate.",
        "Rata lunara": "Rata lunara",
        "Rata totala": "Rata totala",
        "Dobanda lunara": "Dobanda lunara",
        "Dobanda totala": "Dobanda totala",
        "Comision": "Comision",
        "DAE": "DAE",
        "Comisie si rata totala": "Comisie si rata totala",
        "Luna": "Luna",
        "Data scadenta": "Data scadenta",
        "Principal": "Principal",
        "Sold ramas": "Sold ramas",

        "login": "Login",
        "register": "Register",

        "Selecteaza tipul de credit": "Selecteaza tipul de credit",
        "Selecteaza suma intre 1.000 si 100.000.000 unitati": "Selecteaza suma intre 1.000 si 100.000.000 unitati",
        "Selectati perioda intre 2-360 luni": "Selectati perioda intre 2-360 luni",
        "Selecteaza tipul de rata": "Selecteaza tipul de rata",
        "Selecteaza tipul de dobinda": "Selecteaza tipul de dobinda",
        "Salariu": "Grad de Indatorare depasit - alege o suma mai mare",

    
    },
    "en": {
        "a1": "Home",
        "a2": "Credit Calculator",
        "a3": "Information",
        "calculator-st": "Calculator",
        "for-credit": "For credits",
        "type-valuta": "Choose currency:",
        "tip-credit": "Credit type",
        "opt-credit": "-- Choose credit type --",
        "opt-ipotecar": "Mortgage / Real estate credit",
        "opt-nevoi": "Personal needs credit",
        "opt-auto": "Car loan",
        "opt-linie": "Credit line (overdraft)",
        "opt-refinantare": "Refinancing credit",
        "suma-imprumutata": "Loan amount",
        "ph-suma": " ",
        "perioada": "Period",
        "ph-perioada": "",
        "ph-perioada-label": "Period",
        "tip-rata": "Installment type",
        "opt-rata": "-- Choose installment type --",
        "opt-constanta": "Constant annuities",
        "opt-descrescatoare": "Decreasing installments",
        "include-gratie": "Include Grace Period (Optional)",
        "durata-gratie": "Grace period duration",
        "opt-gratie": "-- Choose grace duration --",
        "opt-1luna": "First month",
        "opt-3luni": "First 3 months",
        "opt-6luni": "First 6 months",
        "opt-9luni": "First 9 months",
        "opt-12luni": "First 12 months",
        "opt-24luni": "First 24 months",
        "tip-dobanda": "Interest type",
        "opt-dobanda": "-- Choose interest type --",
        "opt-fixa": "Fixed interest",
        "opt-variabila": "Variable interest",
        "include-mixta": "Include Mixed Interest (Optional)",
        "initial-mixta": "What will be the initial interest rate",
        "opt-initial-dobinda": "-- Choose initial interest type --",
        "opt-start-fixa": "Initial Fixed Interest",
        "opt-start-variabila": "Initial Variable Interest",
        "avans": "Advance",
        "ph-avans": " ",
        "salariu": "Salary",
        "ph-salariu": " ",
        "rambursare": "Activate early repayment (Optional)",
        "suma-rambursare": "Early repayment amount",
        "ph-suma-rambursare": " ",
        "optiune-rambursare": "Early repayment option",
        "opt-reduce-perioada": "Reduce period, rate stays the same",
        "opt-reduce-rata": "Reduce rate, period stays the same",
        "btn-calcul": "Calculate",
        "rezultate": "Results",
        "vezi-tabel": "View full results table",
        "rez-rata-lunara": "Monthly installment :",
        "rez-rata-totala": "Total installment :",
        "rez-dobanda-lunara": "Monthly interest :",
        "rez-dobanda-totala": "Total interest :",
        "rez-comision": "Commission :",
        "rez-dae": "APR :",
        "rez-comisie-rata": "Commission & total installment :",
        "icon-favorit": "Add to favorites",
        "icon-pdf": "Export all PDF",
        "icon-link": "Create link",
        "grafic-rambursare": "Repayment chart",
        "footer": "Dinybank | © Copyright 2025 All rights reserved.",
        "Rata lunara": "Monthly installment",
        "Rata totala": "Total installment",
        "Dobanda lunara": "Monthly interest",
        "Dobanda totala": "Total interest",
        "Comision": "Commission",
        "DAE": "APR",
        "Comisie si rata totala": "Commission & total installment",
        "Luna": "Month",
        "Data scadenta": "Due Date",
        "Principal": "Principal",
        "Sold ramas": "Remaining Balance",
        "login": "Login",
        "register": "Register",
        "Selecteaza tipul de credit": "Select credit type",
        "Selecteaza suma intre 1.000 si 100.000.000 unitati": "Select amount between 1,000 and 100,000,000 units",
        "Selectati perioda intre 2-360 luni": "Select period between 2-360 months",
        "Selecteaza tipul de rata": "Select rate type",
        "Selecteaza tipul de dobinda": "Select interest type",
        "Salariu": "Debt ratio exceeded — choose a smaller amount"
    },
    "ru": {
        "a1": "Главная",
        "a2": "Кредит калькулятор",
        "a3": "Информация",
        "calculator-st": "Калькулятор",
        "for-credit": "Для кредитов",
        "type-valuta": "Выберите валюту:",
        "tip-credit": "Тип кредита",
        "opt-credit": "-- Выберите тип кредита --",
        "opt-ipotecar": "Ипотечный / недвижимость",
        "opt-nevoi": "Кредит на личные нужды",
        "opt-auto": "Автокредит",
        "opt-linie": "Кредитная линия (овердрафт)",
        "opt-refinantare": "Рефинансирование",
        "suma-imprumutata": "Сумма займа",
        "ph-suma": " ",
        "perioada": "Срок",
        "ph-perioada": "",
        "ph-perioada-label": "Срок",
        "tip-rata": "Тип платежа",
        "opt-rata": "-- Выберите тип платежа --",
        "opt-constanta": "Аннуитетные платежи",
        "opt-descrescatoare": "Убывающие платежи",
        "include-gratie": "Включить льготный период (опционально)",
        "durata-gratie": "Продолжительность льготного периода",
        "opt-gratie": "-- Выберите продолжительность --",
        "opt-1luna": "Первый месяц",
        "opt-3luni": "Первые 3 месяца",
        "opt-6luni": "Первые 6 месяцев",
        "opt-9luni": "Первые 9 месяцев",
        "opt-12luni": "Первые 12 месяцев",
        "opt-24luni": "Первые 24 месяцев",
        "tip-dobanda": "Тип процентной ставки",
        "opt-dobanda": "-- Выберите тип ставки --",
        "opt-fixa": "Фиксированная ставка",
        "opt-variabila": "Переменная ставка",
        "include-mixta": "Включить смешанную ставку (опционально)",
        "initial-mixta": "Какая процентная ставка будет изначально",
        "opt-initial-dobinda": "-- Выберите начальный тип ставки --",
        "opt-start-fixa": "Начальная фиксированная ставка",
        "opt-start-variabila": "Начальная переменная ставка",
        "avans": "Аванс",
        "ph-avans": " ",
        "salariu": "Зарплата",
        "ph-salariu": " ",
        "rambursare": "Активировать досрочное погашение (опционально)",
        "suma-rambursare": "Сумма досрочного погашения",
        "ph-suma-rambursare": " ",
        "optiune-rambursare": "Опция досрочного погашения",
        "opt-reduce-perioada": "Сократить срок, ставка остается та же",
        "opt-reduce-rata": "Сократить ставку, срок остается тот же",
        "btn-calcul": "Рассчитать",
        "rezultate": "Результаты",
        "vezi-tabel": "Смотреть все результаты",
        "rez-rata-lunara": "Ежемесячный платеж :",
        "rez-rata-totala": "Общий платеж :",
        "rez-dobanda-lunara": "Ежемесячный процент :",
        "rez-dobanda-totala": "Общий процент :",
        "rez-comision": "Комиссия :",
        "rez-dae": "ЭПС :",
        "rez-comisie-rata": "Комиссия и общий платеж :",
        "icon-favorit": "Добавить в избранное",
        "icon-pdf": "Экспорт в PDF",
        "icon-link": "Создать ссылку",
        "grafic-rambursare": "График погашения",
        "footer": "Dinybank | © Copyright 2025 Все права защищены.",
        "Rata lunara": "Ежемесячный платеж",
        "Rata totala": "Общий платеж",
        "Dobanda lunara": "Ежемесячный процент",
        "Dobanda totala": "Общий процент",
        "Comision": "Комиссия",
        "DAE": "ЭПС",
        "Comisie si rata totala": "Комиссия и общий платеж",
        "Luna": "Месяц",
        "login": "Вход",
        "register": "Регистрация",
        "Data scadenta": "Срок платежа",
        "Principal": "Основная сумма",
        "Sold ramas": "Остаток",
        "Selecteaza tipul de credit": "Выберите тип кредита",
        "Selecteaza suma intre 1.000 si 100.000.000 unitati": "Выберите сумму от 1.000 до 100.000.000 единиц",
        "Selectati perioda intre 2-360 luni": "Выберите период от 2 до 360 месяцев",
        "Selecteaza tipul de rata": "Выберите тип платежа",
        "Selecteaza tipul de dobinda": "Выберите тип процента",
        "Salariu": "Превышен уровень задолженности — выберите меньшую сумму"
    }
};

const translationsError = {
    "ro": {
        "Trebuie să selectați tipul de credit": "Trebuie să selectați tipul de credit",
        "Trebuie să selectați tipul dobânzii": "Trebuie să selectați tipul dobânzii",
        "Suma trebuie să fie între 1.000 și 100.000.000 LEI": "Suma trebuie să fie între 1.000 și 100.000.000 LEI",
        "Perioada trebuie să fie între 2 și 360 luni": "Perioada trebuie să fie între 2 și 360 luni",
        "Trebuie să alegeți tipul de rată": "Trebuie să alegeți tipul de rată",
        "Trebuie să introduceți salariul": "Trebuie să introduceți salariul",
        "Grad de îndatorare depășit": "Grad de îndatorare depășit"
    },
    "en": {
        "Trebuie să selectați tipul de credit": "You must select a credit type",
        "Trebuie să selectați tipul dobânzii": "You must select an interest type",
        "Suma trebuie să fie între 1.000 și 100.000.000 LEI": "Amount must be between 1,000 and 100,000,000 LEI",
        "Perioada trebuie să fie între 2 și 360 luni": "Period must be between 2 and 360 months",
        "Trebuie să alegeți tipul de rată": "You must select an installment type",
        "Trebuie să introduceți salariul": "You must enter your salary",
        "Grad de îndatorare depășit": "Debt ratio exceeded"
    },
    "ru": {
        "Trebuie să selectați tipul de credit": "Необходимо выбрать тип кредита",
        "Trebuie să selectați tipul dobânzii": "Необходимо выбрать тип ставки",
        "Suma trebuie să fie între 1.000 și 100.000.000 LEI": "Сумма должна быть от 1.000 до 100.000.000 LEI",
        "Perioada trebuie să fie între 2 și 360 luni": "Срок должен быть от 2 до 360 месяцев",
        "Trebuie să alegeți tipul de rată": "Необходимо выбрать тип платежа",
        "Trebuie să introduceți salariul": "Необходимо ввести зарплату",
        "Grad de îndatorare depășit": "Превышен уровень задолженности"
    }
};


// Functie pentru traducere
function translatePage(lang) {
    // Texte simple
    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        if(translations[lang][key]) el.textContent = translations[lang][key];
    });

    // Option
    document.querySelectorAll("[data-translate-option]").forEach(el => {
        const key = el.getAttribute("data-translate-option");
        if(translations[lang][key]) el.textContent = translations[lang][key];
    });

    // Placeholder input
    document.querySelectorAll("[data-translate-placeholder]").forEach(el => {
        const key = el.getAttribute("data-translate-placeholder");
        if(translations[lang][key]) el.placeholder = translations[lang][key];
    });

    // --- Traduce erorile afisate ---
    document.querySelectorAll("[data-translate-error]").forEach(el => {
        const key = el.getAttribute("data-translate-error");
        if(translations[lang][key]) el.textContent = translations[lang][key];
    }); 

    // --- Traduce rezultatele afisate ---
    document.querySelectorAll("[data-translate-rezultat]").forEach(el => {
        const key = el.getAttribute("data-translate-rezultat");
        if(translations[lang][key]) el.textContent = translations[lang][key];
    });

    // --- Traduce  tabel ---
    const tabel = document.getElementById("tabel-amortizare");
    if(tabel) {
        tabel.querySelectorAll("th").forEach(th => {
            const key = th.getAttribute("data-translate-tabel");
            if(translations[lang][key]) th.textContent = translations[lang][key];
        });
    }
}

// Ascultam schimbarea limbii
document.getElementById("lang").addEventListener("change", (e) => {
    translatePage(e.target.value);
});

// La load, setam limba initiala
window.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("lang").value || "ro";
    translatePage(langSelect);
});
function translateErrors(lang){
    document.querySelectorAll("[data-translate-error]").forEach(el => {
        const key = el.getAttribute("data-translate-error");
        if(translationsError[lang][key]) el.textContent = translationsError[lang][key];
    });
}




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