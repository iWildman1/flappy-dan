// === TYPES ===

type Pipe = { x: number; topPipeHeight: number; bottomPipeY: number; width: number };

type GameState = 'START' | 'RUNNING' | 'OVER';

// === GLOBALS ===

let gameState: GameState = 'RUNNING';

// === GAME ENVIRONMENT SETUP ===

// Get the canvas and the context
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 480;
canvas.height = 640;

// Configure the canvas for high-DPI screens
const scale = window.devicePixelRatio;
canvas.width = 480 * scale;
canvas.height = 640 * scale;
canvas.style.width = '480px';
canvas.style.height = '640px';
ctx?.scale(scale, scale);

// Draw a basic rectangle in the canvas just to prove that it's working

ctx!.fillStyle = "blue";
ctx!.fillRect(50, 50, 100, 100);




// === BIRD CHARACTER ===

let bird = {
    x: 100,
    y: 300,
    width: 30,
    height: 30,
    velocity: 0,
    jumpStrength: -300
}

const gravity = 500;

function handleBirdInput() {
    bird.velocity = bird.jumpStrength;
}

// Event listeners for user input

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        handleBirdInput();
    }
})

document.addEventListener("mousedown", handleBirdInput);



// === PIPES ===

const pipeWidth = 60;
const pipeSpeed = 200;
const pipeGapHeight = 150;
const pipeSpawnInterval = 2000; // New pipe every 2 seconds

let pipeSpawnTimer = 0;

let pipes: Pipe[] = [];

function spawnPipes() {
    const topPipeHeight = Math.random() * (canvas.height - pipeGapHeight - 100) + 50;
    const bottomPipeY = topPipeHeight + pipeGapHeight;

    pipes.push({
        x: canvas.width,
        topPipeHeight,
        bottomPipeY,
        width: pipeWidth
    })
}

function updatePipes(deltaTime: number) {
    const deltaSeconds = deltaTime / 1000;

    // Moves pipes to the left
    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed * deltaSeconds;
    });

    // Remove the pipes once they're off the screen
    pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

function drawPipes() {
    pipes.forEach(pipe => {
        ctx!.fillStyle = "green";

        // Draw top pipe
        ctx?.fillRect(pipe.x, 0, pipe.width, pipe.topPipeHeight);

        // Draw bottom pipe
        ctx?.fillRect(pipe.x, pipe.bottomPipeY, pipe.width, canvas.height - pipe.bottomPipeY)
    })
}

function updatePipeSpawning(deltaTime: number) {
    pipeSpawnTimer += deltaTime;

    if (pipeSpawnTimer >= pipeSpawnInterval) {
        spawnPipes();
        pipeSpawnTimer = 0;
    }
}


// === COLLISION DETECTION ===

function checkPipeCollision() {
    for (let pipe of pipes) {
        // Top pipe collision
        if (bird.x < pipe.x + pipe.width && bird.x + bird.width > pipe.x && bird.y < pipe.topPipeHeight) {
            return true;
        }

        // Bottom pipe collision
        if (bird.x < pipe.x + pipe.width && bird.x + bird.width > pipe.x && bird.y + bird.height > pipe.bottomPipeY) {
            return true;
        }
    }

    return false;
}

function checkBoundaryCollision() {
    return bird.y === canvas.height - bird.height;
}

function checkForCollisions() {
    if (checkPipeCollision() || checkBoundaryCollision()) {
        gameState = 'OVER';
    }
}


// === GAME OVER ===

function drawGameOver() {
    if (gameState === 'OVER') {
        ctx!.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx!.fillRect(0, 0, canvas.width, canvas.height);

        ctx!.fillStyle = "white";
        ctx!.font = "40px Arial";
        ctx!.textAlign = "center";
        ctx!.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    }
}

// === GAME LOOP ===

let lastTickTime = 0;

let fps;
let lastFpsUpdate = 0;
let frameCount = 0;

// Update the game state on each tick
function update(deltaTime: number) {

    if (gameState === 'RUNNING') {
        const deltaSeconds = deltaTime / 1000;

        // Apply gravity to the bird
        bird.velocity += gravity * deltaSeconds;

        // Update the bird position
        bird.y += bird.velocity * deltaSeconds;

        // Prevent the bird from falling below the canvas
        if (bird.y > canvas.height - bird.height) {
            bird.y = canvas.height - bird.height;
            bird.velocity = 0;
        }

        // Update the pipe positions
        updatePipes(deltaTime);

        // Create new pipes
        updatePipeSpawning(deltaTime);

        // Check for collisions
        checkForCollisions();
    }

}

// Render state changes to the canvas on each tick
function draw() {
    // Clear the canvas
    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    // Drawing logic placeholder
    ctx!.fillStyle = "#70c5ce";
    ctx!.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the bird
    ctx!.fillStyle = "red";
    ctx!.fillRect(bird.x, bird.y, bird.width, bird.height);

    // Draw the pipes
    drawPipes();

    // Draw the end screen
    drawGameOver();
}

// Game loop
function loop(timestamp: number) {
    if (gameState === 'RUNNING') {
        const deltaTime = timestamp - lastTickTime;
        lastTickTime = timestamp;

        update(deltaTime); // Update the game logic
        draw(); // Render the updates

        // Calculate FPS
        frameCount++;
        if (timestamp - lastFpsUpdate >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastFpsUpdate = timestamp;
            console.log(`FPS: ${fps}`);
        }

        requestAnimationFrame(loop); // Schedule the next game tick
    }
}

// Initialise the game
requestAnimationFrame(loop)