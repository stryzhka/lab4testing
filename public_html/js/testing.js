import questions from './data.js';


let forwardButton = document.getElementById("nextQuestion");
let prevButton = document.getElementById("prevQuestion");
let tabDiv = document.getElementById("tabs");
let answerButton = document.getElementById("answerButton");
let currentQuestion = 0;
let answered = 0;
let radioCount, checkboxCount, listCount = 0;
let remainText = document.getElementById("remain");

const urlParams = new URLSearchParams(window.location.search);
let timer = urlParams.get('timer');
console.log(`viewed: ${questions[currentQuestion].viewed}`);

let shuffleQuestions = urlParams.get('shuffleQuestions');
let shuffleAnswers = urlParams.get('shuffleAnswers');

console.log(shuffleQuestions, shuffleAnswers)


//Перемешивание массива
function shuffle(arr){
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
}

//Шаг таймера
function timerStep(){
    
    let convert = new Date(timer * 1000).toISOString().substring(14, 19);
    remain.innerHTML = `Оставшееся время: ${convert}`;
    timer--;
    if (timer <= 0){
        clearInterval(interval);
        finishTest();
    }
}


//Рендеринг вкладок вопросов
function renderTabs(){
    tabDiv.innerHTML = "";
    for (let i = 0; i < questions.length; i++){
        let htmlAppend;
        let tab = document.createElement("div");
        //console.log(questions[i].title,questions[i].viewed);
        if (questions[i].viewed){
            //console.log("True!");
            tab.setAttribute("class", "tab-readed");
        }
        else{
            //console.log("False!");
            tab.setAttribute("class", "tab-unactive");
        }
        if (questions[i].answered){
            tab.setAttribute("class", "tab-answered");
        }
        if (i == currentQuestion){
           tab.style["boxShadow"] = "0 0 5px #000000";
        }
        tab.addEventListener('click', function(){
            jumpTo(i);
        });
        tabDiv.appendChild(tab);
        
    }
    
}

//Рендер вопроса - текст вопроса и варианты ответов
function renderQuestion(){
    let questionNumberP = document.getElementById("questionNumber");
    let questionTitle = document.getElementsByClassName("header-theme")[0];
    questionNumberP.innerHTML = `Вопрос ${questions[currentQuestion].number}`;
    questionTitle.innerHTML = questions[currentQuestion].title;
    let questionForm = document.getElementById("questionForm");
    questionForm.innerHTML = "";
    let htmlAppend;
    console.log(questions[currentQuestion].type);
    switch (questions[currentQuestion].type){
        case "radio":
            for (let i = 0; i < questions[currentQuestion].answers.length; i++){
                htmlAppend = `<div>
                              <label>
               <input class="check" id="question${currentQuestion}_checkbox${i}" 
                                            type="radio" name="1"/>
                                        ${questions[currentQuestion].answers[i]}
                                    </label>
                                </div>`;
                questionForm.insertAdjacentHTML('beforeend', htmlAppend);
            }
            break;
        case "checkbox":
            for (let i = 0; i < questions[currentQuestion].answers.length; i++){
                htmlAppend = `<div>
                                    <label>
 <input id="question${currentQuestion}_checkbox${i}"
 class="check" type="checkbox" name="1"/>
                                        ${questions[currentQuestion].answers[i]}
                                    </label>
                                </div>`;
                questionForm.insertAdjacentHTML('beforeend', htmlAppend);
            }
            break;
        case "select":
            let selectAppend = `<select id="select">`;
            for (let i = 0; i < questions[currentQuestion].answers.length; i++){
                htmlAppend = `<option id="question${currentQuestion}_select${i}" 
class="checkList">${questions[currentQuestion].answers[i]}</option>`;
                selectAppend += htmlAppend;
            }
            selectAppend += "</select>";
            questionForm.insertAdjacentHTML('beforeend', selectAppend);
            break;
        case "input":
            htmlAppend = `
                            <div>
                                <label>Введите ответ<input class="checkInput" 
id="question${currentQuestion}_input"/></label>
                            </div
                        `;
            questionForm.insertAdjacentHTML('beforeend', htmlAppend);
    }
    loadInput();
    questions[currentQuestion].viewed = true;
    renderTabs();
    
}

//Смена вопроса на следующий
function changeQuestionForward(){
    answer();
    saveInput();
    if (currentQuestion < questions.length-1)
        currentQuestion++;
    else
        currentQuestion = 0;
    renderQuestion();

    
}

//Смена вопроса на предыдущий
function changeQuestionBackward(){
    answer();
    saveInput();
    if (currentQuestion != 0)
        currentQuestion--;
    renderQuestion();
    
    
}

//Кеширование отмеченных ответов
function saveInput(){
    document.querySelectorAll(`.check`).forEach(el => {
        console.log("saved element");
        localStorage.setItem(el.id, el.checked);
        if (el.checked){
            renderTabs();
        }

    });
    document.querySelectorAll('.checkList').forEach(el => {
        localStorage.setItem(el.id, el.innerHTML);
        console.log(el.innerHTML);
        if (el.checked){
            renderTabs();
        }
    });
    document.querySelectorAll('.checkInput').forEach(el => {
        localStorage.setItem(el.id, el.value);
        if (el.checked){
            renderTabs();
        }
    });
}

