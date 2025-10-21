document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    const inputTipCredit = document.querySelector(".input-tip-credit");
    const inputSuma = document.querySelector(".input-suma");
    const inputPerioada = document.querySelector(".input-perioada");
    const inputTipRata = document.querySelector(".input-tip-rata");
    const inputDurataGratie = document.querySelector(".input-durata-gratie");
    const inputTipDobanda = document.querySelector(".input-tip-dobanda");
    const inputInitialMixta = document.querySelector(".input-initial-mixta");
    const inputDurataGratieMixta = document.querySelector(".input-durata-gratie-mixta");
    const inputAvans = document.querySelector(".input-avans");
    const inputSalariu = document.querySelector(".input-salariu");
    const inputSumaRamb = document.querySelector(".input-suma-rambursare");
    const inputOptiuneRamb = document.querySelector(".input-optiune-rambursare");

    const rezultDiv = document.querySelector(".content-rezult");
    const grafDiv = document.querySelector(".content-grafic");
    const allIcons = document.querySelector(".all-icons");

    rezultDiv.style.display = "none";
    grafDiv.style.display = "none";
    allIcons.style.display = "none";

    function showError(selector, message) {
        const el = document.querySelector(selector);
        el.textContent = message;
        el.style.display = "block";
    }
    function clearError(selector) {
        const el = document.querySelector(selector);
        el.textContent = "";
        el.style.display = "none";
    }

    [inputSuma, inputPerioada, inputAvans, inputSalariu, inputSumaRamb].forEach(input => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/\D/g,'');
        });
    });

    // --- CORECTARE: Prima lună nu trebuie blocată ---
    function updateDurataGratieOptions(inputDurata, perioada) {
        inputDurata.querySelectorAll("option").forEach(opt => {
            const luni = parseInt(opt.value.split("-")[1]) || 0;
            if(opt.value === "prima-luna"){
                opt.disabled = false; // Prima lună niciodată blocată
            } else {
                opt.disabled = luni > perioada; // restul depinde de perioada
            }
        });
        inputDurata.value = "";
    }

    inputPerioada.addEventListener("input", () => {
        const perioada = parseInt(inputPerioada.value) || 0;
        updateDurataGratieOptions(inputDurataGratie, perioada);
        updateDurataGratieOptions(inputDurataGratieMixta, perioada);
    });

    function createGrafic(principal, rataLunara, perioada) {
        const ctx = document.querySelector(".grafic-rambursare").getContext("2d");
        if(window.myChart) window.myChart.destroy();

        const labels = [];
        const data = [];
        let sold = principal;

        for(let i=1; i<=perioada; i++){
            sold -= rataLunara;
            labels.push("Luna " + i);
            data.push(Math.max(sold, 0));
        }

        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Sold restant',
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.2
                }]
            },
            options: { responsive: true }
        });
    }

    function saveSimulare(tip_credit, suma, perioada, tip_rata, avans, salariu, rataLunara, rataTotala) {
        const formData = new FormData();
        formData.append('tip_credit', tip_credit);
        formData.append('suma', suma);
        formData.append('perioada', perioada);
        formData.append('tip_rata', tip_rata);
        formData.append('perioada_gratie', inputDurataGratie.value || '');
        formData.append('tip_dobanda', inputTipDobanda.value || '');
        formData.append('dobanda_mixta', inputInitialMixta.value || '');
        formData.append('perioada_gratie_mixta', inputDurataGratieMixta.value || '');
        formData.append('avans', avans);
        formData.append('salariu', salariu);
        formData.append('suma_rambursare', inputSumaRamb.value || '');
        formData.append('optiune_rambursare', inputOptiuneRamb.value || '');
        formData.append('rata_lunara', rataLunara.toFixed(2));
        formData.append('rata_totala', rataTotala.toFixed(2));

        fetch('../../backend/php/save_simulare.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 'success'){
                console.log("Simulare salvata cu succes!");
            } else {
                console.error("Eroare salvare:", data.message);
            }
        })
        .catch(err => console.error("Eroare fetch:", err));
    }

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
        if(suma < 1000 || suma > 100000000){ showError(".error-suma", "Suma trebuie să fie între 1.000 și 100.000.000 LEI."); valid=false; }
        if(perioada < 2 || perioada > 360){ showError(".error-perioada", "Perioada trebuie să fie între 2 și 360 luni."); valid=false; }
        if(inputTipRata.value === ""){ showError(".error-tip-rata", "Trebuie să alegeți tipul de rată."); valid=false; }
        if(inputTipCredit.value==="ipotecar" && avans < suma*0.1){ showError(".error-avans", `Avans minim ipotecar 10% (${(suma*0.1).toFixed(2)} LEI)`); valid=false; }
        if(avans > suma){ showError(".error-avans", "Avansul nu poate fi mai mare decât suma creditului."); valid=false; }
        if(salariu < 1000 || salariu > 300000){ showError(".error-salariu", "Salariu între 1.000 și 300.000 LEI."); valid=false; }

        const gradMax = salariu < 35000 ? 0.4 : 0.55;
        const principal = suma - avans;
        let rataLunara = 0;

        if(inputTipRata.value && perioada > 0){
            const dobandaAnuala = 0.12;
            const r = dobandaAnuala / 12;
            rataLunara = principal * r / (1 - Math.pow(1+r, -perioada));

            if(sumaRamb > 0 && inputOptiuneRamb.value === "reduce-rata"){
                rataLunara -= sumaRamb / perioada;
            }
        }

        if(rataLunara > salariu*gradMax){
            const salariuMin = (rataLunara / gradMax).toFixed(2);
            showError(".error-salariu", `Grad de îndatorare depășit! Salariu minim: ${salariuMin} LEI.`);
            rezultDiv.style.display = "none";
            grafDiv.style.display = "none";
            allIcons.style.display = "none";
            return;
        }

        if(!valid){
            rezultDiv.style.display = "none";
            grafDiv.style.display = "none";
            allIcons.style.display = "none";
            return;
        }

        const dobandaLunara = principal * 0.01;
        const dobandaTotala = dobandaLunara * perioada;
        const comision = 40;
        const DAE = 12;
        const rataTotala = rataLunara * perioada;
        const comisieRataTotala = rataTotala + comision;

        document.querySelector(".rezult").innerHTML = `
            <p>Rata lunara: ${rataLunara.toFixed(2)} LEI</p>
            <p>Rata totala: ${rataTotala.toFixed(2)} LEI</p>
            <p>Dobanda lunara: ${dobandaLunara.toFixed(2)} LEI</p>
            <p>Dobanda totala: ${dobandaTotala.toFixed(2)} LEI</p>
            <p>Comisionul: ${comision.toFixed(2)} LEI</p>
            <p>DAE: ${DAE.toFixed(2)} %</p>
            <p>Comisie si rata totala: ${comisieRataTotala.toFixed(2)} LEI</p>
        `;

        rezultDiv.style.display = "block";
        grafDiv.style.display = "block";
        allIcons.style.display = "flex";

        createGrafic(principal, rataLunara, perioada);

        saveSimulare(inputTipCredit.value, suma, perioada, inputTipRata.value, avans, salariu, rataLunara, rataTotala);
    });
});
        