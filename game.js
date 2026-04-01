const stage = new Konva.Stage({
    container: 'gameContainer',
    width: 600,
    height: 400
});

const layer = new Konva.Layer();
stage.add(layer);

let velocityY = 1;
const gravity = 0.15;
let score = 0;



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
})

layer.add(player, popcorn, scoreText);

const anim = new Konva.Animation((frame) => {
    velocityY += gravity;
    popcorn.y(popcorn.y() + velocityY);

    const mousePos = stage.getPointerPosition();
    if (mousePos) {
        player.x(mousePos.x - player.width() / 2);
    }

    if (Konva.Util.haveIntersection(popcorn.getClientRect(), player.getClientRect())) {
        score++;
        scoreText.text('Score: ' + score);
        layer.batchDraw();
        resetPopcorn();
    }

    if (popcorn.y() > stage.height()) {
        resetPopcorn();
    }
}, layer);

function resetPopcorn() {
    popcorn.y(-50);
    popcorn.x(Math.random() * stage.width());
    velocityY = 2;
}

anim.start();