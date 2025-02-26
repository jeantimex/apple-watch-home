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

// Variables for tracking mouse position and dragging state
const mouse = {
  x: 0,
  y: 0,
  lastX: 0,
  lastY: 0,
  isDragging: false
};

// Offset for the entire grid (will be updated when dragging)
const offset = {
  x: 0,
  y: 0
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
  
  // Calculate the starting position to center the grid, including the offset from dragging
  const startX = (canvas.width / (window.devicePixelRatio || 1) - gridWidth) / 2 + offset.x;
  const startY = (canvas.height / (window.devicePixelRatio || 1) - gridHeight) / 2 + offset.y;
  
  // Find the middle row (0-indexed)
  const middleRow = Math.floor(config.rows / 2);
  
  // Draw each circle
  for (let row = 0; row < config.rows; row++) {
    // Determine if this row should be shifted (odd rows relative to middle row)
    const isRowShifted = (row % 2) !== (middleRow % 2);
    
    // Calculate the horizontal shift for staggered rows
    const shiftX = isRowShifted ? -config.spacing / 2 : 0;
    
    for (let col = 0; col < config.columns; col++) {
      // Skip drawing extra circles that would appear off-grid in shifted rows
      if (isRowShifted && col === config.columns - 1) {
        continue; // Skip the last column for shifted rows
      }
      
      // Calculate the position of each circle with fixed spacing
      const x = startX + col * config.spacing + shiftX;
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

// Mouse event handlers
function handleMouseDown(e) {
  mouse.isDragging = true;
  
  // Get the mouse position relative to the canvas
  const rect = canvas.getBoundingClientRect();
  mouse.lastX = e.clientX - rect.left;
  mouse.lastY = e.clientY - rect.top;
}

function handleMouseMove(e) {
  if (!mouse.isDragging) return;
  
  // Get the current mouse position
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
  
  // Calculate the distance moved
  const dx = mouse.x - mouse.lastX;
  const dy = mouse.y - mouse.lastY;
  
  // Update the offset
  offset.x += dx;
  offset.y += dy;
  
  // Update the last position
  mouse.lastX = mouse.x;
  mouse.lastY = mouse.y;
  
  // Redraw the circles with the new offset
  drawCircles();
}

function handleMouseUp() {
  mouse.isDragging = false;
}

// Touch event handlers for mobile devices
function handleTouchStart(e) {
  if (e.touches.length === 1) {
    e.preventDefault();
    
    // Get the touch position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    mouse.lastX = e.touches[0].clientX - rect.left;
    mouse.lastY = e.touches[0].clientY - rect.top;
    mouse.isDragging = true;
  }
}

function handleTouchMove(e) {
  if (e.touches.length === 1 && mouse.isDragging) {
    e.preventDefault();
    
    // Get the current touch position
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.touches[0].clientX - rect.left;
    mouse.y = e.touches[0].clientY - rect.top;
    
    // Calculate the distance moved
    const dx = mouse.x - mouse.lastX;
    const dy = mouse.y - mouse.lastY;
    
    // Update the offset
    offset.x += dx;
    offset.y += dy;
    
    // Update the last position
    mouse.lastX = mouse.x;
    mouse.lastY = mouse.y;
    
    // Redraw the circles with the new offset
    drawCircles();
  }
}

function handleTouchEnd() {
  mouse.isDragging = false;
}

// Initial resize
resizeCanvas();

// Add event listeners
window.addEventListener('resize', resizeCanvas);

// Mouse events
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mouseleave', handleMouseUp); // Stop dragging if mouse leaves the canvas

// Touch events
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);
canvas.addEventListener('touchcancel', handleTouchEnd);

console.log('Canvas initialized with staggered grid of red circles with fixed spacing and dragging enabled');
