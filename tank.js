import Bullet from './bullet.js';
import Brick from './brick.js';
import Game from './game.js';
class Tank {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.gunBarrel = {
      x: this.x + this.width / 2,  
      y: this.y,
      width: 7,
      height: 20,
      speed: 1.2,
      rotation: 0,  
    };
  }

  shoot() {
    return new Bullet(this.gunBarrel.x - 3.5, this.gunBarrel.y, 10, this.gunBarrel.width, this.gunBarrel.speed, this.gunBarrel.rotation, this.gunBarrel.rotation, true);
  }


  checkCollisionsWithBricks(bricks) {
    for (let i = 0; i < bricks.length; i++) {
      const brick = bricks[i];
  
      if (
        this.x < brick.x + brick.width &&
        this.x + this.width > brick.x &&
        this.y < brick.y + brick.height &&
        this.y + this.height > brick.y
      ) {
        this.x = this.prevX;
        this.y = this.prevY;
        this.speed = 0;
      } else {
        this.speed = 5;
      }
    }
  }
  

  move(direction) {
    this.prevX = this.x;
    this.prevY = this.y;
    if (direction === 'ArrowUp') 
    {
      this.y -= this.speed;
      this.gunBarrel.y = this.y + this.height / 2;
      this.gunBarrel.rotation = 0;
    } 

    else if (direction === 'ArrowDown') 
    {
      this.y += this.speed;
      this.gunBarrel.y = this.y + this.height / 2;
      this.gunBarrel.rotation = Math.PI;
    }

    else if (direction === 'ArrowLeft') 
    {
      this.x -= this.speed;
      this.gunBarrel.x = this.x + this.width / 2;
      this.gunBarrel.rotation = -Math.PI / 2;
    }  
    else if (direction === 'ArrowRight') 
    {
      this.x += this.speed;
      this.gunBarrel.x = this.x + this.width / 2;
      this.gunBarrel.rotation = Math.PI / 2;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.gunBarrel.x, this.gunBarrel.y);
    ctx.rotate(this.gunBarrel.rotation);
    ctx.fillStyle = 'green';
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fillStyle = 'gray';
    ctx.fillRect(-this.gunBarrel.width / 2, -this.gunBarrel.height, this.gunBarrel.width, this.gunBarrel.height);
    ctx.restore();
  }
}

export default Tank;
