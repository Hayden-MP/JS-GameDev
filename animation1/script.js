// Player state is controlled by the div element in index.html
let playerState = 'idle'; // The current animation that is playing
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
});// This all allows us to choose the state via dropdown menu


const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const playerImage = new Image(); // Creates HTML image element
playerImage.src = 'shadow_dog.png';

const spriteWidth = 575; // Because image is 6876px wide / 12 cols
const spriteHeight = 523; // height is 5230 / 10 rows = 523


let gameFrame = 0; // Counts the number of frames in animation
const staggerFrames = 4; // Controls how fast our animation plays (higher num = slower animation)
const spriteAnimations = []; // Used as a container to contain all animations (x and y coords)
const animationStates = [
    {
        name: 'idle',
        frames: 7, // idle animation has 7 frames
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
]; // Creates simply map that will match spitesheet (row by row, top to bottom)

// This below snippet will map the animations in animationsStates and fill spriteAnimations
// with the proper x,y coords for each animation
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for(let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});
console.log("Sprite animations: ", spriteAnimations); // Just to see the resulting map of x,y coords to animation states


function animate() {
    // First clear old paint from canvas for every animation frame
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Expects four args

    // This below statement is cycling through the spritesheet horizontally, it 
    // the math.floor operation will always be 0 except when gameframe = staggerframes
    // and it is divided by the number of frames that the specific animation has
    // per row.. i.e, the first animation has 7 frames (0 thru 6)
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length; 
    
    // Moves the frame horizontally to next frame on spritesheet
    let frameX = spriteWidth * position; 
    let frameY = spriteAnimations[playerState].loc[position].y;
    // ctx.drawImage(image, (source)x, sy, sw, sh, (destination)x, dy, dw, dh)
    //      the first four s args are cropping the image to specific dimensions
    //      the last four d args are saying where to place that cropped image 
    //      on the canvas
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 
        0, 0, spriteWidth, spriteHeight);
    
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();

