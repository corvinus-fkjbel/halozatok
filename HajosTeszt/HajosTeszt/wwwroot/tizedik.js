var kerdesek;
var kerdesSzama = 0;

function letoltes() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letoltesBefejezodott(data));
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    .then(
        q => {
            hotList[destination].question = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
            if (displayedQuestion == undefined && destination == 0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }
        }
        }

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
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

function válaszfeldolgozás(válasz) {
    if (!válasz.ok) {
        console.error(`Hibás válasz: ${response.status}`)
    }
    else {
        return válasz.json()
    }
}

function letoltesBefejezodott(d) {
    console.log("Sikeres letoltes")
    console.log(d)
    kerdesek = d;
    kerdesMegjelenites(0);
}

var kerdesMegjelenites = function (kerdesSzama) {
    let kerdes_szoveg = document.getElementById("kerdes_szoveg")
    let kep = document.getElementById("kep1");
    let valasz1 = document.getElementById("valasz1");
    let valasz2 = document.getElementById("valasz2");
    let valasz3 = document.getElementById("valasz3");

    kerdes_szoveg.innerHTML = kerdesek[kerdesSzama].questionText
    kep.src = "https://szoft1.comeback.hu/hajo/" + kerdesek[kerdesSzama].image
    valasz1.innerText = kerdesek[kerdesSzama].answer1
    valasz2.innerText = kerdesek[kerdesSzama].answer2
    valasz3.innerText = kerdesek[kerdesSzama].answer3
}

window.onload = () => {

    function Viszsa() {

        if (kerdesSzama == 0) {
            kerdesSzama = kerdesek.lenght - 1;
            letoltes();
        }
        else {
            kerdesSzama--;
            letoltes();
        }
    }
    function előre() {
        clearTimeout(timeoutHandler)
        displayedQuestion++;
        if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
        kérdésMegjelenítés()
    }

}

[HttpGet]
[Route("questions/count")]
public int M4()
{
    HajostesztContext context = new HajostesztContext();
    int kérdésekSzáma = context.Questions.Count();

    return kérdésekSzáma;
}
var hotList = [];           
var questionsInHotList = 3; 
var displayedQuestion;     
var numberOfQuestions;    
var nextQuestion = 1;    

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }


    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}