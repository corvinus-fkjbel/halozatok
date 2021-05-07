var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1; 
var timerHandler;

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
    }


    for (let i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
    fetch("question/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })


    document.getElementById("elore").addEventListener("click", elore);
    document.getElementById("vissza").addEventListener("click", vissza);

    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"));
    }


    if (localStorage.getItem("displayQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayQuestion"))
    }
    if (localStorage.getItem("nextQuestion"){
        nextQuestion=parseInt(localStorage.getItem("nextQuestion"))
    }

    if (hotlist.lenght===0) {
        for (let i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    }
    else {
        kérdésMegjelenítés();
    }

    

});

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`);
                    return null;
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
            }
        );
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    
    if (kérdés.image) {
        document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép").style.display = "block";
    }
    else {
        document.getElementById("kép").style.display = "none";
    }
    for (var i = 1; i <= 3; i++)  document.getElementById("valasz" + i).classList.remove("jo rossz")  
    document.getElementById("valaszok").style.pointerEvents="auto"
}

function elore() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion === questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}    
function viszsa() {

    displayedQuestion--;
    if (displayedQuestion <0) questionsInHotList= displayedQuestion -1;
    kérdésMegjelenítés()
    
}
function valasztas() {
    let kérdés = hotList[displayedQuestion].question;
    if (n === kérdés.correctAnswear) {
        document.getElementById("valasz" + n).classList.add("jo")
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers===3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        document.getElementById("valasz" + n).classList.add("rossz")
        document.getElementById("valasz" + kérdés.correctAnswear).classList.add("jo")
        hotList[displayedQuestion].goodAnswers = 0;
    }
    document.getElementById("valaszok").style.pointerEvents = "none"
    timerHandler=setTimeout(elore,3000)

    localStorage.setItem("hotList", JSON.stringify(hotlist));
    localStorage.setItem("displayQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}   















