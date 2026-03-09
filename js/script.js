document.addEventListener("DOMContentLoaded", () => {
  const questionNumber = document.getElementById("question-number");
  const questionEl = document.getElementById("question");
  const nextBtnEl = document.getElementById("next-btn");

  let currentQuestionIndex = 0;
  let quizQuestions = [];
  let score = 0;

  /* API URL */
  const APIURL =
    "https://the-trivia-api.com/v2/questions?categories=general_knowledge";

  /* FETCH THE DATA */
  const getData = async () => {
    const res = await fetch(APIURL);
    if (!res.ok) {
      throw new Error(`Response Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  };

  const initQuiz = async () => {
    try {
      quizQuestions = await getData();
      console.log("Quiz Data Loaded:", quizQuestions);

      renderCurrentQuestions();
    } catch (err) {
      console.log(`Failed to fetch the questions: ${err}`);
    }
  };

  function renderCurrentQuestions() {
    showChoices(quizQuestions);
    showQuestions(quizQuestions);
  }

  /* FUNCTION TO DISPLAY THE QUESTIONS */
  function showQuestions(questions) {
    questionEl.textContent = questions[currentQuestionIndex].question["text"];

    questionNumber.textContent = `Question ${currentQuestionIndex + 1}/ ${questions.length}`;
  }

  /* FUNCTION TO DISPLAY THE CHOICES DYNAMICALLY */
  function showChoices(questions) {
    const choicesItems = document.querySelectorAll(".choices li");

    choicesItems.forEach((el) => el.classList.remove("active"));

    /* Generate an array of the choices */
    const choices = [
      questions[currentQuestionIndex].correctAnswer,
      ...questions[currentQuestionIndex].incorrectAnswers,
    ].sort(() => Math.random() - 0.5);

    choicesItems.forEach((items, i) => {
      const answerText = items.querySelector(".answers");
      answerText.textContent = choices[i];

      items.onclick = (item) => {
        choicesItems.forEach((el) => el.classList.remove("active"));
        items.classList.add("active");
      };
    });
  }

  nextBtnEl.addEventListener("click", () => {
    currentQuestionIndex += 1;

    if (currentQuestionIndex < quizQuestions.length) {
      renderCurrentQuestions();
    } else {
      alert("Quiz is over");
    }
  });

  initQuiz();
});
