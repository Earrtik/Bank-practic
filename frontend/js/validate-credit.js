const form = document.querySelector("form");
form.addEventListener("submit", e => {
    e.preventDefault();
    calcCredit();
});

// --- INPUTURI PRINCIPALE ---
const inputTipCredit = document.querySelector(".input-tip-credit");
const inputSuma = document.querySelector(".input-suma");
const inputPerioada = document.querySelector(".input-perioada");
const inputTipRata = document.querySelector(".input-tip-rata");
const inputTipDobanda = document.querySelector(".input-tip-dobanda");
const inputAvans = document.querySelector(".input-avans");
const inputSalariu = document.querySelector(".input-salariu");

// --- PERIOADA DE GRATIE OPTIONAL ---
const checkboxGratie = document.querySelector("#gratie-checkbox");
const inputDurataGratie = document.querySelector(".input-durata-gratie");

// --- Rambursare anticipata ---
const checkboxRambursare = document.querySelector("#rambursare-checkbox");
const inputRambursareAnticipata = document.querySelector(".input-suma-rambursare");
const selectOptiuneRambursare = document.querySelector(".input-optiune-rambursare");

// --- DOBINDA MIXTA ---
const dobindamixtacheckbox = document.querySelector("#dobinda-mixta-checkbox");
const inputinitialmixta = document.querySelector(".input-initial-mixta");
const inputDurataGratieMixta = document.querySelector(".input-durata-gratie-mixta");
const inputduratamixta = document.querySelector(".input-durata-mixta");

// --- ZONE DE AFISARE ---
const rezultDiv = document.querySelector(".content-rezult");
const rezultInner = document.querySelector(".rezult");
const grafDiv = document.querySelector(".content-grafic");
const tabelAmortizareDiv = document.querySelector(".tabel-amortizare");
[rezultDiv, rezultInner, grafDiv, tabelAmortizareDiv].forEach(el => el.style.display = "none");
const allIconsDiv = document.querySelector(".all-icons");

// --- FUNCTIE EROARE ---
function showError(selector, message) {
    const el = document.querySelector(selector);
    if (el) {
        el.textContent = message;
        el.style.display = "block";
        el.style.opacity = 0;
        el.style.color = "red";
        el.style.transition = "opacity 0.3s ease";
        setTimeout(() => el.style.opacity = 1, 10);
    }
}
// --- ASCUNDERE AUTOMATA EROARE + UPDATE OPTIONURI ---
// fără a apela calcCredit(), doar ascunde erorile și actualizează selecturile
[inputTipCredit, inputTipDobanda, inputTipRata, inputSuma, inputPerioada, inputAvans, inputSalariu, inputDurataGratie, inputDurataGratieMixta, inputduratamixta].forEach(el => {
    if (!el) return;
    ["input", "change"].forEach(evt => {
        el.addEventListener(evt, () => {
            const errorEl = el.closest("form")?.querySelector(`.error-${el.className.split(" ").join("-")}`);
            if (errorEl) errorEl.style.display = "none";

            // update options doar dacă este un select care depinde de perioada
            if (el === inputPerioada || el === inputDurataGratie || el === inputduratamixta) {
                updateOptions();
            }
        });
    });
});


// --- MAPARE LUNI ---
const luniMap = { "prima-luna": 1, "luna-3": 3, "luna-6": 6, "luna-9": 9, "luna-12": 12, "luna-24": 24 };

// --- UPDATE OPTION PERIOADA DE GRATIE ---
function updateOptions() {
    const perioada = parseInt(inputPerioada.value) || 0;
    [inputDurataGratie, inputduratamixta].forEach(select => {
        if (!select) return;
        select.querySelectorAll("option").forEach(opt => {
            const val = luniMap[opt.value];
            // doar valorile < perioada sunt active
            opt.disabled = val !== undefined && val >= perioada;
        });
    });
}
// --- CLICK PE BUTONUL "CALCULEAZA" ---
document.querySelector(".btn-calcul")?.addEventListener("click", e => {
    e.preventDefault();
    document.querySelectorAll(".error").forEach(el => el.style.display = "none");
    calcCredit(); // se executa calculul complet + afișare + salvare
});

