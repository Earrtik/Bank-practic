document.querySelector("form")?.addEventListener("submit", e => {
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

// --- FUNCȚIE EROARE ---
function showError(selector, message) {
    const el = document.querySelector(selector);
    if (el) {
        el.textContent = message;
        el.style.display = "block";
        el.style.color = "red";
    }
}

// --- CURĂȚARE INPUTURI NUMERICE ---
[inputSuma, inputPerioada, inputAvans, inputSalariu, inputRambursareAnticipata].forEach(input => {
    if (!input) return;
    input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, '');
        updateOptions();
        updateMaxValues();
        calcCredit();
    });
});

// --- MAPARE LUNI ---
const luniMap = { "prima-luna": 1, "luna-3": 3, "luna-6": 6, "luna-9": 9, "luna-12": 12, "luna-24": 24 };

// --- FUNCTIE DE UPDATE OPTION ---
function updateOptions() {
    const perioada = parseInt(inputPerioada.value) || 0;
    [inputDurataGratie, inputduratamixta].forEach(select => {
        if (!select) return;
        select.querySelectorAll("option").forEach(opt => {
            const val = luniMap[opt.value];
            opt.disabled = val !== undefined && val >= perioada;
        });
    });
}

// --- SINCRONIZARE: Tip dobanda (sus) -> Initial mixta (jos) ---
function updateInitialMixta() {
    if (!inputinitialmixta) return;
    const top = inputTipDobanda?.value || "";
    const mixedOn = dobindamixtacheckbox?.checked;

    inputinitialmixta.querySelectorAll("option").forEach(opt => {
        if (!opt.value) return opt.disabled = false;
        if (!mixedOn) return opt.disabled = false;
        opt.disabled = (top === "fixa" && opt.value === "start-fixa") ||
                       (top === "variabila" && opt.value === "start-variabila");
    });

    if (inputinitialmixta.querySelector(`option[value="${inputinitialmixta.value}"]`)?.disabled)
        inputinitialmixta.value = "";
}
inputTipDobanda?.addEventListener("change", updateInitialMixta);
dobindamixtacheckbox?.addEventListener("change", updateInitialMixta);
updateInitialMixta();

// --- LIMITARE MAXIMA AVANS SI RAMBURSARE ---
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

// --- SHOW/HIDE CONDITIONAL ---
function setupConditional(checkbox, targetSelector) {
    checkbox.addEventListener("change", () => {
        const conditional = document.querySelector(`.conditional[data-target='${targetSelector}']`);
        if (conditional) conditional.style.display = checkbox.checked ? "block" : "none";
        updateMaxValues();
        calcCredit();
    });
}
setupConditional(checkboxRambursare, 'rambursare-checkbox');
setupConditional(dobindamixtacheckbox, 'dobinda-mixta-checkbox');
setupConditional(checkboxGratie, 'gratie-checkbox');

// --- GRAFIC ---
function createGrafic(principal, rataLunara, perioada, durataGratie = 0) {
    const ctx = document.querySelector(".grafic-rambursare").getContext("2d");
    if (window.myChart) window.myChart.destroy();

    const labels = [];
    const data = [];
    let sold = principal;

    for (let i = 1; i <= perioada; i++) {
        let principalRata = rataLunara - (principal * 0.01);
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
                tension: 0.2
            }]
        },
        options: { responsive: true }
    });
}

// --- TABEL AMORTIZARE ---
function createTabelAmortizare(principal, rataLunara, perioada, dobandaLunara, comision, durataGratie = 0) {
    const today = new Date();
    let html = `<table border="1" style="width:100%;border-collapse:collapse;">
        <tr>
            <th data-translate-tabel="Luna">Luna</th>
            <th data-translate-tabel="Data scadenta">Data scadenta</th>
            <th data-translate-tabel="Rata totala">Rata totala</th>
            <th data-translate-tabel="Principal">Principal</th>
            <th data-translate-tabel="Dobanda">Dobanda</th>
            <th data-translate-tabel="Comision">Comision</th>
            <th data-translate-tabel="Sold ramas">Sold ramas</th>
        </tr>`;
    
    let sold = principal;
    for (let i = 1; i <= perioada; i++) {
        let principalRata = rataLunara - dobandaLunara;
        let dobandaCurenta = dobandaLunara;
        if (i <= durataGratie) {
            principalRata = 0;
            dobandaCurenta = sold * 0.01;
        }
        const soldFinal = Math.max(sold - principalRata, 0);
        const dataScadenta = new Date(today.getFullYear(), today.getMonth() + i, today.getDate());
        html += `<tr>
                    <td>${i}</td>
                    <td>${dataScadenta.toLocaleDateString()}</td>
                    <td>${(principalRata + dobandaCurenta + comision).toFixed(2)}</td>
                    <td>${principalRata.toFixed(2)}</td>
                    <td>${dobandaCurenta.toFixed(2)}</td>
                    <td>${comision.toFixed(2)}</td>
                    <td>${soldFinal.toFixed(2)}</td>
                </tr>`;
        sold = soldFinal;
    }

    html += "</table>";
    tabelAmortizareDiv.innerHTML = html;
    tabelAmortizareDiv.style.display = "block";
}

