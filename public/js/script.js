/* eslint-disable no-undef */
let ball,
  cursors,
  opponent,
  player,
  scoreOpponent,
  scorePlayer,
  scoreTextOpponent,
  scoreTextPlayer,
  velocity;

const config = {
  height: 400,
  physics: {
    default: 'arcade',
  },
  scene: {
    preload: preloadGame,
    create: createGame,
    update: updateGame,
  },
  type: Phaser.AUTO,
  width: 800,
};

function hitOpponent(ball, player) {
  velocity.x = velocity.x - 50;
  velocity.x = velocity.x * -1;
  console.log(velocity.x);

  ball.setVelocityX(velocity.x);

  if (velocity.y < 0) {
    velocity.y = velocity.y * -1;
    ball.setVelocityY(velocity.y);
  }
  player.setVelocityX(1);
}
function hitPlayer(ball, player) {
  velocity.x = velocity.x + 50;
  velocity.x = velocity.x * -1;
  console.log(velocity.x);

  ball.setVelocityX(velocity.x);

  if (velocity.y < 0) {
    velocity.y = velocity.y * -1;
    ball.setVelocityY(velocity.y);
  }
  player.setVelocityX(-1);
}
function reset() {
  velocity.x = Phaser.Math.Between(-100, 100);
  velocity.y = 100;
  opponent.x = 20;
  opponent.y = 200;
  player.x = 780;
  player.y = 200;
  ball.x = 400;
  ball.y = 200;
  ball.setVelocityX(velocity.x);
  ball.setVelocityY(velocity.y);
}
function preloadGame() {
  this.load.image('ball', '/assets/ball.png');
  this.load.image('ground', '/assets/ground.png');
  this.load.image('opponent', '/assets/opponent.png');
  this.load.image('player', '/assets/player.png');
}
function createGame() {
  cursors = this.input.keyboard.createCursorKeys();

  this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

  this.add.image(400, 200, 'ground');

  opponent = this.physics.add.sprite(20, 200, 'opponent');
  opponent.setCollideWorldBounds(true);

  player = this.physics.add.sprite(780, 200, 'player');
  player.setCollideWorldBounds(true);

  ball = this.physics.add.sprite(400, 200, 'ball');

  ball.setCollideWorldBounds(true);
  ball.setBounce(1);

  velocity = {
    x: Phaser.Math.Between(-100, 100),
    y: 100,
  };

  ball.setVelocityX(velocity.x);
  ball.setVelocityY(velocity.y);

  this.physics.add.collider(ball, player, hitPlayer, null, this);
  this.physics.add.collider(ball, opponent, hitOpponent, null, this);

  scoreOpponent = 0;
  scorePlayer = 0;
  scoreTextOpponent = this.add.text(16, 16, `score: ${scoreOpponent}`, {
    fontSize: '16px',
    fill: '#F00',
  });
  scoreTextPlayer = this.add.text(700, 16, `score: ${scorePlayer}`, {
    fontSize: '16px',
    fill: '#00F',
  });
}
function updateGame() {
  opponent.setVelocityY(0);
  if (this.keyW.isDown) opponent.setVelocityY(-150);
  if (this.keyS.isDown) opponent.setVelocityY(150);

  player.setVelocityY(0);
  if (cursors.up.isDown) player.setVelocityY(-150);
  if (cursors.down.isDown) player.setVelocityY(150);

  if (ball.x > 795) {
    scoreOpponent += 1;
    scoreTextOpponent.setText(`score: ${scoreOpponent}`);
    reset();
  }
  if (ball.x < 5) {
    scorePlayer += 1;
    scoreTextPlayer.setText(`score: ${scorePlayer}`);
    reset();
  }
}

new Phaser.Game(config);
