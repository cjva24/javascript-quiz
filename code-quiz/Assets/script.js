// Questions for the quiz
const questions = [
    {
      question: "What is the correct way to declare a variable in JavaScript?",
      choices: ["variable name = value;", "var name = value;", "let name = value;"],
      answer: 2
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<javascript>", "<js>", "<src>", "<script>" ],
        answer: 3
      },
      {
        question: "Where is the correct place to insert a JavaScript?",
        choices: ["Both the head section and the body section are correct", "The head section", "The body section" ],
        answer: 0
      },
  ];
  
  let score = 0;
  let questionIndex = 0;
  let timeLeft = 60;
  let timerInterval;
  
  // Function to start the quiz
  function startQuiz() {
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("choices").style.display = "block";
  
    timerInterval = setInterval(function() {
      timeLeft--;
      document.getElementById("timer").innerText = timeLeft;
  
      if (timeLeft <= 0 || questionIndex === questions.length) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  
    showQuestion();
  }
  
  // Function to display questions
  function showQuestion() {
    const currentQuestion = questions[questionIndex];
    document.getElementById("question").innerText = currentQuestion.question;
  
    const choices = document.getElementById("choices");
    choices.innerHTML = "";
  
    currentQuestion.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.innerText = choice;
      button.addEventListener("click", function() {
        if (index === currentQuestion.answer) {
          score++;
        } else {
          timeLeft -= 10; // Deduct 10 seconds for wrong answers
        }
        questionIndex++;
  
        if (questionIndex < questions.length) {
          showQuestion();
        } else {
          endQuiz();
        }
      });
      choices.appendChild(button);
    });
  }
  
  // Function to end the quiz
  function endQuiz() {
    document.getElementById("question").innerText = "Quiz Complete! Your final score is " + score;
    document.getElementById("choices").style.display = "none";
    document.getElementById("submit-score").style.display = "inline";
    document.getElementById("initials").style.display = "inline";
  }
  
  // Submit the high score
  document.getElementById("submit-score").addEventListener("click", function() {
    const initials = document.getElementById("initials").value;
    if (initials !== "") {
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      highScores.push({ initials, score });
      localStorage.setItem("highScores", JSON.stringify(highScores));
  
      showHighScores();
    } else {
      alert("Please enter your initials!");
    }
  });
  
  // Show high scores
  function showHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const highScoresList = document.getElementById("high-scores");
    highScoresList.innerHTML = "";
  
    highScores
      .sort((a, b) => b.score - a.score)
      .forEach(entry => {
        const li = document.createElement("li");
        li.innerText = `${entry.initials}: ${entry.score}`;
        highScoresList.appendChild(li);
      });
  
    document.getElementById("scoreboard").style.display = "block";
  }
  
  // Event listener for starting the quiz
  document.getElementById("start-btn").addEventListener("click", startQuiz);
  