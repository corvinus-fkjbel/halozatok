var kerdesek;
var kerdesSzama = 0;

function letoltes()
{
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letoltesBefejezodott(data));
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