document
  .getElementById("file-upload-input")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      document.getElementById("student-photo").src = imgURL;
    }
  });

// Listen to the form submit event
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

function generateCardImage() {
  const previewCard = document.getElementById("preview-card");

  // Define the scale factor for higher resolution
  const scale = 2; // Change this value to increase or decrease the resolution

  html2canvas(previewCard, {
    scale: scale, // Set the scale option
  })
    .then(function (canvas) {
      const downloadLink = document.getElementById("download-link");
      downloadLink.href = canvas.toDataURL("image/png");
      downloadLink.download = "student_id_card.png";
      downloadLink.style.display = "block";
      downloadLink.innerText = "Download Card";
    })
    .catch(function (error) {
      console.error("Error generating card image:", error);
    });
}

document.getElementById("download-pdf").addEventListener("click", function () {
  const previewCard = document.getElementById("preview-card");

  html2canvas(previewCard, { scale: 2 })
    .then(function (canvas) {
      const imgData = canvas.toDataURL("image/png");

      // Create a new PDF document
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
        hotfixes: [], // Fixes rendering issues
      });

      const imgWidth = 190; // Set image width (adjust as needed)
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save("student_id_card.pdf");
    })
    .catch(function (error) {
      console.error("Error generating PDF:", error);
    });
});
