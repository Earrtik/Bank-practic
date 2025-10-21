document.addEventListener('DOMContentLoaded', () => {

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

                
            let symbol = 'LEI';
            if (selectedValuta === 'EUR') symbol = 'EUR';
            if (selectedValuta === 'USD') symbol = 'USD';

            const placeholders = document.querySelectorAll('.placeholder-right');
            placeholders.forEach(p => {
                p.textContent = symbol;
            });
        });
    });

});

fetch('../../backend/php/credite.php')
  .then(response => response.json())
  .then(data => {
      document.getElementById('eur-rate').textContent = data.EUR || "Eroare la server";
      document.getElementById('usd-rate').textContent = data.USD || "Eroare la server";
  })
  .catch(err => {
      document.getElementById('eur-rate').textContent = "Eroare la server";
      document.getElementById('usd-rate').textContent = "Eroare la server";
      console.error(err);
  });
   


// Chekbox
document.addEventListener("DOMContentLoaded", () => {
    // Găsește toate checkbox-urile cu clasa .checkbox
    const checkboxes = document.querySelectorAll(".checkbox");

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            // Găsește div-ul corespunzător (data-target = id checkbox)
            const targetId = checkbox.id;
            const conditionalDiv = document.querySelector(`.conditional[data-target="${targetId}"]`);
            if (conditionalDiv) {
                conditionalDiv.style.display = checkbox.checked ? "block" : "none";
            }
        });
    });
});



