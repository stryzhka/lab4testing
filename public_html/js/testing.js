import questions from './data.js';

let currentQuestion = 1;

let nextQuestionButton = document.getElementById("nextQuestion");

let questionForm = document.getElementById("questionForm");
questionForm.innerHTML.append('<div><label><input type="radio" name="1"/>Нефлон</label></div>');
questionForm.append('<div><label><input type="radio" name="1"/>123</label></div>');