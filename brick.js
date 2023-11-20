 import ctx from "./game.js";
    import canvas from "./game.js";
    import Tank from "./tank.js";
    import Bullet from "./bullet.js";
    
class Brick {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    draw(ctx) {
      ctx.fillStyle = 'gray';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }


    drawBase(ctx)
    {
        ctx.fillStyle = 'violet';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  
export default Brick;