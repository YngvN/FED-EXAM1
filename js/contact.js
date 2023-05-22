window.addEventListener('DOMContentLoaded', (event) => {
    var nameInput = document.querySelector("#name");
    var namePassIcon = document.querySelector("#name ~ .pass");
    var nameFailIcon = document.querySelector("#name ~ .fail");

    var emailInput = document.querySelector("#email");
    var emailPassIcon = document.querySelector("#email ~ .pass");
    var emailFailIcon = document.querySelector("#email ~ .fail");

    var topicInput = document.querySelector("#topic");
    var topicPassIcon = document.querySelector("#topic ~ .pass");
    var topicFailIcon = document.querySelector("#topic ~ .fail");

    var messageInput = document.querySelector("#message");
    var messagePassIcon = document.querySelector("#message ~ .pass");
    var messageFailIcon = document.querySelector("#message ~ .fail");

    var submitButton = document.querySelector("#contact-form-btn");
    
    var icons = document.querySelectorAll(".check");
    Array.from(icons).forEach(icon => {
        icon.style.display = "none";
    });

    function validateInputs() {
        if (nameInput.value.length >= 5) {
            namePassIcon.style.display = 'inline-block';
            nameFailIcon.style.display = 'none';
        } else {
            namePassIcon.style.display = 'none';
            nameFailIcon.style.display = 'inline-block';
            return false;
        }

        var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (emailPattern.test(emailInput.value)) {
            emailPassIcon.style.display = 'inline-block';
            emailFailIcon.style.display = 'none';
        } else {
            emailPassIcon.style.display = 'none';
            emailFailIcon.style.display = 'inline-block';
            return false; 
        }

        if (topicInput.value.length >= 15) {
            topicPassIcon.style.display = 'inline-block';
            topicFailIcon.style.display = 'none';
        } else {
            topicPassIcon.style.display = 'none';
            topicFailIcon.style.display = 'inline-block';
            return false;
        }

        if (messageInput.value.length >= 25) {
            messagePassIcon.style.display = 'inline-block';
            messageFailIcon.style.display = 'none';
        } else {
            messagePassIcon.style.display = 'none';
            messageFailIcon.style.display = 'inline-block';
            return false;
        }

        return true;
    }

    [nameInput, emailInput, topicInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            let validationPasses = validateInputs();
            submitButton.disabled = !validationPasses;
            submitButton.style.opacity = validationPasses ? "1" : "0.5";
            submitButton.style.backgroundColor = validationPasses ? "var(--color2)" : "var(--color3)";
            submitButton.style.cursor = validationPasses ? "pointer" : "auto";
            submitButton.style.cursor = validationPasses ? "pointer" : "auto";


        });
    });

    submitButton.disabled = true;
    submitButton.style.opacity = "0.5";
    submitButton.style.backgroundColor = "var(--color3)";
    submitButton.style.cursor = "auto";

    var form = document.querySelector("#contact-form");
    var confirmationContainer = document.querySelector("#confirmation");

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if(validateInputs()) {
            form.style.transition = "opacity 0.5s ease-in-out";
            form.style.opacity = "0";
            setTimeout(function() {
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

            setTimeout(function() {
                confirmationContainer.style.transition = "opacity 0.5s ease-in-out";
                confirmationContainer.style.opacity = "1";
                confirmationContainer.style.display = "flex";
            }, 500);

            var editButton = document.querySelector("#edit-btn");
            editButton.addEventListener('click', function() {
                form.style.display = "flex";
                form.style.transition = "opacity 0.5s ease-in-out";
                form.style.opacity = "1";

                confirmationContainer.style.display = "none";
                confirmationContainer.innerHTML = "";

                confirmationContainer.style.transition = "opacity 0.5s ease-in-out";
                confirmationContainer.style.opacity = "0";
            });

            var sendButton = document.querySelector("#send-btn");
            sendButton.addEventListener('click', function() {

                var hiddenContainers = document.querySelectorAll(".hide");
                hiddenContainers.forEach(container => {
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
