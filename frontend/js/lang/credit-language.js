// language-credit.js

// Obiect cu traduceri pentru toate textele paginii
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
        "tip-dobanda": "Tip Dobândă",
        "opt-dobanda": "-- Alege tipul de Dobândă --",
        "opt-fixa": "Dobândă Fixă",
        "opt-variabila": "Dobândă Variabilă",
        "include-mixta": "Include Dobinda mixta Optional",
        "initial-mixta": "Initial Dobinda Fixa dupa Dobinda Variabilă",
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
        "rez-comision": "Comisionul : ",
        "rez-dae": "DAE : ",
        "rez-comisie-rata": "Comisie si rata totala :",
        "icon-favorit": "Adauga la favorit",
        "icon-pdf": "Export tot PDF",
        "icon-link": "Creaza link",
        "footer": "Dinybank | © Copyright 2025 Toate drepturile rezervate.",
        "grafic-rambursare": "Grafic de rambursare",
        "error-tip-credit": "Trebuie să selectați tipul de credit.",
        "error-perioada": "Perioada trebuie să fie între 2 și 360 luni.",
        "error-tip-rata": "Trebuie să alegeți tipul de rată.",
        "error-tip-dobanda": "Trebuie să selectați tipul de dobândă.",
        "error-grad-indatorare": "Grad de îndatorare depășit!",
        "rez-rata-lunara": "Rata lunară :",
        "rez-rata-totala": "Rata totală :",
        "rez-dobanda-lunara": "Dobânda lunară :",
        "rez-dobanda-totala": "Dobânda totală :",
        "rez-comision": "Comision :",
        "rez-dae": "DAE :",
        "rez-comisie-rata": "Comisie + rată totală :",
        "tabel-luna": "Luna",
        "tabel-data": "Data scadenta",
        "tabel-rata-totala": "Rata totala",
        "tabel-principal": "Principal",
        "tabel-dobanda": "Dobanda",
        "tabel-comision": "Comision",
        "tabel-sold-ramas": "Sold ramas"
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
        "tip-dobanda": "Interest type",
        "opt-dobanda": "-- Choose interest type --",
        "opt-fixa": "Fixed interest",
        "opt-variabila": "Variable interest",
        "include-mixta": "Include Mixed Interest (Optional)",
        "initial-mixta": "Initial Fixed after Variable Interest",
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
        "error-tip-credit": "You must select a credit type.",
        "error-perioada": "Period must be between 2 and 360 months.",
        "error-tip-rata": "You must select an installment type.",
        "error-tip-dobanda": "You must select an interest type.",
        "error-grad-indatorare": "Debt ratio exceeded!",
        "rez-rata-lunara": "Monthly installment :",
        "rez-rata-totala": "Total installment :",
        "rez-dobanda-lunara": "Monthly interest :",
        "rez-dobanda-totala": "Total interest :",
        "rez-comision": "Commission :",
        "rez-dae": "APR :",
        "rez-comisie-rata": "Commission + total installment :",
        "tabel-luna": "Month",
        "tabel-data": "Due date",
        "tabel-rata-totala": "Total installment",
        "tabel-principal": "Principal",
        "tabel-dobanda": "Interest",
        "tabel-comision": "Commission",
        "tabel-sold-ramas": "Remaining balance"
        
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
        "tip-dobanda": "Тип процентной ставки",
        "opt-dobanda": "-- Выберите тип ставки --",
        "opt-fixa": "Фиксированная ставка",
        "opt-variabila": "Переменная ставка",
        "include-mixta": "Включить смешанную ставку (опционально)",
        "initial-mixta": "Сначала фиксированная, потом переменная ставка",
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
        "icon-favorit": "Добавить в избранное ",
        "icon-pdf": "Экспорт в PDF",
        "icon-link": "Создать ссылку",
        "footer": "Dinybank | © Copyright 2025 Все права защищены.",
        "grafic-rambursare": "График погашения", "error-tip-credit": "Необходимо выбрать тип кредита.",
        "error-perioada": "Срок должен быть от 2 до 360 месяцев.",
        "error-tip-rata": "Необходимо выбрать тип платежа.",
        "error-tip-dobanda": "Необходимо выбрать тип ставки.",
        "error-grad-indatorare": "Превышена степень задолженности!",
        "rez-rata-lunara": "Ежемесячный платеж :",
        "rez-rata-totala": "Общий платеж :",
        "rez-dobanda-lunara": "Ежемесячный процент :",
        "rez-dobanda-totala": "Общий процент :",
        "rez-comision": "Комиссия :",
        "rez-dae": "ЭПС :",
        "rez-comisie-rata": "Комиссия + общий платеж :",
        "tabel-luna": "Месяц",
        "tabel-data": "Дата платежа",
        "tabel-rata-totala": "Общий платеж",
        "tabel-principal": "Основная сумма",
        "tabel-dobanda": "Процент",
        "tabel-comision": "Комиссия",
        "tabel-sold-ramas": "Остаток"
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
