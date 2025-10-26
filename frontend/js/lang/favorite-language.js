document.addEventListener("DOMContentLoaded", () => {

  // --- traduceri  ---
  const translations = {
    ro: {
      acasa: "Acasă",
      calculator_credit: "Calculator Credite",
      informatii: "Informații",
      favorite: "Favorite",
      favorite_num: "Favorite",
      sterge_toate: "Șterge toate favoritele",
      creaza_link: "Creează link",
      sterge: "Șterge",
      tip_credit: "Tip credit",
      tip_rata: "Tip rată",
      perioada: "Perioada",
      perioada_gratie: "Perioadă de grație",
      tip_dobanda: "Tip dobândă",
      dobanda_mixta: "Dobândă mixtă",
      optiune_rambursare: "Rambursare anticipată",
      luni: "luni",
      copyright: "Diny Bank | © Toate drepturile rezervate."
    },
    en: {
      acasa: "Home",
      calculator_credit: "Credit Calculator",
      informatii: "Information",
      favorite: "Favorites",
      favorite_num: "Favorite",
      sterge_toate: "Delete all favorites",
      creaza_link: "Create link",
      sterge: "Delete",
      tip_credit: "Credit Type",
      tip_rata: "Rate Type",
      perioada: "Period",
      perioada_gratie: "Grace Period",
      tip_dobanda: "Interest Type",
      dobanda_mixta: "Mixed Interest",
      optiune_rambursare: "Early Repayment",
      luni: "months",
      copyright: "Diny Bank | © All rights reserved."
    },
    ru: {
      acasa: "Главная",
      calculator_credit: "Калькулятор кредитов",
      informatii: "Информация",
      favorite: "Избранное",
      favorite_num: "Избранное",
      sterge_toate: "Удалить все избранное",
      creaza_link: "Создать ссылку",
      sterge: "Удалить",
      tip_credit: "Тип кредита",
      tip_rata: "Тип ставки",
      perioada: "Период",
      perioada_gratie: "Льготный период",
      tip_dobanda: "Тип процента",
      dobanda_mixta: "Смешанная ставка",
      optiune_rambursare: "Досрочное погашение",
      luni: "месяцев",
      copyright: "Diny Bank | © Все права защищены."
    }
  };

  // --- traduceri pentru valori din DB ---
  const dbTranslations = {
    tip_credit: {
      ro: { ipotecar: "ipotecar" },
      en: { ipotecar: "mortgage" },
      ru: { ipotecar: "ипотечный" }
    },
    tip_rata: {
      ro: { contant: "contant", descrescatoare: "descrescătoare" },
      en: { contant: "flat", descrescatoare: "decreasing" },
      ru: { contant: "фиксированная", descrescatoare: "убывающая" }
    },
    perioada_gratie: {
      ro: { "luna-3": "luna-3" },
      en: { "luna-3": "month-3" },
      ru: { "luna-3": "месяц-3" }
    },
    tip_dobanda: {
      ro: { variabila: "variabilă" },
      en: { variabila: "variable" },
      ru: { variabila: "переменная" }
    },
    dobanda_mixta: {
      ro: { "start-fixa": "start-fixa" },
      en: { "start-fixa": "start-fixed" },
      ru: { "start-fixa": "старт фикс" }
    },
    optiune_rambursare: {
      ro: { NU: "NU" },
      en: { NU: "NO" },
      ru: { NU: "НЕТ" }
    }
  };

  // --- funcție traducere  ---
  function translatePage(lang) {
    // texte fixe
    document.querySelectorAll("[data-lang]").forEach(el => {
      const key = el.getAttribute("data-lang");
      if (translations[lang][key]) el.textContent = translations[lang][key];
    });

    // valori DB
    document.querySelectorAll(".val").forEach(el => {
      const field = el.getAttribute("data-field");
      const original = el.getAttribute("data-original") || el.textContent.trim();
      el.setAttribute("data-original", original);
      const translated = dbTranslations[field]?.[lang]?.[original];
      if (translated) el.textContent = translated;
    });

  
    document.querySelectorAll(".perioada-text").forEach(el => {
      const original = el.getAttribute("data-original") || el.textContent.trim();
      const match = original.match(/(\d+)\s*luni/i);
      if (match) {
        el.textContent = `${translations[lang].perioada}: ${match[1]} ${translations[lang].luni}`;
      }
    });
  }

  // --- schimbare limbă ---
  const langSelect = document.getElementById("lang");
  translatePage(langSelect.value);

  langSelect.addEventListener("change", e => {
    translatePage(e.target.value);
  });
});
