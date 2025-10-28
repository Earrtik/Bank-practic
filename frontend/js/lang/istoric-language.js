const translations = {
    ro: {
        "home": "Acasă",
        "calculator_credit": "Calculator Credite",
        "informatii": "Informații",
        "login": "Login",
        "register": "Register",
        "logo": "Diny Bank",
        "favorite": "Favorite",
        "istoric": "Istoric",
        "login_required": "Intră în cont pentru a vedea istoricul simulărilor tale",
        "intra_cont": "Intră în cont",
        "sterge_tot": "Șterge toată istoria",
        "istoric_title": "Istoric Credite",
        "istoric_num": "Istoric",
        "tip_credit": "Tip Credit",
        "data_ora": "Data/Ora",
        "suma": "Suma",
        "perioada": "Perioada",
        "tip_rata": "Tip rată",
        "perioada_gratie": "Perioada de gratie",
        "tip_dobanda": "Tip dobândă",
        "dobanda_mixta": "Dobândă mixtă",
        "avans": "Avans",
        "salariu": "Salariu lunar",
        "optiune_rambursare": "Rambursare anticipată",
        "creaza_link": "Crează link",
        "sterge": "Șterge",
        "no_simulari": "Nu există simulări în istoric",
        "mergi_credit": "Mergi la Credite"
    },
    en: {
        "home": "Home",
        "calculator_credit": "Credit Calculator",
        "informatii": "Information",
        "login": "Login",
        "register": "Register",
        "logo": "Diny Bank",
        "favorite": "Favorites",
        "istoric": "History",
        "login_required": "Login to see your simulation history",
        "intra_cont": "Login",
        "sterge_tot": "Clear All History",
        "istoric_title": "Credit History",
        "istoric_num": "History",
        "tip_credit": "Credit Type",
        "data_ora": "Date/Time",
        "suma": "Amount",
        "perioada": "Period",
        "tip_rata": "Installment Type",
        "perioada_gratie": "Grace Period",
        "tip_dobanda": "Interest Type",
        "dobanda_mixta": "Mixed Interest",
        "avans": "Down Payment",
        "salariu": "Monthly Salary",
        "optiune_rambursare": "Early Repayment",
        "creaza_link": "Create Link",
        "sterge": "Delete",
        "no_simulari": "No simulations in history",
        "mergi_credit": "Go to Credits"
    },
    ru: {
        "home": "Главная",
        "calculator_credit": "Калькулятор Кредитов",
        "informatii": "Информация",
        "login": "Вход",
        "register": "Регистрация",
        "logo": "Diny Bank",
        "favorite": "Избранное",
        "istoric": "История",
        "login_required": "Войдите в аккаунт, чтобы видеть историю симуляций",
        "intra_cont": "Войти",
        "sterge_tot": "Очистить всю историю",
        "istoric_title": "История кредитов",
        "istoric_num": "История",
        "tip_credit": "Тип кредита",
        "data_ora": "Дата/Время",
        "suma": "Сумма",
        "perioada": "Срок",
        "tip_rata": "Тип платежа",
        "perioada_gratie": "Период льготы",
        "tip_dobanda": "Тип процента",
        "dobanda_mixta": "Смешанная процентная ставка",
        "avans": "Аванс",
        "salariu": "Ежемесячная зарплата",
        "optiune_rambursare": "Досрочное погашение",
        "creaza_link": "Создать ссылку",
        "sterge": "Удалить",
        "no_simulari": "Нет симуляций в истории",
        "mergi_credit": "Перейти к кредитам"
    }
};

function translatePage(lang) {
    document.querySelectorAll("[data-lang]").forEach(el => {
        const key = el.getAttribute("data-lang");
        if(translations[lang] && translations[lang][key]){
            el.textContent = translations[lang][key];
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("lang");
    const savedLang = localStorage.getItem("language") || "ro";
    if (langSelect) langSelect.value = savedLang;
    translatePage(savedLang);

    langSelect?.addEventListener("change", () => {
        const lang = langSelect.value;
        localStorage.setItem("language", lang);
        translatePage(lang);
    });
});
