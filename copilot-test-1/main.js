// Select canvas and set up context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas dimensions
canvas.width = 800;
canvas.height = 400;

// Player object
const player = {
    x: 50,
    y: 350,
    width: 50,
    height: 50,
    color: "blue",
    velocityY: 0,
    velocityX: 0,
    jumping: false,
};

// Gravity constant
const gravity = 0.5;

// Keys state object
const keys = {
    ArrowRight: false,
    ArrowLeft: false,
};

// Goal object (initial position for Level 1)
const goal = {
    x: 2000, // Goal is far away to make levels longer
    y: 160,
    width: 30,
    height: 30,
    color: "gold",
};

// Levels
const levels = [
    [
        { x: 0, y: 380, width: 2000, height: 20 }, // Long ground platform
        { x: 300, y: 300, width: 100, height: 20 },
        { x: 600, y: 250, width: 100, height: 20 },
        { x: 900, y: 200, width: 100, height: 20 },
        { x: 1500, y: 150, width: 100, height: 20 },
    ],
];
let currentLevel = 0;
let platforms = levels[currentLevel];

// Camera position
let cameraOffsetX = 0;

// Draw player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - cameraOffsetX, player.y, player.width, player.height);
}

// Draw platforms
function drawPlatforms() {
    ctx.fillStyle = "green";
    platforms.forEach(platform => {
        ctx.fillRect(platform.x - cameraOffsetX, platform.y, platform.width, platform.height);
    });
}

// Draw goal
function drawGoal() {
    ctx.fillStyle = goal.color;
    ctx.fillRect(goal.x - cameraOffsetX, goal.y, goal.width, goal.height);
}

// Collision detection for platforms
function checkPlatformCollision() {
    platforms.forEach(platform => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height - player.velocityY < platform.y
        ) {
            player.y = platform.y - 1.155 * player.height; // Place player on top of the platform
            player.jumping = false;
            player.velocityY = 0; // Reset vertical velocity
        }
    });
}

// Transition to the next level
function nextLevel() {
    alert("You finished the level!");
    // Reset to the start (or implement new level logic)
    player.x = 50;
    player.y = 350;
    player.velocityY = 0;
    cameraOffsetX = 0;
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply gravity
    player.velocityY += gravity;
    player.y += player.velocityY;

    // Apply horizontal movement based on keys
    if (keys.ArrowRight) {
        player.velocityX = 5;
    } else if (keys.ArrowLeft) {
        player.velocityX = -5;
    } else {
        player.velocityX = 0;
    }
    player.x += player.velocityX;

    // Prevent player from falling below canvas
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.jumping = false;
    }

    // Prevent player from moving out of bounds
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > 2000) player.x = 2000 - player.width;

    // Camera scrolling logic
    if (player.x > canvas.width / 2 && player.x < 2000 - canvas.width / 2) {
        cameraOffsetX = player.x - canvas.width / 2;
    }

    // Check for platform collisions
    checkPlatformCollision();

    // Check for reaching the goal
    if (
        player.x < goal.x + goal.width &&
        player.x + player.width > goal.x &&
        player.y < goal.y + goal.height &&
        player.y + player.height > goal.y
    ) {
        nextLevel();
    }

    // Draw everything
    drawPlayer();
    drawPlatforms();
    drawGoal();

    requestAnimationFrame(gameLoop);
}

// Event listeners for individual keys
document.addEventListener("keydown", event => {
    if (event.code === "ArrowRight") {
        keys.ArrowRight = true;
    } else if (event.code === "ArrowLeft") {
        keys.ArrowLeft = true;
    } else if (event.code === "Space" && !player.jumping) {
        player.velocityY = -10;
        player.jumping = true;
    }
});

document.addEventListener("keyup", event => {
    if (event.code === "ArrowRight") {
        keys.ArrowRight = false;
    } else if (event.code === "ArrowLeft") {
        keys.ArrowLeft = false;
    }
});

// Start game loop
gameLoop();