//Вызов кешированных ответов
function loadInput(){
    document.querySelectorAll(`.check`).forEach(el => {
        console.log("loaded element");
        el.checked = localStorage.getItem(el.id) === "true";
    });
    document.querySelectorAll('.checkInput').forEach(el => {
        el.value = localStorage.getItem(el.id);
    });
}

//Проверка на завершение теста
function checkFinished(){
    console.log(answered);
    if (answered == questions.length){
        
        console.log("finished");
        document.getElementById("finishButton").style.visibility = "visible";
    }
}

//Сохранение ответа
function answer(){
        let i = 0;
        switch(questions[currentQuestion].type){
            case "radio":
                i = 0;
                document.querySelectorAll(`.check`).forEach(el => {
                    
                    if (el.checked){
                        questions[currentQuestion].input = el.parentElement.innerText;
                        if (!questions[currentQuestion].answered)
                            answered++;
                        questions[currentQuestion].answered = true;

                    }
                    i++;
                });
                
                break;
            case "checkbox":
                i = 0;
                let str = "";
                questions[currentQuestion].input = [];
                document.querySelectorAll(`.check`).forEach(el => {
                    
                    if (el.checked){
                        str = el.parentElement.innerText.toString();
                        if (str[0] == " ")
                            str = str.toString().substring(1);
                        questions[currentQuestion].input.push(str);
                        if (!questions[currentQuestion].answered)
                            answered++;
                        questions[currentQuestion].answered = true;
                    }
                    i++;
                });
                
                break;
            case "select":
                let select = document.getElementById("select");
                
                questions[currentQuestion].input = select[select.selectedIndex].value
                if (!questions[currentQuestion].answered)
                    answered++;
                questions[currentQuestion].answered = true;
                break;
            case "input":
                document.querySelectorAll(`.checkInput`).forEach(el => {
                if (el.value != ""){
                    if (el.value.match(/^[а-яА-ЯёЁ]+$/g) != null){
                    questions[currentQuestion].input = el.value;
                    if (!questions[currentQuestion].answered)
                        answered++;
                    questions[currentQuestion].answered = true;
                    }
                    else{
                        alert("Ошибка ввода: только русские буквы");
                    }
                }
                
                
            });
                break;
        }
    
    
    renderTabs();
    checkFinished();
    
}

//generateResults()
//Возвращает обьект с результатами
function generateResults(){
   let obj = [];
   for (let i = 0; i < questions.length; ++i){
       obj[`question${i}_number`] = questions[i].number;
       obj[`question${i}_title`] = questions[i].title;
       if (typeof(questions[i].input) == 'object'){
           questions[i].input = questions[i].input.sort();
           questions[i].trueAnswer = questions[i].trueAnswer.sort();
       }
       try{
           let str = questions[i].input
        
        if (str.toString()[0] == " ")
            str = str.toString().substring(1);
        obj[`question${i}_userAnswer`] = str;
        obj[`question${i}_trueAnswer`] = (questions[i].trueAnswer);
        //questions[i].input = "" + questions[i].input;
        //questions[i].trueAnswer = "" + questions[i].trueAnswer;
        //console.log("STR:", str);
        if (str == 0){
            obj[`question${i}_userAnswer`] = "Нет ответа";
            obj[`question${i}_trueAnswer`] = (questions[i].trueAnswer);
            obj[`question${i}_score`] = 0;
            obj["len"] = questions.length;
            continue;
        }
        if (str.toString() === questions[i].trueAnswer.toString()){
             obj[`question${i}_score`] = 1;
             //console.log("yes debug: ", str, questions[i].trueAnswer);
        }
        else{
            obj[`question${i}_score`] = 0;
            console.log(typeof(str), typeof(questions[i].trueAnswer));
            console.log(`|${str}|${questions[i].trueAnswer}|`);
        }
       }
       catch (TypeError){
            obj[`question${i}_userAnswer`] = "Нет ответа";
            obj[`question${i}_trueAnswer`] = (questions[i].trueAnswer);
            obj[`question${i}_score`] = 0;
            obj["len"] = questions.length;
            continue;
        }
    }
   obj["len"] = questions.length;
   return obj;
}

//Подтверждение завершения теста
function confirmFinish(){
    if (confirm("Завершить тест?")){
        finishTest();
    }
}

//Передать результаты теста на страницу результатов и открыть ее
function finishTest(){
    let str = Object.entries(generateResults()).map(([key, val]) => `${key}=${val}`).join('&');
    //console.log(generateResults());
    window.location.href = `http://localhost:8383/lab4/results.html?${str}`;
}

function jumpTo(number){
    answer();
    saveInput();
    currentQuestion = number;
    renderQuestion();
}

forwardButton.onclick = changeQuestionForward;
prevButton.onclick = changeQuestionBackward;
//answerButton.onclick = answer;

document.getElementById("finishButton").style.visibility = "hidden";
document.getElementById("finishButton").onclick = confirmFinish;


if (shuffleQuestions === "true"){
    shuffle(questions);
}

if (shuffleAnswers === "true"){
    questions.forEach (el => {
       shuffle(el.answers); 
    });
}

renderQuestion();
var interval = window.setInterval(timerStep, 1000);

