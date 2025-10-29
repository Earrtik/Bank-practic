document.addEventListener("DOMContentLoaded", () => {
    const iconFavorite = document.querySelector("#icon1");
    const divFavorite = document.querySelector(".div-icon1");
    const stergeToateBtn = document.querySelector(".sterge-toate");

    // --- Resetare inima la modificarea datelor ---
    const formInputs = document.querySelectorAll(
        ".input-tip-credit, .input-suma, .input-perioada, .input-tip-rata, .input-durata-gratie, .input-tip-dobanda, .input-initial-mixta, .input-durata-gratie-mixta, .input-avans, .input-salariu, .input-suma-rambursare, .input-optiune-rambursare"
    );

    formInputs.forEach(input => {
        input.addEventListener("input", () => {
            if (iconFavorite && iconFavorite.classList.contains("bi-heart-fill")) {
                iconFavorite.classList.remove("bi-heart-fill");
                iconFavorite.classList.add("bi-heart");
            }
        });
    });

    // --- Adaugare favorite pentru simularea curenta ---
    if (divFavorite && iconFavorite) {
        divFavorite.addEventListener("click", async () => {
            const tip_credit = document.querySelector(".input-tip-credit").value;
            const suma = document.querySelector(".input-suma").value;
            const perioada = document.querySelector(".input-perioada").value;
            const tip_rata = document.querySelector(".input-tip-rata").value;
            const perioada_gratie = document.querySelector(".input-durata-gratie")?.value || '';
            const tip_dobanda = document.querySelector(".input-tip-dobanda").value;
            const dobanda_mixta = document.querySelector(".input-initial-mixta")?.value || '';
            const perioada_gratie_mixta = document.querySelector(".input-durata-gratie-mixta")?.value || '';
            const avans = document.querySelector(".input-avans").value;
            const salariu = document.querySelector(".input-salariu").value;
            const suma_rambursare = document.querySelector(".input-suma-rambursare")?.value || '';
            const optiune_rambursare = document.querySelector(".input-optiune-rambursare")?.value || '';
            const rata_lunara = document.querySelector("[data-translate='rez-rata-lunara'] + p")?.textContent || '';
            const rata_totala = document.querySelector("[data-translate='rez-rata-totala'] + p")?.textContent || '';

            if (!tip_credit || !suma || !perioada || !tip_rata) {
                alert("Completează datele principale ale simulării înainte de a salva la favorite!");
                return;
            }

            try {
                const response = await fetch("../../backend/php/save_favorite.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        tip_credit,
                        suma,
                        perioada,
                        tip_rata,
                        perioada_gratie,
                        tip_dobanda,
                        dobanda_mixta,
                        perioada_gratie_mixta,
                        avans,
                        salariu,
                        suma_rambursare,
                        optiune_rambursare,
                        rata_lunara,
                        rata_totala
                    })
                });

                const data = await response.json();
                if (data.status === "success") {
                    // aici doar schimb culoarea inimii
                    iconFavorite.classList.add("bi-heart-fill");
                    iconFavorite.classList.remove("bi-heart");
                }
            } catch (err) {
                console.error(err);
            }
        });
    }
    // --- Ștergere favorite individual (doar în lista de carduri) ---
    document.addEventListener("click", async (e) => {
        if (e.target.closest(".sterge")) {
            const button = e.target.closest(".sterge");
            const id_simulare = button.dataset.id;
            if (!id_simulare) return;

            if (!confirm("Sigur vrei să ștergi această simulare din favorite?")) return;

            try {
                await fetch("../../backend/php/sterge_favorite.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: id_simulare })
                });
                button.closest(".favorite-card").remove();
                checkFavoritesEmpty();
            } catch (err) {
                console.error(err);
            }
        }
    });

    // --- Stergere toate favoritele ---
    if (stergeToateBtn) {
        stergeToateBtn.addEventListener("click", async () => {
            if (!confirm("Sigur vrei să ștergi toate favoritele?")) return;

            try {
                await fetch("../../backend/php/sterge_toate_favorite.php", {
                    method: "POST"
                });
                document.querySelectorAll(".favorite-card").forEach(card => card.remove());
                checkFavoritesEmpty();
            } catch (err) {
                console.error(err);
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const iconFavorite = document.querySelector("#icon1");
    const divFavorite = document.querySelector(".div-icon1");
    if (!divFavorite || !iconFavorite) return;

    divFavorite.addEventListener("click", async () => {
        const data = {
            tip_credit: (document.querySelector(".input-tip-credit")?.value || '').trim(),
            suma: parseFloat(document.querySelector(".input-suma")?.value || 0).toFixed(2),
            perioada: parseInt(document.querySelector(".input-perioada")?.value || 0),
            tip_rata: (document.querySelector(".input-tip-rata")?.value || '').trim(),
            perioada_gratie: (document.querySelector(".input-durata-gratie")?.value || '').trim(),
            tip_dobanda: (document.querySelector(".input-tip-dobanda")?.value || '').trim(),
            dobanda_mixta: (document.querySelector(".input-initial-mixta")?.value || '').trim(),
            perioada_gratie_mixta: (document.querySelector(".input-durata-mixta")?.value || '').trim(),
            avans: parseFloat(document.querySelector(".input-avans")?.value || 0).toFixed(2),
            salariu: parseFloat(document.querySelector(".input-salariu")?.value || 0).toFixed(2),
            suma_rambursare: parseFloat(document.querySelector(".input-suma-rambursare")?.value || 0).toFixed(2),
            optiune_rambursare: (document.querySelector(".input-optiune-rambursare")?.value || '').trim(),
            rata_lunara: parseFloat(document.querySelector("[data-translate='rez-rata-lunara'] + p")?.textContent || 0).toFixed(2),
            rata_totala: parseFloat(document.querySelector("[data-translate='rez-rata-totala'] + p")?.textContent || 0).toFixed(2)
        };

      

        try {
            const res = await fetch("../../backend/php/save_favorite.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (result.status === "success") {
                alert(result.message);
                iconFavorite.classList.replace("bi-heart", "bi-heart-fill");
            } else if (result.status === "exists") {
                alert(result.message);
            } 
               
            
        } catch (err) {
            console.error(err);
           
        }});
});
