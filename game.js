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
let snake = [
  { x: 8 * box, y: 5 * box },
  { x: 7 * box, y: 5 * box },
  { x: 6 * box, y: 5 * box },
  { x: 5 * box, y: 5 * box },
];
function drawSnake() {
  ctx.fillStyle = "#fff";
  console.log(snake.length);
  for (let i = 0; snake.length > i; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

//клавиши
window.addEventListener("keydown", keyDown);
let dx = 0;
let dy = 0;

//движение
function moveSnake() {
  dx = box;
  dy = 0;
  const snakeHead = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(snakeHead);
  snake.pop();
  //если вышла за стену
  if (snake[0].x < 0) {
    snake[0].x = canvas.clientWidth - box;
  } else if (snake[0].x >= canvas.clientWidth) {
    snake[0].x = 0;
  } else if (snake[0].y < 0) {
    snake[0].y = canvas.clientHeight - box;
  } else if (snake[0].y >= canvas.clientHeight) {
    snake[0].y = 0;
  }
}

function keyDown(event) {
  //влево
  if (event.keyCode === 37 && dx !== box) {
    dx = -box;
    dy = 0;
  }
  //вверх
  if (event.keyCode === 38 && dy !== box) {
    dx = 0;
    dy = -box;
  }
  //вправо
  if (event.keyCode === 39 && dx !== -box) {
    dx = box;
    dy = 0;
  }
  //вниз
  if (event.keyCode === 40 && dy !== -box) {
    dx = 0;
    dy = box;
  }
}
//змея съела яблоко
function checkCollision() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    food.x = (Math.floor(Math.random() * 16 - 1) + 1) * box;
    food.y = (Math.floor(Math.random() * 16 - 1) + 1) * box;
  }
}

//игра
function game() {
  drawChess();
  drawSnake();
  moveSnake();
  drawFood();
  checkCollision();
}
//запуск игры
setInterval(game, 200);
