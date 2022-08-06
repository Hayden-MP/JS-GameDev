// ******  Canvas setup ******
const canvas = document.getElementById('canvas1');

// Below creates instance of built-in canvas 2d api object
//  which contains all the drawing methods that we use
const ctx = canvas.getContext('2d'); 

// Must set width/height scaling otherwise it defaults to 300x150 px
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
// ******  Canvas setup complete ******

// Game speed is a dynamic variable for scrolling speed - changes with 
//  player actions 
let gameSpeed = 5;
const backgroundLayer1 = new Image();
backgroundLayer1.src = 'layer-1.png'
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'layer-2.png'
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png'
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-4.png'
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png'

let x = 0;      // X position of first background image
let x2 = 2400; // X position of second background image

function animate() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

    // ctx.drawImage() Takes image and draws on canvas
    ctx.drawImage(backgroundLayer4,x,0); // First background image
    ctx.drawImage(backgroundLayer4,x2,0);   // second background image
    if ( x < -2400 ) x = 2400;
    else x -= gameSpeed; // Moves image to left (-) by gameSpeed amount
    if ( x2 < -2400 ) x2 = 2400;
    else x2 -= gameSpeed;
    
   
    
    requestAnimationFrame(animate);
};
animate();