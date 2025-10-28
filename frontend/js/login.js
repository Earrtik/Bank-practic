document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  const errorEmail = document.querySelector("#error-email");
  const errorPassword = document.querySelector("#error-password");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset erori
    errorEmail.style.display = "none";
    errorPassword.style.display = "none";
    errorEmail.textContent = "";
    errorPassword.textContent = "";

    const formData = new FormData(form);

    try {
      const response = await fetch("../../backend/php/login.php", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = "../../frontend/html/credite.php";
      } else {
        if(result.errorField === "email") {
          errorEmail.textContent = result.message;
          errorEmail.style.display = "block";
        }
        if(result.errorField === "password") {
          errorPassword.textContent = result.message;
          errorPassword.style.display = "block";
        }
      }

    } catch (err) {
      console.error("Eroare:", err);
    }
  });
});
