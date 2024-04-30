<script setup>
import { ref, onMounted } from 'vue'
import questionsData from "../assets/questions.json"
console.log("TEST TEST TEST",questionsData)

defineProps({
  msg: String
})

const isSelected = ref(0)

var info = null;
const questionText = ref(null);
const answersOffered = ref('');

let currentQuestion = 1;
let totalQuestions = 0;
let totalCorrectAnswers = 0;
let expectedAnswer = 0;
let gameOver = false;
const wrongAnswers = ref('');

function selectAnswer (e) {
  isSelected.value = e.target.id.slice(-1);
}

function submitAnswer(){
    
    if(gameOver){
        return;
    }

    currentQuestion ++;

    if (isSelected.value == expectedAnswer){
        totalCorrectAnswers ++;
    } else {
        wrongAnswers.value += "- "+questionText.value + "\n";
        console.log(wrongAnswers.value !='')
    }

    if(totalQuestions < currentQuestion){
        gameOver = true;
        questionText.value = '';
        return;
    }

    loadQuestion(currentQuestion);
  
}

    onMounted(async () => {
        info = questionsData;
        totalQuestions = Object.keys(info.questions).length;
        loadQuestion(currentQuestion);
        
            }
    );


    function loadQuestion(qnum){
        questionText.value = info.questions["q"+String(qnum)].questionText;
        answersOffered.value = info.questions["q"+String(qnum)].answers;
        expectedAnswer = info.questions["q"+String(qnum)].correctAnswer;
        isSelected.value=0;
    }
    
    function startAgain(){
        location.reload();
    }


</script>

<template>
      <div class="quizz-frame"> 
        <div id="scores" v-show="gameOver"> 
            <h1>Quizz Completed!</h1> 
            <div style="font-size:100px ; padding:30px 0">&#127881;</div>
            <div id="scores-message"> Your score {{ totalCorrectAnswers }} / {{ totalQuestions }} </div> 
        </div>
        <div id="active-session">
    
            <p style="display: inline-block; width:80%" class="question"  id="question-text-element" v-show="!gameOver"> {{ questionText }}</p>
            <p style="display: inline-block; width:20%; text-align: right; color:gray" class="question" v-show="!gameOver">{{ currentQuestion }} / {{ totalQuestions }}</p>
            
            <div style="white-space: pre-line; width: 70%" v-show="gameOver && wrongAnswers != ''"> 
                <h3><b>Questions to review</b> </h3>
                {{ wrongAnswers }}
            </div>
            
            <div class="all-answers" v-show="!gameOver"> 
                <div class="answer-option" :class=" { selectedAnswer : isSelected==1}" @click="selectAnswer" id="answer1"> {{answersOffered["1"]}}</div>
                <div class="answer-option" :class=" { selectedAnswer : isSelected==2}" @click="selectAnswer" id="answer2"> {{answersOffered["2"]}} </div>
                <div class="answer-option" :class=" { selectedAnswer : isSelected==3}" @click="selectAnswer" id="answer3"> {{answersOffered["3"]}}</div>
                <div class="answer-option" :class=" { selectedAnswer : isSelected==4}" @click="selectAnswer" id="answer4"> {{answersOffered["4"]}}</div>
            </div>
            
            <div class="navigation">
                <button id="submit-answer" @click="submitAnswer" v-bind:disabled="isSelected == 0" v-show="!gameOver"> SUBMIT </button>
                <button @click="startAgain" v-show="gameOver"> PLAY AGAIN </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
 @import '../styles/quiz.css';
</style>