// --- INITIAL DOBINDA MIXTA ---
function updateInitialMixta() {
    if (!inputinitialmixta) return;
    const mixedOn = dobindamixtacheckbox?.checked;
    inputinitialmixta.querySelectorAll("option").forEach(opt => {
        if (!opt.value) return opt.disabled = false;
        if (!mixedOn) return opt.disabled = false;
    });
    if (inputinitialmixta.querySelector(`option[value="${inputinitialmixta.value}"]`)?.disabled)
        inputinitialmixta.value = "";
}
dobindamixtacheckbox?.addEventListener("change", updateInitialMixta);
updateInitialMixta();

// --- UPDATE MAX VALUES ---
function updateMaxValues() {
    const suma = parseFloat(inputSuma.value) || 0;
    const avans = parseFloat(inputAvans.value) || 0;
    const maxDif = 100;
    const maxAvans = Math.max(suma - maxDif, 0);
    const maxRambursare = Math.max(suma - avans - maxDif, 0);
    if (avans > maxAvans) inputAvans.value = maxAvans.toFixed(0);
    if (checkboxRambursare.checked && inputRambursareAnticipata) {
        if (parseFloat(inputRambursareAnticipata.value) > maxRambursare) {
            inputRambursareAnticipata.value = maxRambursare.toFixed(0);
        }
        inputRambursareAnticipata.max = maxRambursare;
    }
}

// --- CONDITIONAL ---
function setupConditional(checkbox, targetSelector) {
    checkbox.addEventListener("change", () => {
        const conditional = document.querySelector(`.conditional[data-target='${targetSelector}']`);
        if (conditional) conditional.style.display = checkbox.checked ? "block" : "none";
        updateMaxValues();
    });
}
setupConditional(checkboxRambursare, 'rambursare-checkbox');
setupConditional(dobindamixtacheckbox, 'dobinda-mixta-checkbox');
setupConditional(checkboxGratie, 'gratie-checkbox');

// --- GRAFIC ---
function createGrafic(principal, rataLunara, perioada, durataGratie = 0, tipDobanda = "fixa", tipRata = "anuitate") {
    const ctx = document.querySelector(".grafic-rambursare").getContext("2d");
    if (window.myChart) window.myChart.destroy();
    const labels = [];
    const data = [];
    let sold = principal;
    for (let i = 1; i <= perioada; i++) {
        let dobandaCurenta = tipDobanda === "fixa" ? principal * 0.12/12 : sold * 0.015;
        let principalRata = tipRata === "contant" ? rataLunara - dobandaCurenta : principal / perioada;
        if (i <= durataGratie) principalRata = 0;
        sold = Math.max(sold - principalRata, 0);
        labels.push("Luna " + i);
        data.push(sold);
    }
    window.myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Sold restant",
                data,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
                tension: 0.3
            }]
        },
        options: { responsive: true }
    });
}
function updateInitialMixtaOptions() {
    if (!dobindamixtacheckbox || !inputinitialmixta || !inputTipDobanda) return;

    const tipPrincipal = inputTipDobanda.value; // fixa sau variabila
    inputinitialmixta.querySelectorAll("option").forEach(opt => {
        if (!opt.value) return;     
        
        if (tipPrincipal === "fixa") {
            
            opt.disabled = opt.value === "start-fixa";
        } else if (tipPrincipal === "variabila") {
            
            opt.disabled = opt.value === "start-variabila";
        } else {
            opt.disabled = false;   
        }
    });

    // Resetăm valoarea dacă e invalidă
    if (inputinitialmixta.querySelector(`option[value="${inputinitialmixta.value}"]`)?.disabled) {
        inputinitialmixta.value = "";
    }
}

// Evenimente
inputTipDobanda.addEventListener("change", updateInitialMixtaOptions);
dobindamixtacheckbox.addEventListener("change", updateInitialMixtaOptions);

// Init
updateInitialMixtaOptions();

