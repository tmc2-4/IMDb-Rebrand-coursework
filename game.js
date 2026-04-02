
const stage = new Konva.Stage({
    container: 'gameContainer',
    width: 600,
    height: 400
});

const layer = new Konva.Layer();
stage.add(layer);


let score = 0;
let lives = 3;
let velocityY = 1;
const gravity = 0.15;
let gameActive = false;


const player = new Konva.Rect({
    x: 250,
    y: 370,
    width: 100,
    height: 20,
    fill: '#DBA506',
    cornerRadius: 5
});

const popcorn = new Konva.Circle({
    x: Math.random() * stage.width(), 
    y: -50,
    radius: 15,
    fill: '#ffffff',
    stroke: '#333',
    strokeWidth: 2
});

const scoreText = new Konva.Text({
    x: 20,
    y: 20,
    text: 'Score: 0',
    fontSize: 24,
    fontFamily: 'Arial',
    fill: '#DBA506',
});

const livesText = new Konva.Text({
    x: stage.width() - 120,
    y: 20,
    text: 'Lives: 3',
    fontSize: 24,
    fontFamily: 'Arial',
    fill: '#cd0606',
});

const messageText = new Konva.Text({
    x: 0,
    y: stage.height() / 2 - 20,
    width: stage.width(),
    text: 'CLICK TO START',
    fontSize: 30,
    fontFamily: 'Arial',
    fill: '#FFF',
    align: 'center'
});

layer.add(player, popcorn, scoreText, livesText, messageText);

funct

function resetPopcorn() {
    popcorn.y(-50);
    popcorn.x(Math.random() * stage.width());
    velocityY = 2;
}

function startGame() {
    score = 0;
    lives = 3;
    gameActive = true;
    messageText.visible(false);
    scoreText.text('Score: 0');
    livesText.text('Lives: 3');
    resetPopcorn();
    anim.start();
}

function gameOver() {
    gameActive = false;
    anim.stop();
    messageText.text('GAME OVER\nClick to Try Again');
    messageText.visible(true);
    layer.draw();
}


const anim = new Konva.Animation((frame) => {
    if (!gameActive) return false;

    velocityY += gravity;
    popcorn.y(popcorn.y() + velocityY);

    const mousePos = stage.getPointerPosition();
    if (mousePos) {
        player.x(mousePos.x - player.width() / 2);
    }

    if (Konva.Util.haveIntersection(popcorn.getClientRect(), player.getClientRect())) {
        score++;
        scoreText.text('Score: ' + score);
        resetPopcorn();
    }

    if (popcorn.y() > stage.height()) {
        lives--;
        livesText.text('Lives: ' + lives);

        if (lives <= 0) {
            gameOver();
        } else {
            resetPopcorn();
        }
    }
}, layer);


stage.on('click tap', () => {
    if (!gameActive) {
        startGame();
    }
});

layer.draw();