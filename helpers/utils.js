import { BOX_SIZE, CTX } from "./const";
const drawCell = (x, y, color) => {
  CTX.fillStyle = color;
  CTX.fillRect(x, y, BOX_SIZE, BOX_SIZE);
};
const setScore = (value) => {
  let message = document.getElementById("score");
  message.textContent = `Счет: ${value}`;
};

export { drawCell, setScore };
