

let questions = [

    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Control Processing User"
        ],
        answer: 0
    },

    {
        question: "Which of these is an input device?",
        options: [
            "Monitor",
            "Printer",
            "Keyboard",
            "Speaker"
        ],
        answer: 2
    },

    {
        question: "Which part of a computer displays information?",
        options: [
            "Mouse",
            "Monitor",
            "Keyboard",
            "CPU"
        ],
        answer: 1
    },

    {
        question: "Which of these is an example of an operating system?",
        options: [
            "Microsoft Word",
            "Google Chrome",
            "Windows",
            "HTML"
        ],
        answer: 2
    },

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Transfer Main Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    }

];


let startButton = document.getElementById("startButton");

let questionArea = document.getElementById("questionArea");

let currentQuestion = 0;

let score = 0;

let timeLeft = 30;

let timer;


// Start the quiz
startButton.addEventListener("click", function() {

    currentQuestion = 0;

    score = 0;

    startButton.style.display = "none";

    showQuestion();

});


// Display a question
function showQuestion() {

    clearInterval(timer);

    let q = questions[currentQuestion];

    questionArea.innerHTML = `
        <h2>Question ${currentQuestion + 1} of ${questions.length}</h2>

        <p id="timer">Time left: 30 seconds</p>

        <div class="progress-container">
            <div class="progress-bar" id="progressBar"></div>
        </div>

        <p>${q.question}</p>

        <div id="options"></div>

        <p id="result"></p>
    `;

    let progressBar = document.getElementById("progressBar");

    let progress = ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = progress + "%";


    let optionsArea = document.getElementById("options");

    q.options.forEach(function(option, index) {

        let button = document.createElement("button");

        button.innerHTML = option;

        button.onclick = function() {

            checkAnswer(index);

        };

        optionsArea.appendChild(button);

        optionsArea.appendChild(document.createElement("br"));

        optionsArea.appendChild(document.createElement("br"));

    });


    startTimer();

}


// Start the countdown timer
function startTimer() {

    timeLeft = 30;

    let timerDisplay = document.getElementById("timer");

    timerDisplay.innerHTML = "Time left: " + timeLeft + " seconds";

    clearInterval(timer);

    timer = setInterval(function() {

        timeLeft--;

        timerDisplay.innerHTML = "Time left: " + timeLeft + " seconds";

        if (timeLeft <= 0) {

            clearInterval(timer);

            let result = document.getElementById("result");

            result.innerHTML = "Time is up!";

            disableAnswers();

            setTimeout(function() {

                nextQuestion();

            }, 1500);

        }

    }, 1000);

}


// Check the selected answer
function checkAnswer(selectedAnswer) {

    clearInterval(timer);

    let correctAnswer = questions[currentQuestion].answer;

    let result = document.getElementById("result");

    if (selectedAnswer === correctAnswer) {

        score++;

        result.innerHTML = "Correct answer! Well done.";

    } else {

        result.innerHTML = "Wrong answer!";

    }

    disableAnswers();

}


// Disable answer buttons and show Next Question
function disableAnswers() {

    let optionsArea = document.getElementById("options");

    let answerButtons = optionsArea.querySelectorAll("button");

    answerButtons.forEach(function(button) {

        button.disabled = true;

    });


    let nextButton = document.createElement("button");

    nextButton.innerHTML = "Next Question";

    nextButton.onclick = nextQuestion;

    optionsArea.appendChild(document.createElement("br"));

    optionsArea.appendChild(nextButton);

}


// Move to the next question
function nextQuestion() {

    clearInterval(timer);

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

}


// Display the final score
function showResult() {

    clearInterval(timer);

    questionArea.innerHTML = `
        <h2>Quiz Completed!</h2>

        <p>Your score is ${score} out of ${questions.length}.</p>

        <button onclick="restartQuiz()">Restart Quiz</button>
    `;

}


// Restart the quiz
function restartQuiz() {

    clearInterval(timer);

    currentQuestion = 0;

    score = 0;

    showQuestion();

}
