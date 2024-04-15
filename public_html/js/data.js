class Question{
    constructor(number, type, title, answers, trueAnswer, viewed, answered){
        this.number = number;
        this.type = type;
        this.title = title;
        this.answers = answers;
        this.trueAnswer = trueAnswer;
        this.viewed = viewed;
        this.answered = answered;
    }
    checkAnswer(userAnswer){
        return userAnswer === this.trueAnswer;
    }
}

let question1 = new Question(1, "radio", "Стружки крутая группа?", ["да", "нет"], 0, false, false);
let question2 = new Question(2, "radio", "Структурная единица почки?", ["нефлон", "тейлон", "полиуретан"], 2, false, false);
let question3 = new Question(3, "checkbox", "Кто насиловал Членина в жопу", ["Сралин", "Срыня", "Бидон"], 1, false, false);
let question4 = new Question(4, "radio", "Кто автор видео тамбовский дед?", ["Хова", "Мэд", "Нифедыч", "itpedia", "vjlink", "Игорь гофман"], 1, false, false);
let question5 = new Question(5, "radio", "Что делать в случае ядерного взрыва?", ["Убегать", "Кормить собак", "В аквапарке реально охуенно", "х^2"], 1, false, false);
let question6 = new Question(6, "select", "Сво", ["Посхалко", "7-8", "Наумов Саша"], 1, false, false);
let question7 = new Question(7, "checkbox", "Сво", ["Сво"], 1, false, false);

let questions = [question1, question2, question3, question4, question5, question6, question7];

export default questions;

