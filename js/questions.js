document.addEventListener("DOMContentLoaded", () => {
  const questionNumberEl = document.getElementById("question-number");
  const question = document.getElementById("question");
  const nextBtnEl = document.getElementById("next-btn");

  let currentQuestionIndex = 0;
  let quizQuestions = [];
  let score = parseInt(localStorage.getItem("score")) || 0;

  /* API URL */
  const APIURL =
    "https://the-trivia-api.com/v2/questions?categories=general_knowledge";

  /* FUNCTION TO FETCH THE QUIZ FROM AN API */
  async function fetchData() {
    const res = await fetch(APIURL);
    if (!res.ok) {
      throw new Error("Error in fetching the data", res.status);
    }

    const data = await res.json();
    return data;
  }

  async function initQuiz() {
    quizQuestions = await fetchData();
    renderCurrentQuestions();
  }

  /* FUNCTION TO SHOW THE QUESTIONS AND CHOICES */
  function renderCurrentQuestions() {
    showQuestions();
    showChoices();
    console.log(quizQuestions[currentQuestionIndex]);
  }

  /* FUNCTION TO DISPLAY THE QUESTIONS */
  function showQuestions() {
    questionNumberEl.textContent = `Question ${currentQuestionIndex + 1}/${quizQuestions.length}`;
    question.textContent = quizQuestions[currentQuestionIndex].question.text;
  }

  /* FUNCTION TO SHOW THE CHOICES */
  function showChoices() {
    const choicesItems = document.querySelectorAll(".choices li");

    choicesItems.forEach((el) => el.classList.remove("active"));

    const choices = [
      quizQuestions[currentQuestionIndex].correctAnswer,
      ...quizQuestions[currentQuestionIndex].incorrectAnswers,
    ].sort(() => Math.random() - 0.5);

    choicesItems.forEach((items, i) => {
      const choice = items.querySelector(".answers");
      choice.textContent = choices[i];

      items.onclick = () => {
        choicesItems.forEach((el) => el.classList.remove("active"));
        items.classList.add("active");
      };
    });
  }

  /* FUNCTION TO CONTROL THE QUESTIONS */
  nextBtnEl.addEventListener("click", () => {
    const activeItem = document.querySelector(".choices li.active .answers");
    const selectedAnswer = activeItem.textContent;
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

    if (!activeItem) {
      alert("Please select an answer before moving on");
      return;
    }

    if (selectedAnswer === correctAnswer) {
      score++;
      localStorage.setItem("score", score);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      renderCurrentQuestions();
    } else {
      window.location.href = "results.html";
    }
  });

  initQuiz();
});
