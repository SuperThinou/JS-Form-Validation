const highFive = document.querySelector("h2");

const form = document.querySelector("form");

const email = document.querySelector("#email");
const country = document.querySelector("#country");
const postal = document.querySelector("#postal");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

const inputs = [email, country, postal, password, confirmPassword];

inputs.forEach((input) => {
  input.addEventListener("blur", () => validateField(input));
  input.addEventListener("input", () => clearError(input));
});

confirmPassword.addEventListener("blur", () => {
  if (confirmPassword.value !== password.value) {
    setError(confirmPassword, "Passwords do not match");
  }
});

form.addEventListener("submit", (e) => {
  let isValid = true;

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  if (password.value !== confirmPassword.value) {
    setError(confirmPassword, "Passwords do not match");
    isValid = false;
  }

  if (!isValid) e.preventDefault();
});

function validateField(input) {
  input.setCustomValidity("");

  if (input.validity.valueMissing) {
    return setError(input, "This field is required");
  }

  if (input.type === "email" && input.validity.typeMismatch) {
    return setError(input, "Please enter a valid email address");
  }

  if (input.validity.patternMismatch) {
    if (input.id === "postal") {
      return setError(input, "Postal code must be exactly 5 digits");
    }

    if (input.id === "password") {
      return setError(
        input,
        "Password must contain at least 8 characters, one letter and one number",
      );
    }
  }

  if (input.validity.tooShort) {
    return setError(input, `Minimum length is ${input.minLength} characters`);
  }

  if (input.tagName === "SELECT" && input.value === "") {
    return setError(input, "Please select a country");
  }

  setSuccess(input);
  return true;
}

function setError(input, message) {
  input.setCustomValidity(message);

  const container = input.closest(".label-input");
  const errorSpan = container.querySelector(".error-message");

  errorSpan.textContent = message;

  input.style.border = "2px solid var(--red)";
  input.style.backgroundColor = "var(--red-dark)";
  return false;
}

function setSuccess(input) {
  const container = input.closest(".label-input");
  const errorSpan = container.querySelector(".error-message");

  errorSpan.textContent = "";

  input.style.border = "2px solid var(--green)";
  input.style.backgroundColor = "var(--green-dark)";
}

function clearError(input) {
  input.setCustomValidity("");

  const container = input.closest(".label-input");
  const errorSpan = container.querySelector(".error-message");

  errorSpan.textContent = "";
  input.style.border = "1px solid var(--primary-light)";
  input.style.backgroundColor = "var(--primary-dark)";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  if (password.value !== confirmPassword.value) {
    setError(confirmPassword, "Passwords do not match");
    isValid = false;
  }

  if (isValid) {
    highFive.classList.remove("hidden");
  }
});
