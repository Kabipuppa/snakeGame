const CANVAS = document.getElementById("game");
const CTX = CANVAS.getContext("2d");
const BOX_SIZE = 25;
const COLUMNS_COUNT = CANVAS.clientWidth / BOX_SIZE;
const ROWS_COUNT = CANVAS.clientHeight / BOX_SIZE;
const Colors = {
  Odd: "#3e3e3e",
  Even: "#272727",
  SnakeColor: "#fff",
  FoodColor: "#4cafab",
};

export { CANVAS, CTX, BOX_SIZE, COLUMNS_COUNT, ROWS_COUNT, Colors };
