
let storeQuestionData = (questionId,userAnswer,questionAmount)=> {
let questionData = {
    "questionId":questionId,
    "userAnswer":userAnswer,
    }
testAnswers[questionNumber] = questionData;  
}

let getAllQuestionData = (questionAmount,questionMetaData) => {
    i = 1;
    let Alldata = []
    let currentQuestion = {};
    while (i<=questionAmount){
        currentQuestion = {
            questionId: (questionMetaData[i].questionid),
            questionAnswer: document.getElementsByTagName("input")[i].value,
        }
        Alldata.push(currentQuestion);
        i++;




    }
}