/// --- TABEL AMORTIZARE ---
function createTabelAmortizare(principal, rataLunara, perioada, comision, durataGratie = 0, tipDobanda = "fixa", tipRata = "anuitate") {
    const today = new Date();
    let html = `<table border="1" style="width:100%;border-collapse:collapse;">
        <tr>
            <th data-translate="Luna">Luna</th>
            <th data-translate="Data scadenta">Data scadenta</th>
            <th data-translate="Rata totala">Rata totala</th>
            <th data-translate="Principal">Principal</th>
            <th data-translate="Dobanda lunara">Dobanda</th>
            <th data-translate="Comision">Comision</th>
            <th data-translate="Sold ramas">Sold ramas</th>
        </tr>`;

    let sold = principal;
    const perioadaEfectiva = perioada - durataGratie;
    const rataDupaGratie = perioadaEfectiva > 0 ? principal / perioadaEfectiva : 0;

    for (let i = 1; i <= perioada; i++) {
        let dobandaCurenta = tipDobanda === "fixa" ? principal * 0.12 / 12 : sold * 0.015;
        let principalRata = 0;

        if (i <= durataGratie) {
            principalRata = 0; // perioada de gratie
        } else {
            principalRata = tipRata === "contant" ? rataDupaGratie : principal / perioadaEfectiva;
        }

        const soldFinal = Math.max(sold - principalRata, 0);
        const dataScadenta = new Date(today.getFullYear(), today.getMonth() + i, today.getDate());
        html += `<tr>
                    <td>${i}</td>
                    <td>${dataScadenta.toLocaleDateString()}</td>
                    <td style="background:#e6f7ff;">${(principalRata + dobandaCurenta + comision).toFixed(2)}</td>
                    <td style="background:#d9f2d9;">${principalRata.toFixed(2)}</td>
                    <td style="background:#fff2cc;">${dobandaCurenta.toFixed(2)}</td>
                    <td>${comision.toFixed(2)}</td>
                    <td style="background:#f2d9d9;">${soldFinal.toFixed(2)}</td>
                </tr>`;
        sold = soldFinal;
    }

    html += "</table>";
    tabelAmortizareDiv.innerHTML = html;
    tabelAmortizareDiv.style.display = "block";

    // Traducem tabelul imediat după creare
    translatePage(localStorage.getItem("language") || "ro");
}
// --- Recalculare grafic si tabel cu dobanda mixta ---
function recalcGraficTabel(principal, rataLunara, perioada, comision, durataGratie, tipDobanda, tipRata, dobandamixta, luniMixta, dobandaInitiala) {
    // Grafic
    createGrafic(principal, rataLunara, perioada, durataGratie, tipDobanda, dobandamixta, luniMixta, dobandaInitiala);

    // Tabel
    createTabelAmortizare(principal, rataLunara, perioada, comision, durataGratie, tipDobanda, tipRata, dobandamixta, luniMixta, dobandaInitiala);
}

    
const dobandamixta = dobindamixtacheckbox.checked;
const luniMixta = dobandamixta ? (luniMap[inputduratamixta.value] || 0) : 0;

// Recalculăm grafic și tabel
recalcGraficTabel(principal, rataLunara, perioada, comision, durataGratie, tipDobanda, tipRata, dobandamixta, luniMixta, dobandaInitiala);



