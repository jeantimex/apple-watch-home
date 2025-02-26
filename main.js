// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Configuration for the grid
const config = {
  rows: 7,
  columns: 7,
  radius: 100, // Increased radius but smaller than half the spacing
  color: '#FF0000', // Fixed red color for all circles
  spacing: 250 // Fixed spacing between circles in pixels
};

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
  
  // Draw the circles
  drawCircles();
}

// Function to draw circles in a grid
function drawCircles() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Calculate the total width and height of the grid with fixed spacing
  const gridWidth = (config.columns - 1) * config.spacing;
  const gridHeight = (config.rows - 1) * config.spacing;
  
  // Calculate the starting position to center the grid
  const startX = (canvas.width / (window.devicePixelRatio || 1) - gridWidth) / 2;
  const startY = (canvas.height / (window.devicePixelRatio || 1) - gridHeight) / 2;
  
  // Draw each circle
  for (let row = 0; row < config.rows; row++) {
    for (let col = 0; col < config.columns; col++) {
      // Calculate the position of each circle with fixed spacing
      const x = startX + col * config.spacing;
      const y = startY + row * config.spacing;
      
      // Draw the circle
      ctx.beginPath();
      ctx.arc(x, y, config.radius, 0, Math.PI * 2);
      ctx.fillStyle = config.color;
      ctx.fill();
      ctx.closePath();
    }
  }
}

// Initial resize
resizeCanvas();

// Add event listener for window resize
window.addEventListener('resize', resizeCanvas);

console.log('Canvas initialized with 6x6 grid of red circles with fixed spacing');
