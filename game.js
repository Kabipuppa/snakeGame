import "./style.scss";
import "reset-css";
import { KeyCodes } from "./helpers/keys";
import {
  CANVAS,
  BOX_SIZE,
  COLUMNS_COUNT,
  ROWS_COUNT,
  Colors,
  drawCell,
} from "./helpers/const";
let score = 0;
document.getElementById("score").innerHTML = `Счет: ${score}`;
let dx = BOX_SIZE;
let dy = 0;
setupGame(); //запуск игры

function setupGame() {
  setTimeout(function onTick() {
    drawChess();
    drawFood();
    moveSnake();
    drawSnake();

    setupGame();
  }, 1000 / 7);
}

// фон
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

// конец игры
function hasGameEnded() {}

function moveSnake() {
  const snakeHead = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(snakeHead);
  const hasEatFood = snake[0].x === food.x && snake[0].y === food.y;
  if (hasEatFood) {
    score += 1;
    // счет
    document.getElementById("score").innerHTML = `Счет: ${score}`;
    generateFood();
  } else {
    snake.pop();
  }
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

function generateFood() {
  food.x = (Math.floor(Math.random() * 16 - 1) + 1) * BOX_SIZE;
  food.y = (Math.floor(Math.random() * 16 - 1) + 1) * BOX_SIZE;
  //проверка если еда сгенерилась внутри змеи
  snake.forEach((part) => {
    const hasEaten = part.x === food.x && part.y === food.y;
    if (hasEaten) generateFood();
  });
}

//клавиши
window.addEventListener("keydown", keyDown);

function keyDown(event) {
  const isArrowLeftPressed = dx === BOX_SIZE;
  const isArrowUpPressed = dy === BOX_SIZE;
  const isArrowRightPressed = dx === -BOX_SIZE;
  const isArrowDownPressed = dy === -BOX_SIZE;
  //влево
  if (event.keyCode === KeyCodes.LEFT && !isArrowLeftPressed) {
    dx = -BOX_SIZE;
    dy = 0;
  }
  //вверх
  if (event.keyCode === KeyCodes.UP && !isArrowUpPressed) {
    dx = 0;
    dy = -BOX_SIZE;
  }
  //вправо
  if (event.keyCode === KeyCodes.RIGHT && !isArrowRightPressed) {
    dx = BOX_SIZE;
    dy = 0;
  }
  //вниз
  if (event.keyCode === KeyCodes.DOWN && !isArrowDownPressed) {
    dx = 0;
    dy = BOX_SIZE;
  }
}
