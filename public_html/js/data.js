class Question{
    constructor(number, title, answers, trueAnswer){
        this.number = number;
        this.title = title;
        this.answers = answers;
        this.trueAnswer = trueAnswer;
    }
    checkAnswer(userAnswer){
        return userAnswer === this.trueAnswer;
    }
}

let question1 = new Question(1, "Стружки крутая группа?", ["да", "нет"], 0);
let question2 = new Question(1, "Структурная единица почки?", ["нефлон", "тейлон", "полиуретан"], 2);

let questions = [question1, question2];

export default questions;

