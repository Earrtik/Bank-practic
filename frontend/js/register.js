document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const errorUsername = document.getElementById("error-username");
  const errorEmail = document.getElementById("error-email");
  const errorPassword = document.getElementById("error-password");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset erori
    [errorUsername, errorEmail, errorPassword].forEach(div => {
      div.textContent = "";
      div.style.display = "none";
    });

    let hasError = false;

    // Validare client
    if (username.value.length < 3) {
      errorUsername.textContent = "Numele trebuie să aibă minim 3 caractere!";
      errorUsername.style.display = "block";
      hasError = true;
    }
    if (password.value.length < 6) {
      errorPassword.textContent = "Parola trebuie să aibă minim 6 caractere!";
      errorPassword.style.display = "block";
      hasError = true;
    }

    if (hasError) return; // nu trimitem formularul dacă sunt erori client

    // Trimitem datele la PHP
    const formData = new FormData(form);
    const response = await fetch("../../backend/php/register.php", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      window.location.href = "../../frontend/html/credite.php";
    } else {
      // afișăm eroarea sub input corespunzător
      if (result.errorField === "username") {
        errorUsername.textContent = result.message;
        errorUsername.style.display = "block";
      }
      if (result.errorField === "email") {
        errorEmail.textContent = result.message;
        errorEmail.style.display = "block";
      }
      if (result.errorField === "password") {
        errorPassword.textContent = result.message;
        errorPassword.style.display = "block";
      }
    }
  });
});
