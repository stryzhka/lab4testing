import questions from './data.js';

let forwardButton = document.getElementById("nextQuestion");
let prevButton = document.getElementById("prevQuestion");
let tabDiv = document.getElementById("tabs");


let currentQuestion = 0;

function renderTabs(){
    tabDiv.innerHTML = "";
    for (let i = 0; i < questions.length; i++){
        let htmlAppend;
        if (questions[i].viewed){
            console.log("True!");
            htmlAppend = `<div class="tab-readed"></div>`;
        }
        else{
            console.log("False!");
            htmlAppend = `<div class="tab-unactive"></div>`;
        }
        tabDiv.insertAdjacentHTML('beforeend', htmlAppend);
        
    }
    
}

function renderQuestion(){
    let questionNumberP = document.getElementById("questionNumber");
    let questionTitle = document.getElementsByClassName("header-theme")[0];
    questionNumberP.innerHTML = `Вопрос ${questions[currentQuestion].number}`;
    questionTitle.innerHTML = questions[currentQuestion].title;
    let questionForm = document.getElementById("questionForm");
    questionForm.innerHTML = "";
    for (let i = 0; i < questions[currentQuestion].answers.length; ++i){
        let htmlAppend = `<div>
                                    <label>
                                        <input type="${questions[currentQuestion].type}" name="1"/>
                                        ${questions[currentQuestion].answers[i]}
                                    </label>
                                </div>`;
        questionForm.insertAdjacentHTML('beforeend', htmlAppend);
    }
    //
    questions[currentQuestion].viewed = true;
    renderTabs();
    
}

function changeQuestionForward(){
    if (currentQuestion < questions.length-1)
        currentQuestion++;
    console.log(currentQuestion, questions.length);
    renderQuestion();

    
}

function changeQuestionBackward(){
    if (currentQuestion != 0)
        currentQuestion--;
    renderQuestion();
    
    
}



forwardButton.onclick = changeQuestionForward;
prevButton.onclick = changeQuestionBackward;


renderQuestion();