// --- FUNCTIE CALCUL CREDIT ---
function calcCredit() {
    const suma = parseFloat(inputSuma.value) || 0;
    const perioada = parseInt(inputPerioada.value) || 0;
    const avans = parseFloat(inputAvans.value) || 0;
    const salariu = parseFloat(inputSalariu.value) || 0;
    let principal = suma - avans;
    let valid = true;

    document.querySelectorAll(".error").forEach(el => el.style.display = "none");

    if (!inputTipCredit.value) { showError(".error-tip-credit", "Selecteaza tipul de credit"); valid = false; }
    if (!inputTipDobanda.value) { showError(".error-tip-dobanda", "Selecteaza tipul de dobinda"); valid = false; }
    if (suma < 200 || suma > 100000000) { showError(".error-suma", "Selecteaza suma intre 200 si 100.000.000"); valid = false; }
    if (perioada < 2 || perioada > 360) { showError(".error-perioada", "Selectati perioada intre 2-360 luni"); valid = false; }
    if (!inputTipRata.value) { showError(".error-tip-rata", "Selecteaza tipul de rata"); valid = false; }
    if (salariu === 0) { showError(".error-salariu", "Introduce Salariu"); valid = false; }

    if (avans > suma - 100) { showError(".error-avans", `Introduce suma AA`); valid = false; }
    if (inputTipCredit.value === "ipotecar" && avans < suma * 0.1) { showError(".error-avans", "Avans minim 10% pentru credit ipotecar"); valid = false; }

    // --- Rambursare anticipata ---
    if (checkboxRambursare.checked) {
        if (!inputRambursareAnticipata.value || parseFloat(inputRambursareAnticipata.value) <= 0) {
            showError(".error-suma-rambursare", "Introduceți suma pentru rambursare anticipată");
            valid = false;
        }
        if (!selectOptiuneRambursare.value) {
            showError(".error-optiune-rambursare", "Selectați o opțiune de rambursare anticipată");
            valid = false;
        }
    }

    // --- Dobinda mixta ---
    if (dobindamixtacheckbox.checked) {
        if (!inputinitialmixta.value) { showError(".error-initial-mixta", "Selectați tipul inițial de dobândă"); valid = false; }
        if (!inputDurataGratieMixta.value) { showError(".error-durata-gratie-mixta", "Selectați durata perioadei de grație"); valid = false; }
    }

    // --- Perioada de gratie optional ---
    if (checkboxGratie.checked && !inputDurataGratie.value) {
        showError(".error-durata-gratie", "Selectați durata perioadei de grație");
        valid = false;
    }

    if (!valid) return;

    // --- perioada gratie ---
    let durataGratie = 0;
    if (dobindamixtacheckbox.checked && inputDurataGratieMixta.value && luniMap[inputDurataGratieMixta.value] !== undefined) {
        durataGratie = luniMap[inputDurataGratieMixta.value];
    } else if (checkboxGratie.checked && inputDurataGratie.value && luniMap[inputDurataGratie.value] !== undefined) {
        durataGratie = luniMap[inputDurataGratie.value];
    }

    // --- Calcul rata ajustata pentru perioada de grație ---
    const perioadaEfectiva = perioada - durataGratie;
    if (perioadaEfectiva <= 0) {
        showError(".error-perioada", "Perioada de gratie nu poate fi mai lunga sau egala cu perioada creditului");
        return;
    }

    const r = inputTipDobanda.value === "fixa" ? 0.12/12 : 0.015;
    const rataLunara = principal * r / (1 - Math.pow(1 + r, -perioadaEfectiva));

    // --- Verificare grad de indatorare ---
   const gradMax = salariu < 35000 ? 0.4 : 0.55;
    const rataMaxPermisa = (salariu * gradMax).toFixed(2); 
    const salariuRecomandat = (rataLunara / gradMax).toFixed(2); 
    
    
    if (rataLunara > rataMaxPermisa) {
        showError(".error-salariu", 
            `Grad de îndatorare depășit ,salariu recomandat: ${salariuRecomandat} `
        );
        return;
    }

    const dobandaLunara = principal * 0.01;
    const comision = 40;
    const rataTotala = rataLunara * perioada;
    const comisieRataTotala = rataTotala + comision * perioada;
    const DAE = ((Math.pow(1 + dobandaLunara / principal, 12) - 1) * 100).toFixed(2);

    // --- Afisare rezultate ---
    rezultInner.innerHTML = `
        <p>Rata lunara: <b>${rataLunara.toFixed(2)} LEI</b></p>
        <p>Rata totala: <b>${rataTotala.toFixed(2)} LEI</b></p>
        <p>Dobanda lunara: <b>${dobandaLunara.toFixed(2)} LEI</b></p>
        <p>Comision: <b>${comision.toFixed(2)} LEI</b></p>
        <p>DAE: <b>${DAE} %</b></p>
        <p>Comisie si rata totala: <b>${comisieRataTotala.toFixed(2)} LEI</b></p>
    `;
    [rezultDiv, rezultInner, grafDiv].forEach(el => el.style.display = "block");

    createGrafic(principal, rataLunara, perioada, durataGratie);
    createTabelAmortizare(principal, rataLunara, perioada, dobandaLunara, comision, durataGratie);
}

// --- RECALCULARE LA SCHIMBAREA INPUTURILOR ---
[inputTipRata, inputTipDobanda, inputSuma, inputAvans, inputPerioada, inputRambursareAnticipata, inputDurataGratie, inputDurataGratieMixta].forEach(input => {
    if (!input) return;
    input.addEventListener("change", () => {
        updateMaxValues();
        calcCredit();
    });
});


// --- INIT ---
updateOptions();
updateMaxValues();
