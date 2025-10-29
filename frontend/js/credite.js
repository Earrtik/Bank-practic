
document.addEventListener('DOMContentLoaded', () => {

    // --- Schimbare valuta ---
    const valutaLinks = document.querySelectorAll('.type-valuta a');
    valutaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedValuta = link.getAttribute('data-valuta');
            valutaLinks.forEach(l => { l.classList.remove('valuta-mdl'); l.classList.add('valuta'); });
            link.classList.add('valuta-mdl'); link.classList.remove('valuta');

            let symbol = 'LEI';
            if (selectedValuta === 'EUR') symbol = 'EUR';
            if (selectedValuta === 'USD') symbol = 'USD';
            document.querySelectorAll('.placeholder-right').forEach(p => p.textContent = symbol);
        });
    });

    // --- Fetch curs valutar ---
    fetch('../../backend/php/credite.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('eur-rate').textContent = data.EUR || "Eroare la server";
            document.getElementById('usd-rate').textContent = data.USD || "Eroare la server";
        });

    // --- Checkbox logic ---
    document.querySelectorAll(".checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const conditionalDiv = document.querySelector(`.conditional[data-target="${checkbox.id}"]`);
            if (conditionalDiv) conditionalDiv.style.display = checkbox.checked ? "block" : "none";
        });
    });
});
// Functie pentru export PDF tabel amortizare
function exportTabelPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const tabel = tabelAmortizareDiv.querySelector("table");
    if (!tabel) {
        alert("Nu există tabel de exportat!");
        return;
    }

    doc.autoTable({ html: tabel });
    doc.save("tabel_amortizare.pdf");
}

// Icon PDF
const iconPDF = document.getElementById("icon2");
if (iconPDF) iconPDF.addEventListener("click", exportTabelPDF);

// Text PDF
const textPDF = document.querySelector('[data-translate="icon-pdf"]');
if (textPDF) textPDF.addEventListener("click", exportTabelPDF);



const iconLink = document.getElementById("icon3");
const shareLink = document.getElementById("share-link");
iconLink.addEventListener("click", () => {
    // datele simulării trebuie definite aici sau luate din formular
    const simulareData = {
        tip_credit: document.querySelector(".input-tip-credit").value,
        suma: parseFloat(document.querySelector(".input-suma").value),
        perioada: parseInt(document.querySelector(".input-perioada").value),
        tip_rata: document.querySelector(".input-tip-rata").value,
        perioada_gratie: parseInt(document.querySelector(".input-perioada-gratie")?.value || 0),
        tip_dobanda: document.querySelector(".input-tip-dobanda")?.value || '',
        dobanda_mixta: document.querySelector(".input-dobanda-mixta")?.checked ? 'DA' : 'NU',
        avans: parseFloat(document.querySelector(".input-avans")?.value || 0),
        salariu: parseFloat(document.querySelector(".input-salariu")?.value || 0),
        rata_lunara: parseFloat(document.querySelector(".input-rata-lunara")?.value || 0),
        rata_totala: parseFloat(document.querySelector(".input-rata-totala")?.value || 0),
        suma_rambursare: parseFloat(document.querySelector(".input-suma-rambursare")?.value || 0),
        optiune_rambursare: document.querySelector(".input-optiune-rambursare")?.checked ? 'DA' : 'NU'
    };

    fetch('../../backend/php/save_simulare.php', {
        method: 'POST',
        body: JSON.stringify(simulareData)
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === 'success'){
            iconLink.dataset.id = data.simulare_id;
            const link = `${window.location.origin}/bank-practic/frontend/html/share.php?id=${data.simulare_id}`;
            alert(link);
        } else {
            alert(data.message);
        }
    });
});
