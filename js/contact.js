window.addEventListener("DOMContentLoaded", (event) => {
  var nameInput = document.querySelector("#name");
  var emailInput = document.querySelector("#email");
  var topicInput = document.querySelector("#topic");
  var messageInput = document.querySelector("#message");
  var submitButton = document.querySelector("#contact-form-btn");

  var inputs = [nameInput, emailInput, topicInput, messageInput];
  var icons = Array.from(document.querySelectorAll(".check"));


  // Hides the check icons
  icons.forEach(function (icon) {
    icon.style.display = "none";
  });


// Checks if the inputs matches the requirements
  function validateInputs(element = null) {
    var isValidations = inputs.map(function (input) {
      if (element && input !== element) return true;

      switch (input) {
        case nameInput:
          return input.value.length >= 5 || input.value.length === 0;
        case emailInput:
          return (
            input.value.length === 0 ||
            /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(input.value)
          );
        case topicInput:
          return input.value.length >= 15 || input.value.length === 0;
        case messageInput:
          return input.value.length >= 25 || input.value.length === 0;
        default:
          return true;
      }
    });
  
    // Checks if all are valid
    return isValidations.every(function (isValid) {
      return isValid;
    });
  }

  // Displays the checkmark or x
  function displayValidationIcon(inputElement, isValid) {
    var index = inputs.indexOf(inputElement);
    if (index !== -1) {
      var passIcon = icons[index * 2];
      var failIcon = icons[index * 2 + 1];
      if (inputElement.value === "") {
        passIcon.style.display = "none";
        failIcon.style.display = "inline-block";
      } else {
        passIcon.style.display = isValid ? "inline-block" : "none";
        failIcon.style.display = isValid ? "none" : "inline-block";
        inputElement.style.outlineColor = isValid ? "var(--color4)" : "";
      }
    }
  }

  inputs.forEach(function (input) {
    input.addEventListener("input", function () {
      var isValid = validateInputs(input);
      displayValidationIcon(input, isValid);
      updateSubmitButtonState();
    });
  });

  // Changes the style of the submit button when all criteria is met
  function updateSubmitButtonState() {
    var checkmarksVisible =
      icons.filter(function (icon) {
        return icon.classList.contains("pass") && icon.style.display !== "none";
      }).length ===
      icons.filter(function (icon) {
        return icon.classList.contains("pass");
      }).length;

    submitButton.disabled = !checkmarksVisible;
    submitButton.style.opacity = checkmarksVisible ? "1" : "0.5";
    submitButton.style.backgroundColor = checkmarksVisible
      ? "var(--color2)"
      : "var(--color3)";
    submitButton.style.cursor = checkmarksVisible ? "pointer" : "auto";
  }

  submitButton.disabled = true;
  submitButton.style.opacity = "0.5";
  submitButton.style.backgroundColor = "var(--color3)";
  submitButton.style.cursor = "auto";

  var form = document.querySelector("#contact-form");
  var confirmationContainer = document.querySelector("#confirmation");


// Changes the submit form into the confirm container
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateInputs()) {
      form.style.transition = "opacity 0.5s ease-in-out";
      form.style.opacity = "0";
      setTimeout(function () {
        form.style.display = "none";
      }, 500);

      confirmationContainer.innerHTML = `
                <h2>Confirm message</h2>
                <div class="input-group">
                    <h3>Name:</h3>
                    <p>${nameInput.value}</p>
                </div>
                <div class="input-group">
                    <h3>Email:</h3>
                    <p>${emailInput.value}</p>
                </div>
                <div class="input-group">
                    <h3>Topic:</h3>
                    <p>${topicInput.value}</p>
                </div>
                <div class="input-group">
                    <h3>Message:</h3>
                    <p>${messageInput.value}</p>
                </div>
                <div class="container-buttons ">
                    <button id="send-btn" class="confirm-btn" type="submit">Confirm</button>
                    <button id="edit-btn" class="confirm-btn" type="edit">Edit</button>
                </div>
            `;

      setTimeout(function () {
        confirmationContainer.style.transition = "opacity 0.5s ease-in-out";
        confirmationContainer.style.opacity = "1";
        confirmationContainer.style.display = "flex";
      }, 500);

      var editButton = document.querySelector("#edit-btn");
      editButton.addEventListener("click", function () {
        form.style.display = "flex";
        form.style.transition = "opacity 0.5s ease-in-out";
        form.style.opacity = "1";

        confirmationContainer.style.display = "none";
        confirmationContainer.innerHTML = "";

        confirmationContainer.style.transition = "opacity 0.5s ease-in-out";
        confirmationContainer.style.opacity = "0";
      });

      var sendButton = document.querySelector("#send-btn");
      sendButton.addEventListener("click", function () {
        var hiddenContainers = document.querySelectorAll(".hide");
        hiddenContainers.forEach((container) => {
          container.style.display = "none";
        });

        var messageContainer = document.querySelector("#confirm-message");
        messageContainer.innerHTML = `
                <h2>Message Sent!</h2>
                <button class="btn-more" onclick="window.location.href = 'index.html'">Go home</button>
                `;

        messageContainer.style.display = "flex";
      });
    }
  });
});
