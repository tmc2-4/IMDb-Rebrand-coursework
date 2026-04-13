const popcornImg = new Image();
popcornImg.src = 'popcorn.png';

const bucketImg = new Image();
bucketImg.src = 'bucket.png';

bucketImg.onload = () => gameLayer.draw();
popcornImg.onload = () => gameLayer.draw();

const stage = new Konva.Stage({
    container: 'gameContainer',
    width: 600,
    height: 400
});

const gameLayer = new Konva.Layer();
stage.add(gameLayer);

let score = 0;
let lives = 3;
let gravity = 0.08;
let velocityY = 1;
let gameRunning = false;

let highScore = localStorage.getItem('popcornBest') || 0;

const scoreLabel = new Konva.Text({
    x: 20,
    y: 20,
    text: 'Popcorn: 0',
    fontSize: 20,
    fontFamily: 'Arial',
    fill: '#DBA506'
});

const highScoreLabel = new Konva.Text({
    x: 20,
    y: 45,
    text: 'Best: ' + highScore,
    fontSize: 16,
    fontFamily: 'Arial',
    fill: '#eacb6d'
});

const livesLabel = new Konva.Text({
    x: stage.width() - 100,
    y: 20,
    text: 'Lives: 3',
    fontSize: 18,
    fontFamily: 'Arial',
    fill: '#ff3e3e'
});

const startText = new Konva.Text({
    x: stage.width() / 2 - 100,
    y: stage.height() / 2 - 20,
    text: 'CLICK TO START',
    fontSize: 25,
    fontFamily: 'Arial', 
    fill: '#DBA506',
    fontStyle: 'bold'
});

const gameOverText = new Konva.Text({
    x: stage.width() / 2 - 80,
    y: stage.height() / 2 - 20,
    text: 'GAME OVER',
    fontSize: 30,
    fontFamily: 'Arial',
    fill: 'white',
    visible: false
});

gameLayer.add(scoreLabel, highScoreLabel, livesLabel, startText, gameOverText);

const player = new Konva.Image({
    x: 250,
    y: 340,
    image: bucketImg,
    width: 80,
    height: 60,
    visible: false
});

const item = new Konva.Image({
    x: Math.random() * stage.width(),
    y: -50,
    image: popcornImg,
    width: 40,
    height: 40,
    visible: false   
});

gameLayer.add(player, item);

function resetItem() {
    item.y(-50);
    item.x(Math.random() * (stage.width() - 40) + 20);
    velocityY = Math.random() * 1.0 + 0.5;
    gravity = Math.random() * 0.1 + 0.05;
}

function startGame() {
    score = 0;
    lives = 3;
    scoreLabel.text("Popcorn: 0");
    livesLabel.text("Lives: 3");

    startText.visible(false);
    gameOverText.visible(false);
    player.visible(true);
    item.visible(true);

    resetItem();
    anim.start();
    gameRunning = true;
}

stage.on('click tap', () => {
    if (!gameRunning) {
        startGame();
    }
});

const anim = new Konva.Animation((frame) => {
    velocityY += gravity;
    item.y(item.y() + velocityY); 

    const amplitude = 2;
    const frequency = 0.005;

    item.x(item.x() + Math.sin(frame.time * frequency) * amplitude);

    if (item.x() < 0) {
        item.x(0);
    } else if (item.x() > stage.width() - item.width()) {
        item.x(stage.width() - item.width());
    }
    
    const mousePos = stage.getPointerPosition();
    if (mousePos) {
        player.x(mousePos.x - player.width() / 2);
    }

    const itemRect = item.getClientRect();
    const playerRect = player.getClientRect();
    
    if (Konva.Util.haveIntersection(itemRect, playerRect)) {
        score++;
        scoreLabel.text("Popcorn: " + score);
        resetItem();
    }

    if (item.y() > stage.height()) {
        lives--;
        livesLabel.text("Lives: " + lives);

        if (lives <= 0){
            anim.stop();
            gameOverText.visible(true);
            item.visible(false);
            gameRunning = false;

            if (score > highScore) {
                highScore = score;
                localStorage.setItem('popcornBest', highScore);
                highScoreLabel.text("Best: " + highScore);
            }
        } else {
            resetItem();
        }
    }
}, gameLayer);

gameLayer.draw();