document.addEventListener("DOMContentLoaded", () => {
    const iconFavorite = document.querySelector("#icon1");
    const divFavorite = document.querySelector(".div-icon1");
    const stergeToateBtn = document.querySelector(".sterge-toate");

    // --- Resetare inimă la modificarea datelor ---
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

    // --- Adăugare / Ștergere favorite prin click pe inimă ---
    if (divFavorite && iconFavorite) {
        divFavorite.addEventListener("click", async () => {
            const id_simulare = divFavorite.dataset.id;
            if (!id_simulare) return;

            // Ștergere dacă este deja favorite
            if (iconFavorite.classList.contains("bi-heart-fill")) {
                try {
                    await fetch("../../backend/php/sterge_favorite.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: id_simulare })
                    });
                    iconFavorite.classList.remove("bi-heart-fill");
                    iconFavorite.classList.add("bi-heart");
                } catch (err) {
                    console.error(err);
                }
                return;
            }

            // Adăugare favorite
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
                    iconFavorite.classList.add("bi-heart-fill");
                    iconFavorite.classList.remove("bi-heart");
                } else {
                    console.error(data.message || "Eroare la salvare.");
                }
            } catch (err) {
                console.error(err);
            }
        });
    }

    // --- Funcție pentru afișare mesaj când nu mai există favorite ---
    function checkFavoritesEmpty() {
        const container = document.querySelector(".container-div");
        if (container && container.children.length === 0) {
            container.innerHTML = `
                <div class="content">
                    <div class="login-text">
                        <h1>Nu există simulări favorite</h1>
                        <a href="credite.php" class="spinner-link">
                            <button class="login-favorit-button">Mergi la Credite</button>
                        </a>
                    </div>
                </div>
            `;
            const stergeWrapper = document.querySelector(".sterge-toate-wrapper");
            if (stergeWrapper) stergeWrapper.remove();
        }
    }

    // --- Ștergere favorite individual ---
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

    // --- Ștergere toate favoritele ---
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
