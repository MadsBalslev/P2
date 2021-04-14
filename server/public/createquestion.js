

document.body.onload = Run;



function Run() {
    const questionNumber = 1;
    let questionAmount = 0;
    let questionMetaData = {}
    testAnswers = {};
    const form = document.createElement("form");
    questionMetaData[questionAmount] = createQuestion(0, "Hvad er 2 + 2", 4, 0);
    questionAmount++;
    questionMetaData[questionAmount] = createQuestion(1, "Hvad er 3 + 3", 6, 1);
    questionAmount++;
    const div = document.createElement("div");
    let validation = document.createElement("P")
    validation.setAttribute("ID", "validation");
    let submitButton = document.createElement("button");
    submitButton.innerHTML = "Send answers"
    submitButton.onclick = function () {
        let questionAnswers = getAnswers(questionAmount);
        questionMetaData[0].questionanswer = questionAnswers[0];
        console.log(questionMetaData);
        console.log(questionAnswers);
    }
    div.appendChild(submitButton);
    div.appendChild(validation)
    document.body.appendChild(div);
    console.log(questionMetaData);
}

//Creates a div containing elements for a single question
function createQuestion(questionnumber, questiontext, questionid) {

    const div = document.createElement("div");
    let question = document.createElement("p");
    let textfield = document.createElement("INPUT");
    textfield.setAttribute("type", "number");
    textfield.setAttribute("value", "Indtast svar her");
    textfield.setAttribute("required", "1");
    div.appendChild(question);
    div.appendChild(textfield);
    document.body.appendChild(div);
    document.getElementsByTagName("p")[questionnumber].innerHTML = questiontext;
    let questionMetaData = {
        questionnumber: questionnumber,
        questionid: questionid,
        questionanswer: 1,
    }
    return questionMetaData;


}
// Gets the input from the inputfields and returns them as an array containing all answers
function getAnswers(questionAmount) {
    i = 0;
    questionAnswers = [];
    while (i < questionAmount) {
        //Checks if inputfield is answered and has valid data
        let inputObject = document.getElementsByTagName("input")[i];
        if (!inputObject.checkValidity()) {
            document.getElementById("validation").innerHTML = ("Du mangler at svare på et eller flere spørgsmål");
            return 0
        }
        questionAnswers[i] = document.getElementsByTagName("input")[i].value;
        i++;
    }
    return questionAnswers;
}