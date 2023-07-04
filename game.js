import "./style.scss";
import "reset-css";
import { KeyCodes } from "./helpers/keys";
import {
  CANVAS,
  BOX_SIZE,
  COLUMNS_COUNT,
  ROWS_COUNT,
  Colors,
} from "./helpers/const";
import { drawCell, setScore } from "./helpers/utils";
let score = 0;
let dx = BOX_SIZE;
let dy = 0;

setInterval(setupGame, 200); //запуск игры
setScore(score);

function setupGame() {
  if (hasGameEnded()) {
    return alert(`конец игры! Счет: ${score}`);
  }

  drawChess();
  drawFood();
  moveSnake();
  drawSnake();
}

// фонs
function drawChess() {
  for (let row = 0; row < ROWS_COUNT; row++) {
    for (let col = 0; col < COLUMNS_COUNT; col++) {
      let x = row * BOX_SIZE;
      let y = col * BOX_SIZE;
      let colorChess = (row + col) % 2 === 0 ? Colors.Odd : Colors.Even;
      drawCell(x, y, colorChess);
    }
  }
}

//еда
let food = {
  x: 2 * BOX_SIZE,
  y: 2 * BOX_SIZE,
};
function drawFood() {
  drawCell(food.x, food.y, Colors.FoodColor);
}

//змея
let initalSnake = [
  { x: 5 * BOX_SIZE, y: 5 * BOX_SIZE },
  { x: 4 * BOX_SIZE, y: 5 * BOX_SIZE },
  { x: 3 * BOX_SIZE, y: 5 * BOX_SIZE },
  { x: 2 * BOX_SIZE, y: 5 * BOX_SIZE },
];

let snake = [...initalSnake];

function drawSnake() {
  snake.forEach((part) => {
    drawCell(part.x, part.y, Colors.SnakeColor);
  });
}

function moveSnake() {
  const snakeHead = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(snakeHead);
  const hasEatFood = snake[0].x === food.x && snake[0].y === food.y;
  // съела еду
  if (hasEatFood) {
    score += 1;
    setScore(score);
    generateFood();
  } else {
    snake.pop();
  }
  // вышла за стену
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

function generateFood() {
  food.x = (Math.floor(Math.random() * 16 - 1) + 1) * BOX_SIZE;
  food.y = (Math.floor(Math.random() * 16 - 1) + 1) * BOX_SIZE;
  //еда сгенерилась внутри змеи
  const hasEaten = snake.some(({ x, y }) => x === food.x && y === food.y);
  if (hasEaten) generateFood();
}

//стрелки(направление)
window.addEventListener("keydown", keyDown);

function keyDown(event) {
  const isArrowLeftPressed = dx === BOX_SIZE;
  const isArrowUpPressed = dy === BOX_SIZE;
  const isArrowRightPressed = dx === -BOX_SIZE;
  const isArrowDownPressed = dy === -BOX_SIZE;
  if (event.keyCode === KeyCodes.LEFT && !isArrowLeftPressed) {
    dx = -BOX_SIZE;
    dy = 0;
  }
  if (event.keyCode === KeyCodes.UP && !isArrowUpPressed) {
    dx = 0;
    dy = -BOX_SIZE;
  }
  if (event.keyCode === KeyCodes.RIGHT && !isArrowRightPressed) {
    dx = BOX_SIZE;
    dy = 0;
  }
  if (event.keyCode === KeyCodes.DOWN && !isArrowDownPressed) {
    dx = 0;
    dy = BOX_SIZE;
  }
}

// конец игры
function hasGameEnded() {
  for (let i = 1; i < snake.length; i++) {
    const hasBodyCollided =
      snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (hasBodyCollided) return true;
  }
}
