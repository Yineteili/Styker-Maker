// Get the necessary DOM elements
const uploadButton = document.getElementById('upload-button');
const imageUpload = document.getElementById('image-upload');
const uploadedImage = document.getElementById('uploaded-image');
const cropButton = document.getElementById('crop-button');
const resizeButton = document.getElementById('resize-button');
const filterButton = document.getElementById('filter-button');

// Initialize variables
let isCropping = false;
let startX, startY, initialX, initialY;

// Add event listener to the upload button
uploadButton.addEventListener('click', function() {
  imageUpload.click();
});

// Add event listener to the image upload input
imageUpload.addEventListener('change', function() {
  const file = imageUpload.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      uploadedImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
});

// Add event listeners to the editing tools buttons
cropButton.addEventListener('click', function() {
  // Set cropping functionality
  uploadedImage.style.objectFit = 'none';
  uploadedImage.style.cursor = 'crosshair';
  isCropping = true;
});

resizeButton.addEventListener('click', function() {
  // Set resizing functionality
  uploadedImage.style.objectFit = 'contain';
  uploadedImage.style.cursor = 'grab';
  isCropping = false;
});

filterButton.addEventListener('click', function() {
  // Apply CSS filter effect
  uploadedImage.classList.toggle('active');
});

// Add event listeners for mouse down, move, and up events
uploadedImage.addEventListener('mousedown', function(e) {
  e.preventDefault();

  if (isCropping) {
    startX = e.clientX;
    startY = e.clientY;
    initialX = e.offsetX - startX;
    initialY = e.offsetY - startY;
    uploadedImage.style.clip = 'rect(0px, 0px, 0px, 0px)';
  }
});

uploadedImage.addEventListener('mousemove', function(e) {
  e.preventDefault();

  if (isCropping && (startX || startY)) {
    const currentX = e.clientX;
    const currentY = e.clientY;

    const width = currentX - startX + initialX;
    const height = currentY - startY + initialY;

    uploadedImage.style.clip = `rect(${initialY}px, ${width + initialX}px, ${height + initialY}px, ${initialX}px)`;
  }
});

uploadedImage.addEventListener('mouseup', function(e) {
  e.preventDefault();

  if (isCropping) {
    startX = 0;
    startY = 0;
  }
});
