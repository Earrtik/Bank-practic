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
