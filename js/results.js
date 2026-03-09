document.addEventListener("DOMContentLoaded", () => {
  const scoreEL = document.getElementById("score");
  const playAgainEl = document.getElementById("play-again");

  const score = localStorage.getItem("score");

  scoreEL.textContent = `${score}/10`;

  playAgainEl.addEventListener("click", () => {
    localStorage.removeItem("score");
  });
});
