function checkAnswer(questionNumber,correctAnswer) {
    let answer = document.getElementsByTagName("input")[questionNumber].value;
        if (answer == correctAnswer) {
            alert("Rigtigt");
        }
        if (answer != correctAnswer) {
            alert("Forkert");
        }
    }