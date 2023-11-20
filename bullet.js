
class Bullet {
    constructor(x, y, width, height, speed, direction, isNotEnemyBullet) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
      this.direction = direction;
      this.isNotEnemyBullet = isNotEnemyBullet;
    }
  

    
    move() {
      this.x += this.speed * Math.sin(this.direction);
      this.y += -(this.speed * Math.cos(this.direction));
    }

    checkCollisionsWithBase(base) {
      if (
        this.x < base.x + base.width &&
        this.x + this.width > base.x &&
        this.y < base.y + base.height &&
        this.y + this.height > base.y
      ) {
        this.remove = true;
        base.lives--;
      }
    }


    checkCollisionsWithEnemies(enemies) {
      for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
  
        if (
          this.x < enemy.x + enemy.width &&
          this.x + this.width > enemy.x &&
          this.y < enemy.y + enemy.height &&
          this.y + this.height > enemy.y && this.isNotEnemyBullet
        ) {
          this.remove = true;
          enemies.splice(i, 1);
          i--;
        }

      }
    }
  


    checkCollisionsWithBricks(bricks, bullets) {
      for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
  
        for (let j = 0; j < bricks.length; j++) {
          const brick = bricks[j];
  
          if (
            bullet.x < brick.x + brick.width &&
            bullet.x + bullet.width > brick.x &&
            bullet.y < brick.y + brick.height &&
            bullet.y + bullet.height > brick.y 
          ) {
            bullets.splice(i, 1);
            i--; 
          }
        }
      }
    }
    

  
    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  

  export default Bullet;
