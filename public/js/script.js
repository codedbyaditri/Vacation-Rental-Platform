(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// Image Preview for Edit Page
const imageInput = document.querySelector("#imageInput");
const imagePreview = document.querySelector("#imagePreview");

if (imageInput) {
  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
      imagePreview.src = URL.createObjectURL(file);
    }
  });
}
