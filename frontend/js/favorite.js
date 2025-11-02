document.addEventListener("DOMContentLoaded", () => {

    const iconFavorite = document.querySelector("#icon1");
    const divFavorite = document.querySelector(".div-icon1");
    const stergeToateBtn = document.querySelector(".sterge-toate");

    // --- Resetare inimă la modificarea datelor ---
    const formInputs = document.querySelectorAll(
        ".input-tip-credit, .input-suma, .input-perioada, .input-tip-rata, " +
        ".input-durata-gratie, .input-tip-dobanda, .input-initial-mixta, " +
        ".input-durata-gratie-mixta, .input-avans, .input-salariu, " +
        ".input-suma-rambursare, .input-optiune-rambursare"
    );

    formInputs.forEach(input => {
        input.addEventListener("input", () => {
            if (iconFavorite && iconFavorite.classList.contains("bi-heart-fill")) {
                iconFavorite.classList.replace("bi-heart-fill", "bi-heart");
            }
        });
    });

    // --- Adăugare favorite ---
    if (divFavorite && iconFavorite) {
        divFavorite.addEventListener("click", async () => {
            const tip_credit = (document.querySelector(".input-tip-credit")?.value || '').trim();
            const suma = parseFloat(document.querySelector(".input-suma")?.value || 0);
            const perioada = parseInt(document.querySelector(".input-perioada")?.value || 0);
            const tip_rata = (document.querySelector(".input-tip-rata")?.value || '').trim();
            const perioada_gratie = (document.querySelector(".input-durata-gratie")?.value || '').trim();
            const tip_dobanda = (document.querySelector(".input-tip-dobanda")?.value || '').trim();
            const dobanda_mixta = (document.querySelector(".input-initial-mixta")?.value || '').trim();
            const perioada_gratie_mixta = (document.querySelector(".input-durata-gratie-mixta")?.value || '').trim();
            const avans = parseFloat(document.querySelector(".input-avans")?.value || 0);
            const salariu = parseFloat(document.querySelector(".input-salariu")?.value || 0);
            const suma_rambursare = parseFloat(document.querySelector(".input-suma-rambursare")?.value || 0);
            const optiune_rambursare = (document.querySelector(".input-optiune-rambursare")?.value || '').trim();

            const rataLunaraElem = document.querySelector("[data-translate='rez-rata-lunara'] + p");
            const rataTotalaElem = document.querySelector("[data-translate='rez-rata-totala'] + p");

            const rata_lunara = rataLunaraElem ? parseFloat(rataLunaraElem.textContent.replace(/[^\d.]/g,'')) : 0;
            const rata_totala = rataTotalaElem ? parseFloat(rataTotalaElem.textContent.replace(/[^\d.]/g,'')) : 0;

            if (!tip_credit || !suma || !perioada || !tip_rata) {
                alert("Completează datele principale ale simulării înainte de a salva la favorite!");
                return;
            }

            const data = {
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
            };

            try {
                const res = await fetch("../../backend/php/save_favorite.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                const result = await res.json();
                if (result.status === "success") {
                    iconFavorite.classList.replace("bi-heart", "bi-heart-fill");
                    alert(result.message);
                } else if (result.status === "exists") {
                    alert(result.message);
                } else {
                    alert("Eroare la salvarea favoritei!");
                }
            } catch (err) {
                console.error(err);
            }
        });
    }

    // --- Ștergere individuală favorite  ---
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".sterge")) return;

        const button = e.target.closest(".sterge");
        const id = button.dataset.id;
        if (!id) return;
        if (!confirm("Ștergi această simulare din favorite?")) return;

        fetch("../../backend/php/sterge_favorite.php", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: id })
        })
        .then(() => {
            const card = button.closest(".favorite-card");
            if (card) {
                card.style.transition = "all 0.35s ease";
                card.style.opacity = "0";
                card.style.transform = "scale(0.92)";
                setTimeout(() => {
                    card.remove();
                    checkFavoritesEmpty();
                }, 350);
            }
        })
        .catch(err => console.error(err));
    });

    // --- Ștergere toate favoritele ---
    if (stergeToateBtn) {
        stergeToateBtn.addEventListener("click", () => {
            if (!confirm("Ștergeți toate simulările favorite?")) return;

            fetch("../../backend/php/sterge_toate_favorite.php", { method: "POST" })
            .then(() => {
                document.querySelectorAll(".favorite-card").forEach(card => card.remove());
                stergeToateBtn.remove();
                showNoFavorites();
            })
            .catch(err => console.error(err));
        });
    }

    // --- Verifică dacă mai există favorite ---
    function checkFavoritesEmpty() {
        const container = document.querySelector(".container-div");
        if (container && container.querySelectorAll(".favorite-card").length === 0) {
            const stergeToateBtn = document.querySelector(".sterge-toate");
            if (stergeToateBtn) stergeToateBtn.remove();
            showNoFavorites();
        }
    }

   

});
