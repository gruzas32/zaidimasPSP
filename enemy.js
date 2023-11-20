import { canvas } from './game.js';
import Bullet from './bullet.js';
class Enemy {
    constructor(x, y, width, height, speed) {
      this.x = x;
      this.y = y;
      this.prevX = x;
      this.prevY = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
      this.gunBarrel = {
        x: this.x,  
        y: this.y,
        width: 7,
        height: 15,
        speed: 1.2,
        rotation: 0,  
      };



      this.directionX = Math.random() > 0.5 ? 1 : -1;
      this.directionY = Math.random() > 0.5 ? 1 : -1;
      this.randomMovementInterval = 2000;
      this.lastRandomMovementTime = Date.now();



      this.shootInterval = 1500;
      this.lastShootTime = Date.now();
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
          this.speed = .5;
        }
      }
    }

    checkCollisionsWithBase(base)
    {
      if (
        this.x < base.x + base.width &&
        this.x + this.width > base.x &&
        this.y < base.y + base.height &&
        this.y + this.height > base.y
      ) {
        this.x = this.prevX;
        this.y = this.prevY;
        this.speed = 0;
      } else {
        this.speed = .5;
      }
    }
  

    shootAtInterval() {
      const currentTime = Date.now();
      if (currentTime - this.lastShootTime > this.shootInterval) {
        this.lastShootTime = currentTime; 
  
        const bullet = this.shoot();
        return bullet;
      }
      return null;
    }
    

    shoot()
    {
        return new Bullet(this.gunBarrel.x - 3.5, this.gunBarrel.y + 10, 10, this.gunBarrel.width, this.gunBarrel.speed, this.gunBarrel.rotation, this.gunBarrel.rotation, false);
    }

    tryRandomMovement() {
      const currentTime = Date.now();
      if (currentTime - this.lastRandomMovementTime > this.randomMovementInterval) {
        const moveHorizontally = Math.random() > 0.5;
    
        if (moveHorizontally)
         {
          this.directionX = Math.random() > 0.5 ? 1 : -1;
          this.directionY = 0; 
          if (this.directionX === 1)
           {
            this.gunBarrel.rotation = 0;
          } 
          else
           {
            this.gunBarrel.rotation = Math.PI;
          }
        } 
        else 
        {
          this.directionX = 0; 
          this.directionY = Math.random() > 0.5 ? 1 : -1;
                if (this.directionY === 1) 
                {
                     this.gunBarrel.rotation = Math.PI / 2;
                } 
              else 
                {
                     this.gunBarrel.rotation = -Math.PI / 2;
                }        
        }
    
        this.lastRandomMovementTime = currentTime;
      }
    }


    move() {
      this.prevX = this.x;
      this.prevY = this.y;
      const newX = this.x + this.speed * this.directionX;
      const newY = this.y + this.speed * this.directionY;
  
      if (
        newX >= 0 &&
        newX + this.width <= canvas.width &&
        newY >= 0 &&
        newY + this.height <= canvas.height
      ) {
        this.x = newX;
        this.y = newY;
  
        this.gunBarrel.x = this.x + this.width / 2;
        this.gunBarrel.y = this.y;
      }
    }


  
    draw(ctx) {
      ctx.save();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(this.gunBarrel.rotation); 
      ctx.fillStyle = 'red';
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.fillStyle = 'gray';
      ctx.fillRect(-this.gunBarrel.width / 2, -this.gunBarrel.height, this.gunBarrel.width, this.gunBarrel.height);
      ctx.restore();
    }
}
  export default Enemy;
  