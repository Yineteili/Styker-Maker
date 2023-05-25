// Get the necessary DOM elements
const uploadButton = document.getElementById('upload-button');
const imageUpload = document.getElementById('image-upload');
const uploadedImage = document.getElementById('uploaded-image');

// Add event listener to the upload button
uploadButton.addEventListener('click', function() {
  // Simulate click on the image upload input
  imageUpload.click();
});

// Add event listener to the image upload input
imageUpload.addEventListener('change', function() {
  // Get the selected file from the input
  const file = imageUpload.files[0];

  // Check if a file was selected
  if (file) {
    // Create a FileReader object
    const reader = new FileReader();

    // Set the image source when the FileReader has finished loading the file
    reader.onload = function(e) {
      uploadedImage.src = e.target.result;
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  }
});
