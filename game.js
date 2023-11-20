import Tank from './tank.js';
import Bullet from './bullet.js';
import debounce from './debounce.js';
import Brick from './brick.js';
import Enemy from './enemy.js';
import Base from './base.js';
import {updateBaseLives} from './base.js';


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

class Game {
  constructor() {
    this.tank = new Tank(60, canvas.height - 20, 20, 20, 10);
    this.bullets = [];
    this.enemyBullets = [];
    this.bricks = [];
    this.enemies = [];
    this.debouncedShoot = debounce(this.handleShoot.bind(this), 1000); 

    this.base = new Base(0, canvas.height - 50, 50, 50);
  }




  update() {
    this.tank.checkCollisionsWithBricks(this.bricks);
    this.tank.move();
    this.bullets.forEach(bullet => bullet.move());
  
    // Bullet deletas
    this.bullets.forEach(bullet => bullet.checkCollisionsWithBricks(this.bricks, this.bullets));
    this.bullets = this.bullets.filter(bullet => bullet.y > 0);
  
    // Boundary controlas
    this.tank.x = Math.min(Math.max(this.tank.x, 0), canvas.width - this.tank.width);
    this.tank.y = Math.min(Math.max(this.tank.y, 0), canvas.height - this.tank.height);
  
    // kulku filtravimas ir salinimas
    this.bullets = this.bullets.filter(bullet => !bullet.remove);
  
    this.enemyBullets.forEach(bullet => bullet.checkCollisionsWithBase(this.base));
  
    updateBaseLives(this.base.getLives());
    this.checkIfGameOver();
    this.checkIfWin();
    this.updateEnemies();
  
    // Check collisions tarp tank bullet ir enemy


    this.bullets.forEach(bullet => bullet.checkCollisionsWithEnemies(this.enemies));


  }

  updateEnemies() {
    this.enemies.forEach((enemy) => {
      enemy.checkCollisionsWithBricks(this.bricks);
      enemy.tryRandomMovement();
      enemy.move();
      enemy.checkCollisionsWithBase(this.base);
  
      const bullet = enemy.shootAtInterval();
      if (bullet) {
        this.enemyBullets.push(bullet); 
      }
    });
  
    this.enemies.forEach((enemy) => {
      const bullet = enemy.shootAtInterval();
      if (bullet) {
        this.enemyBullets.push(bullet);
      }
    });
  
    this.enemyBullets.forEach((bullet) => {
      bullet.move();
      bullet.checkCollisionsWithBricks(this.bricks, this.enemyBullets);
      bullet.checkCollisionsWithBase(this.base);
    });
  
    this.enemyBullets = this.enemyBullets.filter((bullet) => !bullet.remove);
  }
  

  checkIfGameOver() {
    if(this.base.lives === 0)
    {
      alert("Game Over");
      window.location.reload();
    }
  }

  checkIfWin()
  {
    if(this.enemies.length === 0)
    {
      alert("You Win!");
      window.location.reload();
    }

  }

 


  spawnMap() {
    const map = [
      ['', '', '', '', '', '', '', '', '', ''],
      ['', 1, '', '', '', '', '', 1, 1, ''],
      ['', 1, 1, 1, '', 1, '', 1, '', ''],
      ['', 1, '', '', '', 1, '', '', '', ''],
      ['', 1, '', '', '', '', '', 1, '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', 1, 1, 1, 1, '', '', '', '', ''],
      ['', '', 1, '', '', '', '', 1, '', ''],
      ['', '', 1, '', 1, 1, '', 1, 1, ''],
      ['', '', , , 1, 1, '', '', '', ''],
      [2, 2, '', '', '', 1, '', 1, '', ''],
      [2, 2, '', '', '', '', '', 1, '', ''],
    ];
    
    const brickWidth = canvas.width / map[0].length;
    const brickHeight = canvas.height / map.length;
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === 1) {
          const brick = new Brick(j * brickWidth, i * brickHeight, brickWidth, brickHeight);
          this.bricks.push(brick);
        }
      }
    }
  }



  draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.tank.draw(ctx);
    this.bullets.forEach(bullet => bullet.draw(ctx));
    this.enemyBullets.forEach(bullet => bullet.draw(ctx));
    ctx.fillStyle = 'blue';
    this.bricks.forEach(brick => brick.draw(ctx));
    this.enemies.forEach(enemy => enemy.draw(ctx));
    this.base.draw(ctx);

  }



  handleKeyPress(e) {
    if(e.key === ' ')
    {
        this.debouncedShoot();
    }

    else{
    this.tank.move(e.key);
}
  }



  handleShoot() {
    const bullet = this.tank.shoot();
    if (bullet) {
      this.bullets.push(bullet);
    }
  }



  start() {
    this.spawnMap();
    updateBaseLives(this.base.getLives());
    const enemy = new Enemy(50, canvas.height - 50, 20, 20, .5);
    const enemy2 = new Enemy(canvas.width / 1.1, canvas.height * .7, 20, 20, .5);
    const enemy3 = new Enemy(canvas.width / 1.2, canvas.height * .03, 20, 20, .5);
    this.enemies.push(enemy3);
    this.enemies.push(enemy2);
    this.enemies.push(enemy);
    

    
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    this.gameLoop();
  }

  

  gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }
}


export default Game;
export {canvas};
