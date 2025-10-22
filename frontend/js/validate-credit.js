document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    const inputTipCredit = document.querySelector(".input-tip-credit");
    const inputSuma = document.querySelector(".input-suma");
    const inputPerioada = document.querySelector(".input-perioada");
    const inputTipRata = document.querySelector(".input-tip-rata");
    const inputDurataGratie = document.querySelector(".input-durata-gratie"); // dropdown perioadă grație
    const inputTipDobanda = document.querySelector(".input-tip-dobanda");
    const inputInitialMixta = document.querySelector(".input-initial-mixta");
    const inputDurataGratieMixta = document.querySelector(".input-durata-gratie-mixta");
    const inputAvans = document.querySelector(".input-avans");
    const inputSalariu = document.querySelector(".input-salariu");
    const inputSumaRamb = document.querySelector(".input-suma-rambursare");
    const inputOptiuneRamb = document.querySelector(".input-optiune-rambursare");

    const rezultDiv = document.querySelector(".content-rezult");
    const rezultInner = document.querySelector(".rezult");
    const grafDiv = document.querySelector(".content-grafic");
    const allIcons = document.querySelector(".all-icons");
    const tabelAmortizareDiv = document.querySelector(".tabel-amortizare");

    // --- ASCUNDERE ELEMENTE LA START ---
    [rezultDiv, rezultInner, grafDiv, allIcons, tabelAmortizareDiv].forEach(el => el.style.display = "none");

    let ultimaSimulare = null;

    // --- FUNCȚIE DE AFIȘARE ERORI ---
    function showError(selector, message) {
        const el = document.querySelector(selector);
        el.textContent = message;
        el.style.display = "block";
        el.style.color = "red";
    }

    // --- PERMITEM DOAR CIFRE ÎN INPUT-URI NUMERICE ---
    [inputSuma, inputPerioada, inputAvans, inputSalariu, inputSumaRamb].forEach(input => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/\D/g,'');
            updateGratieOptions();
            updateGratieOptionsMixta();
        });
    });

    // --- BLOCAREA OPTION-URILOR PENTRU GRATIE NORMALA ---
    function updateGratieOptions() {
        const perioada = parseInt(inputPerioada.value) || 0;
        if (!inputDurataGratie) return;

        const luniMap = {
            "prima-luna": 1,
            "luna-3": 3,
            "luna-6": 6,
            "luna-9": 9,
            "luna-12": 12
        };

        inputDurataGratie.querySelectorAll("option").forEach(opt => {
            const val = luniMap[opt.value];
            opt.disabled = val !== undefined && val >= perioada;
        });
    }

    // --- BLOCAREA OPTION-URILOR PENTRU GRATIE MIXTA ---
    function updateGratieOptionsMixta() {
        const perioada = parseInt(inputPerioada.value) || 0;
        if (!inputDurataGratieMixta) return;

        const luniMap = {
            "prima-luna": 1,
            "luna-3": 3,
            "luna-6": 6,
            "luna-9": 9,
            "luna-12": 12
        };

        inputDurataGratieMixta.querySelectorAll("option").forEach(opt => {
            const val = luniMap[opt.value];
            opt.disabled = val !== undefined && val >= perioada;
        });
    }

    // --- APEL LA SCHIMBAREA PERIOADEI ---
    inputPerioada.addEventListener("input", () => {
        updateGratieOptions();
        updateGratieOptionsMixta();
    });

    // --- APEL INITIAL ---
    updateGratieOptions();
    updateGratieOptionsMixta();

    // --- CREAREA GRAFICULUI ---
    function createGrafic(principal, rataLunara, perioada) {
        const ctx = document.querySelector(".grafic-rambursare").getContext("2d");
        if(window.myChart) window.myChart.destroy();

        const labels = [], data = [];
        let sold = principal;

        for(let i=1; i<=perioada; i++){
            sold -= rataLunara;
            labels.push("Luna " + i);
            data.push(Math.max(sold, 0));
        }

        window.myChart = new Chart(ctx, {
            type: 'line',
            data: { 
                labels, 
                datasets:[{
                    label:'Sold restant', 
                    data, 
                    borderColor:'rgba(75,192,192,1)', 
                    backgroundColor:'rgba(75,192,192,0.2)', 
                    fill:true, 
                    tension:0.2
                }]
            },
            options: { responsive:true }
        });
    }

    // --- CREAREA TABELULUI DE AMORTIZARE ---
    function createTabelAmortizare(principal, rataLunara, perioada, dobandaLunara, comision) {
        const today = new Date();
        let html = `<table border="1" style="width:100%;border-collapse:collapse;">
            <tr><th>Luna</th><th>Data scadenta</th><th>Rata totala</th><th>Principal</th><th>Dobanda</th><th>Comision</th><th>Sold ramas</th></tr>`;
        let sold = principal;

        for(let i=1;i<=perioada;i++){
            const dobLunara = dobandaLunara;
            const principalRata = rataLunara - dobLunara;
            const soldFinal = Math.max(sold - principalRata,0);
            const dataScadenta = new Date(today.getFullYear(), today.getMonth()+i, today.getDate());

            html += `<tr>
                <td>${i}</td>
                <td>${dataScadenta.toLocaleDateString()}</td>
                <td>${rataLunara.toFixed(2)}</td>
                <td>${principalRata.toFixed(2)}</td>
                <td>${dobLunara.toFixed(2)}</td>
                <td>${comision.toFixed(2)}</td>
                <td>${soldFinal.toFixed(2)}</td>
            </tr>`;

            sold = soldFinal;
        }

        html += `</table>`;
        tabelAmortizareDiv.innerHTML = html;
        tabelAmortizareDiv.style.display = "block";
    }

    // --- VERIFICARE DACA SIMULAREA S-A SCHIMBAT ---
    function isSimulareDifferent(simulareCurenta) {
        if(!ultimaSimulare) return true;
        for(const key in simulareCurenta){
            if(simulareCurenta[key] != ultimaSimulare[key]) return true;
        }
        return false;
    }

    // --- SALVARE SIMULARE ---
    function saveSimulare(tip_credit, suma, perioada, tip_rata, avans, salariu, rataLunara, rataTotala){
        const simulareCurenta = {
            tip_credit, suma, perioada, tip_rata, avans, salariu, rataLunara, rataTotala,
            perioada_gratie: inputDurataGratie.value || '',
            tip_dobanda: inputTipDobanda.value || '',
            dobanda_mixta: inputInitialMixta.value || '',
            perioada_gratie_mixta: inputDurataGratieMixta.value || '',
            suma_rambursare: inputSumaRamb.value || '',
            optiune_rambursare: inputOptiuneRamb.value || ''
        };

        if(!isSimulareDifferent(simulareCurenta)) return;
        ultimaSimulare = simulareCurenta;

        const formData = new FormData();
        for(const key in simulareCurenta){
            formData.append(key, simulareCurenta[key]);
        }

        fetch('../../backend/php/save_simulare.php', {
            method: 'POST',
            body: formData
        });
    }

    // --- SUBMIT FORMULAR ---
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let valid = true;

        document.querySelectorAll(".error").forEach(el => el.style.display = "none");

        const suma = parseFloat(inputSuma.value) || 0;
        const perioada = parseInt(inputPerioada.value) || 0;
        const avans = parseFloat(inputAvans.value) || 0;
        const salariu = parseFloat(inputSalariu.value) || 0;
        const sumaRamb = parseFloat(inputSumaRamb.value) || 0;

        if(inputTipCredit.value === ""){ showError(".error-tip-credit", "Trebuie să selectați tipul de credit."); valid=false; }
        if(inputTipDobanda.value === ""){ showError(".error-tip-dobanda", "Trebuie să selectați tipul dobânzii."); valid=false; }
        if(suma < 1000 || suma > 100000000){ showError(".error-suma", "Suma trebuie să fie între 1.000 și 100.000.000 LEI."); valid=false; }
        if(perioada < 2 || perioada > 360){ showError(".error-perioada", "Perioada trebuie să fie între 2 și 360 luni."); valid=false; }
        if(inputTipRata.value === ""){ showError(".error-tip-rata", "Trebuie să alegeți tipul de rată."); valid=false; }
        if(salariu === 0){ showError(".error-salariu", "Trebuie să introduceți salariul."); valid=false; }

        if(!valid) return;

        const principal = suma - avans;
        const dobandaAnuala = 0.12;
        const r = dobandaAnuala / 12;
        let rataLunara = principal * r / (1 - Math.pow(1+r, -perioada));

        const gradMax = salariu < 35000 ? 0.4 : 0.55;
        if(rataLunara > salariu * gradMax){
            showError(".error-salariu", "Grad de îndatorare depășit!");
            return;
        }

        const dobandaLunara = principal * 0.01;
        const dobandaTotala = dobandaLunara * perioada;
        const comision = 40;
        const rataTotala = rataLunara * perioada;
        const comisieRataTotala = rataTotala + comision * perioada;
        const DAE = ((Math.pow(1 + dobandaLunara / principal, 12) - 1) * 100).toFixed(2);

        // --- AFISARE REZULTATE ---
        rezultInner.innerHTML = `
            <p>Rata lunara: ${rataLunara.toFixed(2)} LEI</p>
            <p>Rata totala: ${rataTotala.toFixed(2)} LEI</p>
            <p>Dobanda lunara: ${dobandaLunara.toFixed(2)} LEI</p>
            <p>Dobanda totala: ${dobandaTotala.toFixed(2)} LEI</p>
            <p>Comision: ${comision.toFixed(2)} LEI</p>
            <p>DAE: ${DAE} %</p>
            <p>Comisie si rata totala: ${comisieRataTotala.toFixed(2)} LEI</p>
        `;

        [rezultDiv, rezultInner, grafDiv].forEach(el => el.style.display = "block");
        allIcons.style.display = "flex";

        createGrafic(principal, rataLunara, perioada);
        createTabelAmortizare(principal, rataLunara, perioada, dobandaLunara, comision);

        saveSimulare(inputTipCredit.value, suma, perioada, inputTipRata.value, avans, salariu, rataLunara, rataTotala);
    });
});
