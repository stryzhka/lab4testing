class Question{
    constructor(number, type, title, answers, trueAnswer, viewed, answered, input){
        this.number = number;
        this.type = type;
        this.title = title;
        this.answers = answers;
        this.trueAnswer = trueAnswer;
        this.viewed = viewed;
        this.answered = answered;
        this.input = input;
        if (typeof(trueAnswer) == 'object')
            trueAnswer = trueAnswer.sort();
    }
}

let question1 = new Question(1, "radio", "Кто ближайший предок человека", ["Обезьяна", "Ящерица"], "Обезьяна", false, false, 0);
let question2 = new Question(2, "radio", "Кто является первым хордовым животным", ["Ланцетник", "Акула", "Муравей"], "Ланцетник", false, false, 0);
let question3 = new Question(3, "checkbox", "Выберите понятия, относящиеся к эволюционному учению", ["Рудимент", "Консумент", "Продуцент", "Редуцент"], ["Редуцент", "Консумент", "Продуцент"], false, false, 0);
let question4 = new Question(4, "radio", "Кто автор теории борьбы за существование?", ["Чарльз Дарвин", "Альберт Эйнштейн", "Карл Линней", "Луи Пастер"], "Чарльз Дарвин", false, false, 0);
let question5 = new Question(5, "radio", "Вымирают ли некоторые виды при эволюции", ["Да", "Нет"], "Нет", false, false, 0);
let question6 = new Question(6, "select", "На каком материке больше всего уникальных животных", ["Австралия", "Африка", "Евразия"], "Австралия", false, false);
let question7 = new Question(7, "input", "Введите фамилию первого ученого, сформировавшего эволюционную теорию", [], "Ламарк", false, false);
let question8 = new Question(8, "radio", "Что такое мутация?", ["Вымирание вида","Изменение ДНК","Уничтожение генома"], "Изменение ДНК", false, false);
let question9 = new Question(9, "checkbox", "Выберите понятия, относящиеся к рекомбинации", ["Кроссинговер","Акселерация","Сцепление"], ["Кроссинговер", "Сцепление"], false, false);

let question10 = new Question(10, "radio", "Естественный отбор - это...", ["...появление особей, приспособленных к условиям среды","...борьба между двумя популяциями разных особей","...миграция видов"], "...появление особей, приспособленных к условиям среды", false, false);

let questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

export default questions;
    


