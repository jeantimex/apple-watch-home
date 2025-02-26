// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Function to resize canvas
function resizeCanvas() {
  // Get the device pixel ratio
  const dpr = window.devicePixelRatio || 1;
  
  // Get the size of the canvas in CSS pixels
  const rect = canvas.getBoundingClientRect();
  
  // Set the canvas width and height with the device pixel ratio
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  
  // Scale the context to ensure correct drawing operations
  ctx.scale(dpr, dpr);
  
  // Draw the text
  drawText();
}

// Function to draw text in the center of the canvas
function drawText() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Set text properties
  ctx.font = '32px Arial';
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Get the center of the canvas (in CSS pixels)
  const centerX = canvas.width / (2 * (window.devicePixelRatio || 1));
  const centerY = canvas.height / (2 * (window.devicePixelRatio || 1));
  
  // Draw the text
  ctx.fillText('Hello World', centerX, centerY);
}

// Initial resize
resizeCanvas();

// Add event listener for window resize
window.addEventListener('resize', resizeCanvas);

console.log('Canvas initialized');
