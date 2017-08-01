'use strict';
// questionArray template
// let questionsArray = [
//     {
//         text: "question text",
//         answerOptions: ["answer-option-1", "answer-option-2", "answer-opiton-3"]
//     }
// ]

let test = function() {
    this.questionNumber = 0;
    this.createElements();
}

test.prototype.createElements = function() {
    this.question = document.createElement('div');
    this.questionContent = document.createElement('p');
    this.answers = document.createElement('ul');
}

test.prototype.genereteQuestion = function(questionText, answerOptions) {
    let qn = ++this.questionNumber;  //qn = question Number
    let question =  this.question.cloneNode(true);
    let questionContent = this.questionContent.cloneNode(true);
    let answers = this.answers.cloneNode(true);

    questionText = questionText || "";
    answerOptions = answerOptions || ["Вариант ответа 1", "Вариант ответа 2", "Вариант ответа 3"];
    question.classList.add('question');
    questionContent.textContent = `${qn}. Вопрос №${qn} ${questionText}`;
    question.appendChild(questionContent);
    question.appendChild(answers);

    for(let i = 0; i < answerOptions.length; i++) {
        let answer = document.createElement('li');
        answer.innerHTML = `
        <input type="checkbox" id=answer${i+1}-${qn} name='answer${i+1}-${qn}'>
        <label for='answer${i+1}-${qn}'>${answerOptions[i]}</label>
        `;
        answers.appendChild(answer);
    };
    return question;
}

test.prototype.renderQuestions = function(questionsArray) {
    let testLength;
    (questionsArray) ? testLength = questionsArray.length :  testLength = 3;
    for (let i =0; i < testLength; i++) {
        if(questionsArray) {
            var questionText = questionsArray[i].text;
            var answerOptions = questionsArray[i].answerOptions;
        }
        let question = this.genereteQuestion(questionText, answerOptions);
        document.body.appendChild(question);
    }
}

let test1 = new test();
test1.renderQuestions(questions);
