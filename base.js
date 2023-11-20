import ctx from "./game.js";
const baseHPElement = document.getElementById("baseHP");
import canvas from "./game.js";


class Base {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.lives = 3;
    }


    getBase()
    {
        return this;
    }

    getLives() {
        return this.lives;
    }

    draw(ctx)
    {
        ctx.fillStyle = 'violet';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    
    }
    
}

function updateBaseLives(lives) {
    baseHPElement.textContent = `HP: ${lives}`;
  }

 
export default Base;

export {updateBaseLives};