// --- CALCUL CREDIT ---
async function calcCredit() {
    
    updateOptions(); // actualizare optiuni perioada de gratie

    const suma = parseFloat(inputSuma.value) || 0;
    const perioada = parseInt(inputPerioada.value) || 0;
    const avans = parseFloat(inputAvans.value) || 0;
    const salariu = parseFloat(inputSalariu.value) || 0;
    const principal = suma - avans;
    let valid = true;

    // Ascunde toate erorile
    document.querySelectorAll(".error").forEach(el => el.style.display = "none");

    if (!inputTipCredit.value) { showError(".error-tip-credit", "Selecteaza tipul de credit"); valid = false; }
    if (!inputTipDobanda.value) { showError(".error-tip-dobanda", "Selecteaza tipul de dobinda"); valid = false; }
    if (suma < 200 || suma > 100000000) { showError(".error-suma", "Selecteaza suma intre 200 si 100.000.000"); valid = false; }
    if (perioada < 2 || perioada > 360) { showError(".error-perioada", "Selectati perioada intre 2-360 luni"); valid = false; }
    if (!inputTipRata.value) { showError(".error-tip-rata", "Selecteaza tipul de rata"); valid = false; }
    if (salariu === 0) { showError(".error-salariu", "Introduce Salariu"); valid = false; }

if (!valid) return;

    // --- durata de gratie
    let durataGratie = 0;
    if (dobindamixtacheckbox.checked && inputduratamixta.value && luniMap[inputduratamixta.value] !== undefined) {
        durataGratie = luniMap[inputduratamixta.value];
    } else if (checkboxGratie.checked && inputDurataGratie.value && luniMap[inputDurataGratie.value] !== undefined) {
        durataGratie = luniMap[inputDurataGratie.value];
    }

    const tipRata = inputTipRata.value;
    const tipDobanda = inputTipDobanda.value;

    // dobanda lunara
    let dobandaLunara = "fixa" ? principal * 0.12 / 12 : principal * 0.015;

    // calcul rata lunara efectiva dupa perioada de gratie
    const perioadaEfectiva = perioada - durataGratie;
    let rataLunara = 0;
    if (perioadaEfectiva > 0) {
    if (tipRata === "contant") {
        const r = 0.01; // ex. rata fixa lunara pentru calcul rata (fără dobanda)
        rataLunara = principal * r / (1 - Math.pow(1 + r, -perioadaEfectiva));
    } else if (tipRata === "descrescatoare") {
        rataLunara = principal / perioadaEfectiva; // doar principal
    }
}

    const comision = 40;
    const rataTotala = rataLunara * perioadaEfectiva;
    const comisieRataTotala = rataTotala + comision * perioada;
    const DAE = ((Math.pow(1 + dobandaLunara / principal, 12) - 1) * 100).toFixed(2);

    // verificare grad de indatorare
    let gradMax = salariu <= 35000 ? 40 : 55;
    const gradIndatorare = (rataLunara / salariu) * 100;
    if (gradIndatorare > gradMax) {
        const salariuRecomandat = (rataLunara / (gradMax / 100)).toFixed(0);
        showError(".error-salariu", `Grad de îndatorare depășit, salariu recomandat: ${salariuRecomandat} LEI`);
        return;
    }

    // Afisare rezultate
    rezultInner.innerHTML = `
    <p><span data-translate="Rata lunara">Rata lunara:</span> <b>${rataLunara.toFixed(2)} LEI</b></p>
    <p><span data-translate="Rata totala">Rata totala:</span> <b>${rataTotala.toFixed(2)} LEI</b></p>
    <p><span data-translate="Dobanda lunara">Dobanda lunara:</span> <b>${dobandaLunara.toFixed(2)} LEI</b></p>
    <p><span data-translate="Dobanda totala">Dobanda totala:</span> <b>${(dobandaLunara * perioada).toFixed(2)} LEI</b></p>
    <p><span data-translate="Comision">Comision:</span> <b>${comision.toFixed(2)} LEI</b></p>
    <p><span data-translate="DAE">DAE:</span> <b>${DAE} %</b></p>
    <p><span data-translate="Comisie si rata totala">Comisie si rata totala:</span> <b>${comisieRataTotala.toFixed(2)} LEI</b></p>
`;


    [rezultDiv, rezultInner, grafDiv].forEach(el => el.style.display = "block");

    createGrafic(principal, rataLunara, perioada, durataGratie, tipDobanda, tipRata);
    createTabelAmortizare(principal, rataLunara, perioada, comision, durataGratie, tipDobanda, tipRata);

    if (allIconsDiv) allIconsDiv.style.display = "flex"; 
 // DATE PENTRU SALVARE
   const dataSimulare = {
    tip_credit: inputTipCredit.value,
    suma,
    perioada,
    tip_rata: tipRata,
    perioada_gratie: durataGratie,
    tip_dobanda: tipDobanda,
   
    dobanda_mixta: dobindamixtacheckbox.checked
    ? (inputinitialmixta.value === "fixa"
        ? "Inițial dobândă fixă"
        : "Inițial dobândă variabilă")
    : "NU",

    perioada_gratie_mixta: dobindamixtacheckbox.checked
        ? (luniMap[inputduratamixta.value] || 0)
        : 0,
    avans,
    salariu,
    rata_lunara: rataLunara,
    rata_totala: rataTotala,
    
    suma_rambursare: checkboxRambursare.checked
        ? parseFloat(inputRambursareAnticipata.value) || 0
        : 0,
    optiune_rambursare: checkboxRambursare.checked
        ? (selectOptiuneRambursare.value || "NU")
        : "NU"
        
        
    };
    
    
    // SALVARE AUTOMATA IN BAZA DE DATE
    try {
        const response = await fetch("../../backend/php/save_simulare.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataSimulare)
        });
        const result = await response.json();
        console.log("Salvare simulare:", result);
    } catch (err) {
        console.error("Eroare salvare simulare:", err);
    }
   
}

// EVENIMENT SUBMIT FORM


document.querySelector("form")?.addEventListener("submit", e => {
    e.preventDefault();
    calcCredit();
});

// INIT
updateMaxValues();
