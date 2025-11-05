import { MiniMaple } from "./miniMaple.js";

document.addEventListener("DOMContentLoaded", () => {
  const expr = document.getElementById("expr");
  const variable = document.getElementById("var");
  const result = document.getElementById("result");
  const button = document.getElementById("run");

  button.onclick = () => {
    try {
      const derivative = MiniMaple.symbolicDiff(expr.value, variable.value);
      result.textContent = `Результат: ${derivative}`;
      result.style.color = "black";
    } catch (e) {
      result.textContent = `Ошибка: ${e.message}`;
      result.style.color = "red";
    }
  };
});
