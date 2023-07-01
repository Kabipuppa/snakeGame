import './style.scss';
import 'reset-css';
export let dx = 0;
export let dy = 0;
import { KeyCodes } from './helpers/keys';
import {
  CANVAS,
  CTX,
  BOX_SIZE,
  COLUMNS_COUNT,
  ROWS_COUNT,
  Colors,
} from './helpers/const';

// фон
function drawChess() {
  for (let row = 0; row < ROWS_COUNT; row++) {
    for (let col = 0; col < COLUMNS_COUNT; col++) {
      let x = row * BOX_SIZE;
      let y = col * BOX_SIZE;
      CTX.fillStyle = (row + col) % 2 === 0 ? Colors.Odd : Colors.Even;
      CTX.fillRect(x, y, BOX_SIZE, BOX_SIZE);
    }
  }
}

//еда
let food = {
  x: 2 * BOX_SIZE,
  y: 2 * BOX_SIZE,
};
function drawFood() {
  CTX.fillStyle = Colors.FoodColor;
  CTX.fillRect(food.x, food.y, BOX_SIZE, BOX_SIZE);
}

//змея
let snake = [
  { x: 8 * BOX_SIZE, y: 5 * BOX_SIZE },
  { x: 7 * BOX_SIZE, y: 5 * BOX_SIZE },
  { x: 6 * BOX_SIZE, y: 5 * BOX_SIZE },
  { x: 5 * BOX_SIZE, y: 5 * BOX_SIZE },
];
function drawSnake() {
  CTX.fillStyle = Colors.SnakeColor;
  for (let i = 0; snake.length > i; i++) {
    CTX.fillRect(snake[i].x, snake[i].y, BOX_SIZE, BOX_SIZE);
  }
}

//клавиши
window.addEventListener('keydown', keyDown);

//движение
function moveSnake() {
  const snakeHead = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(snakeHead);
  snake.pop();
  //если вышла за стену
  if (snake[0].x < 0) {
    snake[0].x = CANVAS.clientWidth - BOX_SIZE;
  } else if (snake[0].x >= CANVAS.clientWidth) {
    snake[0].x = 0;
  } else if (snake[0].y < 0) {
    snake[0].y = CANVAS.clientHeight - BOX_SIZE;
  } else if (snake[0].y >= CANVAS.clientHeight) {
    snake[0].y = 0;
  }
}

function keyDown(event) {
  const ArrowLeft = dx === BOX_SIZE;
  const ArrowUp = dy === BOX_SIZE;
  const ArrowRight = dx === -BOX_SIZE;
  const ArrowDown = dy === -BOX_SIZE;
  //влево
  if (event.keyCode === KeyCodes.LEFT && !ArrowLeft) {
    dx = -BOX_SIZE;
    dy = 0;
  }
  //вверх
  if (event.keyCode === KeyCodes.UP && !ArrowUp) {
    dx = 0;
    dy = -BOX_SIZE;
  }
  //вправо
  if (event.keyCode === KeyCodes.RIGHT && !ArrowRight) {
    dx = BOX_SIZE;
    dy = 0;
  }
  //вниз
  if (event.keyCode === KeyCodes.DOWN && !ArrowDown) {
    dx = 0;
    dy = BOX_SIZE;
  }
}
drawFood();
//змея съела яблоко
function checkCollision() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    food.x = (Math.floor(Math.random() * 16 - 1) + 1) * BOX_SIZE;
    food.y = (Math.floor(Math.random() * 16 - 1) + 1) * BOX_SIZE;
    setTimeout(drawFood(), 1000);
  }
}

//игра
function game() {
  drawChess();
  drawSnake();
  moveSnake();
  checkCollision();
}
//запуск игры
setInterval(game, 200);
