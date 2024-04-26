let shuffleQuestions = false;
let shuffleAnswers = false;

let shuffleQuestionsButton = document.getElementById("shuffleQuestions");
let shuffleAnswersButton = document.getElementById("shuffleAnswers");
shuffleQuestionsButton.onclick = setQuestionsShuffle;
shuffleAnswersButton.onclick = setAnswersShuffle;

function startTesting(){
    window.location.href = 
            `http://localhost:8383/lab4/testing.html?timer=600&shuffleQuestions=${shuffleQuestions}&shuffleAnswers=${shuffleAnswers}`;
}



window.addEventListener("DOMContentLoaded", event => {
  console.log("DOM fully loaded and parsed");
  document.getElementById("start").onclick = startTesting;
});

function setQuestionsShuffle(){
    shuffleQuestions = Boolean(shuffleQuestionsButton.checked);
}

function setAnswersShuffle(){
    shuffleAnswers = Boolean(shuffleAnswersButton.checked);
    console.log(Boolean(shuffleAnswersButton.checked))
}