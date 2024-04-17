import questions from './data.js';

let forwardButton = document.getElementById("nextQuestion");
let prevButton = document.getElementById("prevQuestion");
let tabDiv = document.getElementById("tabs");
let currentQuestion = 0;

let radioCount, checkboxCount, listCount = 0;



function renderTabs(){
    tabDiv.innerHTML = "";
    for (let i = 0; i < questions.length; i++){
        let htmlAppend;
        if (questions[i].viewed){
            //console.log("True!");
            htmlAppend = `<div class="tab-readed"></div>`;
        }
        else{
            //console.log("False!");
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
    let htmlAppend;
    console.log(questions[currentQuestion].type);
    switch (questions[currentQuestion].type){
        case "radio":
            for (let i = 0; i < questions[currentQuestion].answers.length; i++){
                htmlAppend = `<div>
                                    <label>
                
                                        <input class="check" id="question${currentQuestion}_checkbox${i}" onclick="saveInput()" type="radio" name="1"/>
                                        ${questions[currentQuestion].answers[i]}
                                    </label>
                                </div>`;
                //var div = document.createElement("div");
                //var label = div.appendChild(document.createElement("<input>"));
                questionForm.insertAdjacentHTML('beforeend', htmlAppend);
            }
            break;
            //console.log(htmlAppend);
        case "checkbox":
            for (let i = 0; i < questions[currentQuestion].answers.length; i++){
                htmlAppend = `<div>
                                    <label>
                                        
                                        <input id="question${currentQuestion}_checkbox${i}" class="check" type="checkbox" name="1"/>
                                        ${questions[currentQuestion].answers[i]}
                                    </label>
                                </div>`;
                questionForm.insertAdjacentHTML('beforeend', htmlAppend);
            }
            break;
        case "select":
            let selectAppend = `<select>`;
            for (let i = 0; i < questions[currentQuestion].answers.length; i++){
                htmlAppend = `<option id="question${currentQuestion}_select${i}" class="checkList">${questions[currentQuestion].answers[i]}</option>`;
                selectAppend += htmlAppend;
            }
            selectAppend += "</select>";
            questionForm.insertAdjacentHTML('beforeend', selectAppend);
            break;
        case "text":
            htmlAppend = `
                            <div>
                                <label>Введи ответ сука <input id="question${currentQuestion}_input"/></label>
                            </div
                        `;
            questionForm.insertAdjacentHTML('beforeend', htmlAppend);
    }
    
    //console.log(document.getElementById("pidor"));
    
    //localStorage.setItem("1", "2");
    //
    loadInput();
    questions[currentQuestion].viewed = true;
    renderTabs();
    
}

function changeQuestionForward(){
    saveInput();
    if (currentQuestion < questions.length-1)
        currentQuestion++;
    console.log(currentQuestion, questions.length);
    renderQuestion();

    
}

function changeQuestionBackward(){
    saveInput();
    if (currentQuestion != 0)
        currentQuestion--;
    renderQuestion();
    
    
}

function saveInput(){
    document.querySelectorAll(`.check`).forEach(el => {
        console.log("saved element");
        localStorage.setItem(el.id, el.checked);

    });
    document.querySelectorAll('.checkList').forEach(el => {
        localStorage.setItem(el.id, el.innerHTML);
        console.log(el.innerHTML);
    });
}

function loadInput(){
    document.querySelectorAll(`.check`).forEach(el => {
        console.log("loaded element");
        el.checked = localStorage.getItem(el.id) === "true";
    });
}




forwardButton.onclick = changeQuestionForward;
prevButton.onclick = changeQuestionBackward;


renderQuestion();
