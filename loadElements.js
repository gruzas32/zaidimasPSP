import Game from "./game.js";
import ctx from "./game.js";
import canvas from "./game.js";
import Tank from "./tank.js";
import Bullet from "./bullet.js";
import Brick from "./brick.js";

export function onStartClick() {
  document.getElementById("start-button").addEventListener("click", function () {
    startGame();
    document.getElementById("start-button").style.display = "none";
    document.getElementById("restart-button").style.display = "flex";
  });
}

export function onRestartClick() {
  document.getElementById("restart-button").addEventListener("click", function () {
    startGame();
  });
}

function startGame() {
  const game = new Game();
  game.start();
}





