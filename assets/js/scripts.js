// Handle image upload and preview
document
  .getElementById("file-upload-input")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      document.getElementById("student-photo").src = imgURL;
    }
  });

// Listen to the form submit event to update the preview card with form data
document
  .getElementById("idCardForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Retrieve the form values
    const fullName = document.getElementById("fullName").value;
    const studentID = document.getElementById("studentID").value;
    const dob = document.getElementById("dob").value;
    const faculty = document.getElementById("faculty").value;
    const course = document.getElementById("course").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    // Update the card content
    document.querySelector(
      "#preview-card .card-details p:nth-child(1) span"
    ).textContent = fullName;
    document.querySelector(
      "#preview-card .card-details p:nth-child(2) span"
    ).textContent = studentID;
    document.querySelector(
      "#preview-card .card-details p:nth-child(3) span"
    ).textContent = gender;
    document.querySelector(
      "#preview-card .card-details p:nth-child(4) span"
    ).textContent = dob;
    document.querySelector(
      "#preview-card .card-details p:nth-child(5) span"
    ).textContent = course;
    document.querySelector("#preview-card #institution-name span").textContent =
      faculty;

    // Calculate valid year and update the "valid till" date
    const firstTwoDigits = studentID.substring(0, 2);
    const validYear = parseInt(firstTwoDigits) + 8;
    const validDate = `valid till 08/${validYear}`;
    document.querySelector("#preview-card .card-avatar p").textContent =
      validDate;

    // Generate the card image after updating the preview
    generateCardImage();
  });

// Function to generate the card image (PNG)
document
  .getElementById("download-front")
  .addEventListener("click", function () {
    const frontCard = document.getElementById("preview-card");
    downloadCard(frontCard, "student_id_card_front.png", 300); // 300 PPI
  });

document.getElementById("download-back").addEventListener("click", function () {
  const backCard = document.getElementById("back-card");
  downloadCard(backCard, "student_id_card_back.png", 300); // 300 PPI
});

function downloadCard(cardElement, fileName, desiredPPI) {
  const scaleFactor = desiredPPI / 96; // Assuming 96 PPI is the default resolution
  html2canvas(cardElement, {
    scale: scaleFactor, // Adjust scale to match the desired PPI
    useCORS: true, // Ensure external images are handled
  }).then(function (canvas) {
    const link = document.createElement("a");
    link.download = fileName;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}
