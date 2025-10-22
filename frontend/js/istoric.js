document.addEventListener("DOMContentLoaded", () => {

  // --- ȘTERGERE INDIVIDUALĂ ---
  document.querySelectorAll(".sterge").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      if (!id) return;
      if (!confirm("Ștergi această simulare?")) return;

      fetch("../../backend/php/sterge_simulare.php", {
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `id_simulare=${encodeURIComponent(id)}`
      })
      .then(() => {
        const card = button.closest(".istoric-card");
        if (card) {
          card.style.transition = "all 0.35s ease";
          card.style.opacity = "0";
          card.style.transform = "scale(0.92)";
          setTimeout(() => {
            card.remove();
            checkIfEmpty();
          }, 350);
        }
      })
      .catch(err => console.error(err));
    });
  });

  // --- ȘTERGERE TOATE SIMULĂRILE ---
  const stergeToateBtn = document.querySelector(".sterge-toate");
  if (stergeToateBtn) {
    stergeToateBtn.addEventListener("click", () => {
      if (!confirm("Ștergeți toate simulările?")) return;

      fetch("../../backend/php/sterge_toate.php", { method: "POST" })
      .then(() => {
        document.querySelectorAll(".istoric-card").forEach(card => card.remove());
        stergeToateBtn.remove();
        showNoSimulari();
      })
      .catch(err => console.error(err));
    });
  }

  // --- VERIFICĂ DACĂ MAI EXISTĂ SIMULĂRI ---
  function checkIfEmpty() {
    const container = document.querySelector(".container-div");
    if (container && container.querySelectorAll(".istoric-card").length === 0) {
      const stergeToateBtn = document.querySelector(".sterge-toate");
      if (stergeToateBtn) stergeToateBtn.remove();
      showNoSimulari();
    }
  }

  // --- AFIȘEAZĂ MESAJUL "NU EXISTĂ SIMULĂRI" ---
  function showNoSimulari() {
    const container = document.querySelector(".container-div");
    if (!container) return;
    container.innerHTML = `
      <div class="content">
        <div class="login-text">
          <h1>Nu există simulări în istoric</h1>
          <a href="credite.php" class="spinner-link">
            <button class="login-favorit-button">Mergi la Credite</button>
          </a>
        </div>
      </div>`;
  }

});
