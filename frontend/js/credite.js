document.addEventListener('DOMContentLoaded', () => {

    // --- Gestionare blocuri ascunse la checkbox ---
    const conditionals = document.querySelectorAll('.conditional');

    conditionals.forEach(div => {
        const checkboxId = div.getAttribute('data-target');
        const checkbox = document.getElementById(checkboxId);

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        });
    });

    // Schimbare valuta (MDL / EUR / USD) 
    const valutaLinks = document.querySelectorAll('.type-valuta a');

    valutaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedValuta = link.getAttribute('data-valuta');

                // Reseteaza toate link-urile
                valutaLinks.forEach(l => {
                    l.classList.remove('valuta-mdl');
                    l.classList.add('valuta');  
                });

            // Aplicam stilul pe selectia curenta
            link.classList.add('valuta-mdl');
            link.classList.remove('valuta');

                
            let symbol = 'Lei';
            if (selectedValuta === 'EUR') symbol = 'EUR';
            if (selectedValuta === 'USD') symbol = 'USD';

            const placeholders = document.querySelectorAll('.placeholder-right');
            placeholders.forEach(p => {
                p.textContent = symbol;
            });
        });
    });

});
