// JavaScript
const button = document.getElementById('submit-answer');
const answerBtns = document.getElementsByClassName('answer-option');
const questionTextElement = document.getElementById('question-text-element');
const scoresMessage = document.getElementById('scores');
const scoresMessageText = document.getElementById('scores-message');
const activeSession = document.getElementById('active-session');

var scores = [];

button.addEventListener('click', function() {
    var answerWasCorrect = quizObject.correctAnswer == quizObject.answerSelected;
    console.log(answerWasCorrect);
    button.disabled = true;
    scores.push = {
        "expectedAnswer" : quizObject.correctAnswer,
        "givenAnswer"    : quizObject.answerSelected,
        "correct" : answerWasCorrect
    };
    if(answerWasCorrect){
        quizObject.totalCorrectQuestions ++ ;
    }

    gotoNextQuestion();
});

Array.from(answerBtns).forEach( (answer) => {
    answer.addEventListener('click', function(){
        setSelectedAnswer(answer);
        //answer.classList.toggle('selected-answer');
    });
});

function setSelectedAnswer(answer){
    unselectAllAnswers();
    quizObject.answerSelected = parseInt(answer.id.slice(-1));
    button.disabled = false;
    answer.classList.add('selected-answer')
}


fetch('./questions.json')
  .then(response => response.json())
  .then(data => {
    processQuestionsData(data);
  })
  .catch(error => {
    console.log("error loading json :" . error);
  });


  function processQuestionsData(data){
    
    if (data.hasOwnProperty('questions')) {
        // Code to handle if the node name exists in the JSON
        console.log('Valid JSON inport'); 
        var questions = data.questions;

        setGlobalQuizVariables(questions);
      
      } else {
        // Code to handle if the node name does not exist in the JSON
        console.log('Node name not found');
      }

    
  }


  function setGlobalQuizVariables(questions){

    quizObject = {};
    quizObject.totalQuestions = Object.entries(questions).length;
    quizObject.currentQuestionIndex = 1;
    quizObject.questions = questions;
    quizObject.answerSelected = null;
    quizObject.totalCorrectQuestions = 0;

    startQuiz();

  }

  function startQuiz(){
        setupQuestion(quizObject.currentQuestionIndex);
  };

  function setupQuestion(questionNumber){
    quizObject.currentQuestionIndex = questionNumber;

    var questions = quizObject.questions;
    var questionKeys = Object.keys(questions);
    var currentKey = questionKeys[questionNumber -1];

    var currentQuestionData = questions[currentKey];
    quizObject.correctAnswer = currentQuestionData.correctAnswer;


    questionTextElement.innerHTML = currentQuestionData.questionText;
    Array.from(answerBtns).forEach( (answer) => {
        answer.innerHTML =  currentQuestionData.answers[answer.id.slice(-1)];
    });

  }


  function gotoNextQuestion(){

    unselectAllAnswers();

    if(quizObject.currentQuestionIndex < quizObject.totalQuestions){
        setupQuestion(quizObject.currentQuestionIndex+1);
    } else {
        scoresMessage.style.display = "block";
        activeSession.style.display = "none";
        scoresMessageText.innerHTML = "Your score " + quizObject.totalCorrectQuestions + "/" + quizObject.totalQuestions;
        // alert( "game over - no more questions. \nscore " + quizObject.totalCorrectQuestions + " / " + quizObject.totalQuestions);
    }
    
  }


  function unselectAllAnswers(){
    quizObject.answerSelected = null;
    Array.from(answerBtns).forEach((answerBtn) => {
        answerBtn.classList.remove('selected-answer')
    });
  }