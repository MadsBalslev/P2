

document.body.onload = Run;



function Run(){
    const form = document.createElement("form");
    let question1 = createQuestion(0, "Hvad er 2 + 2",4);
    createQuestion(1, "Hvad er 3 + 3",6);
    console.log(document.getElementsByTagName("Form")[1].innerHTML);
    }
function createQuestion(questionnumber,questiontext,testAnswer){
    {
        const div = document.createElement("div");
        const form = document.createElement("form");
        const button = document.createElement("button");
        let question = document.createElement("p");
        let textfield = document.createElement("INPUT");
        textfield.setAttribute("type", "text");
        textfield.setAttribute("value", "Indtast svar her");
        form.appendChild(question);
        form.appendChild(textfield);
        form.appendChild(button);
        div.appendChild(form);
        document.body.appendChild(div);
        document.getElementsByTagName("button")[questionnumber].onclick = function(){
            checkAnswer(questionnumber,testAnswer);
        }
        document.body.getElementsByTagName("button")[questionnumber].innerHTML= "Submit"
        document.getElementsByTagName("p")[questionnumber].innerHTML = questiontext;

    }
}

/*
const div1 = document.createElement("div");
    let question = document.createElement("H1");
    let textfield = document.createElement("INPUT");
    textfield.setAttribute("type", "text");
    textfield.setAttribute("value", "Indtast svar her");
    div1.appendChild(question);
    div1.appendChild(textfield);
    document.body.appendChild(div1);
    document.getElementsByTagName("H1")[0].innerHTML = "Hvad er 2 + 2";
*/