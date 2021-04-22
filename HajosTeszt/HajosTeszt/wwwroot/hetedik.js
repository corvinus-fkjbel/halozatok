var kerdesek;
var kerdesSzama = 0;

function letoltes()
{
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letoltesBefejezodott(data));
}

function k�rd�sMegjelen�t�s(k�rd�s) {
    console.log(k�rd�s);
    document.getElementById("k�rd�s_sz�veg").innerText = k�rd�s.questionText
    document.getElementById("v�lasz1").innerText = k�rd�s.answer1
    document.getElementById("v�lasz2").innerText = k�rd�s.answer2
    document.getElementById("v�lasz3").innerText = k�rd�s.answer3
    document.getElementById("k�p").src = "https://szoft1.comeback.hu/hajo/" + k�rd�s.image;
}

function k�rd�sBet�lt�s(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hib�s v�lasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => k�rd�sMegjelen�t�s(data));
}   

function v�laszfeldolgoz�s(v�lasz) {
    if (!v�lasz.ok) {
        console.error(`Hib�s v�lasz: ${response.status}`)
    }
    else {
        return v�lasz.json()
    }
}

function letoltesBefejezodott(d) {
    console.log("Sikeres letoltes")
    console.log(d)
    kerdesek = d;
    kerdesMegjelenites(0);
}

var kerdesMegjelenites = function (kerdesSzama)
{
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

        if (kerdesSzama==0) {
            kerdesSzama = kerdesek.lenght - 1;
            letoltes();
        }
        else {
            kerdesSzama--;
            letoltes();
        }
    }
    function Elore() {
        if (kerdesSzama == kerdesek.lenght-1) {
            kerdesSzama = 0;
            letoltes();
        }
        else {
            kerdesSzama++;
            letoltes();
        }


    }

}