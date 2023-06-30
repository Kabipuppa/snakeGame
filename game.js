import "./style.scss";
import "reset-css";

const canvas = document.getElementById("game"); //игровое поле
const ctx = canvas.getContext("2d"); //2d context
let box = 25; //1 клетка
let columns = canvas.clientWidth / box;
let rows = canvas.clientHeight / box;
// фон
function drawChess() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      let x = row * box;
      let y = col * box;
      if ((row + col) % 2 === 0) {
        ctx.fillStyle = "#3e3e3e";
      } else {
        ctx.fillStyle = "#272727";
      }
      ctx.fillRect(x, y, box, box);
    }
  }
}
//еда
let food = {
  x: 2 * box,
  y: 2 * box,
};
function drawFood() {
  ctx.fillStyle = "#4cafab";
  ctx.fillRect(food.x, food.y, box, box);
}
//змея
let snake = [{ x: box, y: box }];
// let snake = {
//   x: 5 * box,
//   y: 5 * box,
// };
function drawSnake() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(snake[0].x, snake[0].y, box, box);
}
//клавиши
window.addEventListener("keydown", keyDown);
let xDirection = 0;
let yDirection = 0;

function keyDown(event) {
  //влево
  if (event.keyCode === 37 && xDirection !== box) {
    xDirection = -box;
    yDirection = 0;
  }
  //вверх
  if (event.keyCode === 38 && yDirection !== box) {
    xDirection = 0;
    yDirection = -box;
  }
  //вправо
  if (event.keyCode === 39 && xDirection !== -box) {
    xDirection = box;
    yDirection = 0;
  }
  //вниз
  if (event.keyCode === 40 && yDirection !== -box) {
    xDirection = 0;
    yDirection = box;
  }
}
//движение
function changeSnakePos() {
  snake.x = snake.x + xDirection;
  snake.y = snake.y + yDirection;
  //если вышла за стену
  if (snake.x < 0) {
    snake.x = canvas.clientWidth - box;
  } else if (snake.x >= canvas.clientWidth) {
    snake.x = 0;
  } else if (snake.y < 0) {
    snake.y = canvas.clientHeight - box;
  } else if (snake.y >= canvas.clientHeight) {
    snake.y = 0;
  }
}
//змея съела яблоко
function checkCollision() {
  if (snake.x === food.x && snake.y === food.y) {
    food.x = (Math.floor(Math.random() * 16 - 1) + 1) * box;
    food.y = (Math.floor(Math.random() * 16 - 1) + 1) * box;
  }
}

//игра
function game() {
  drawChess();
  drawSnake();
  changeSnakePos();
  drawFood();

  checkCollision();
}
//запуск игры
setInterval(game, 200);
