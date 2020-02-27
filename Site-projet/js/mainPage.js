//La tolerance de base est de 75%
let tolerance = 0.75;
//Le language de base est l'anglais
let language = "spanish";
//Le theme de base est les nombres
let theme = "number";
//Liste de mots initial
let wordsToTrain = ["dos", "quatro", "tres", "uno"];
//Dernier score enregistré
let lastScores = 0;
let wordToTr = "";
//Listes de mots possibles
let spanishNumber = ["dos", "quatro", "tres", "uno"];
let francaisNumber = ["deux", "quatre", "trois", "un"];
let spanishFruit = ["fraisa", "limon", "pera", "tomato"];
let francaisFruit = ["citron", "fraises", "poire", "tomate"];
let avancement = 0;
//Bouton qui permet de revenir en haut de la page
let mybutton = document.getElementById("myBtn");

//Gere le changement de categorie
function restartAvancement() {
    avancement = 0;
}

//Gere le changement de mot apres avoir reconnu un mot
function changeWordToTrain() {
    wordToTr = wordsToTrain[avancement]
}

//Affichage du mot à prononcer (initialement)
changeWordToTrain();
document.getElementById("Word_to_pronounce").innerHTML = "<h3><strong>" + wordToTr + "</strong></h3>";

//Contexte pour le graphique
let ctx = document.getElementById('canvas').getContext('2d');

//Fontion de création de graphe, renvoie un nouveau graphique
function CreateChart(nom) {
    nom = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: [],
            datasets: [{
                label: 'Similarity',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: []
            }]
        },
        options: {}
    });
    return nom;
}

//Creation des graphiques
let charUN;
charUN = CreateChart(charUN);
let charDEUX;
charDEUX = CreateChart(charDEUX);
let charTROIS;
charTROIS = CreateChart(charTROIS);
let charQUATRE;
charQUATRE = CreateChart(charQUATRE);

let listeGraph;

let charUNO;
charUNO = CreateChart(charUNO);
let charDOS;
charDOS = CreateChart(charDOS);
let charTRES;
charTRES = CreateChart(charTRES);
let charQUATRO;
charQUATRO = CreateChart(charQUATRO);

let charFraise;
charFraise = CreateChart(charFraise);
let charCitron;
charCitron = CreateChart(charCitron);
let charTomates;
charTomates = CreateChart(charTomates);
let charPoire;
charPoire = CreateChart(charPoire);

let charFraisa;
charFraisa = CreateChart(charFraisa);
let charLimon;
charLimon = CreateChart(charLimon);
let charTomato;
charTomato = CreateChart(charTomato);
let charPera;
charPera = CreateChart(charPera);

//Liste contenant tous les graphiques
listeGraph = {
    "un": charUN,
    "deux": charDEUX,
    "trois": charTROIS,
    "quatre": charQUATRE,
    "uno": charUNO,
    "dos": charDOS,
    "tres": charTRES,
    "quatro": charQUATRO,
    "fraises": charFraise,
    "citron": charCitron,
    "tomate": charTomates,
    "poire": charPoire,
    "fraisa": charFraisa,
    "limon": charLimon,
    "tomato": charTomato,
    "pera": charPera
};

//Gestion du graphique de suivi
let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: 'Similarity',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: []
        }]
    },
    options: {}
});

//Ajout de données au graphique
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

//Enlevement de données au graphique
function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

//Affichage du bouton de scroll auto lorsque le joueur scroll
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// Scroll en haut de la page 
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//Scroll au centre de la page
function inputCenter() {
    document.body.scrollTop = 545; // For Safari
    document.documentElement.scrollTop = 545; // For Chrome, Firefox, IE and Opera
}

//Scroll en bas de la page
function botFunction() {
    document.body.scrollTop = 1500; // For Safari
    document.documentElement.scrollTop = 1500; // For Chrome, Firefox, IE and Opera
}

//Rend un tableau aleatoire
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//Selection du language
function setLanguage(l) {
    restartAvancement();
    language = l;
    switch (language) {
        case "francais":
            if (theme == "number") {
                francaisNumber = shuffle(francaisNumber);
                for (let i = 0; i < 4; i++) {
                    wordsToTrain[i] = francaisNumber[i];
                }
            } else {
                francaisFruit = shuffle(francaisFruit);
                for (let i = 0; i < 4; i++) {
                    wordsToTrain[i] = francaisFruit[i];
                }
            }
            break;
        case "spanish":
            if (theme == "number") {
                spanishNumber = shuffle(spanishNumber);
                for (let i = 0; i < 4; i++) {
                    wordsToTrain[i] = spanishNumber[i];
                }
            } else {
                spanishFruit = shuffle(spanishFruit);
                for (let i = 0; i < 4; i++) {
                    wordsToTrain[i] = spanishFruit[i];
                }
            }
            break;
    }
    changeWordToTrain();
    console.log(l);
    document.getElementById("buttonLanguage").innerHTML = l;
    console.log("changement de langue");
    document.getElementById("Word_to_pronounce").innerHTML = "<h3><strong>" + wordToTr + "</strong></h3>";
}

//Selection du theme
function setTheme(t) {
    restartAvancement();
    theme = t;
    switch (theme) {
        case "number":
            if (language == "francais") {
                francaisNumber = shuffle(francaisNumber);
                for (let i = 0; i < 4; i++) {
                    wordsToTrain[i] = francaisNumber[i];
                }
            } else {
                spanishNumber = shuffle(spanishNumber);
                for (let i = 0; i < 4; i++) {
                    wordsToTrain[i] = spanishNumber[i];
                }
            }
            break;
        case "fruit":
            if (language == "francais") {
                francaisFruit = shuffle(francaisFruit);
                for (let i = 0; i < 4; i++) {
                    wordsToTrain[i] = francaisFruit[i];
                }
            } else {
                spanishFruit = shuffle(spanishFruit);
                for (let i = 0; i < 4; i++) {
                    wordsToTrain[i] = spanishFruit[i];
                }
            }
            break;
    }
    changeWordToTrain()
    document.getElementById("buttonTheme").innerHTML = t;
    console.log("changement de theme");
    document.getElementById("Word_to_pronounce").innerHTML = "<h3><strong>" + wordToTr + "</strong></h3>";
}

//Selection de la tolerence
function setTolerance(tol) {
    tolerance = tol;
    document.getElementById("buttonTolerance").innerHTML = (tol * 100).toString() + " %";
    console.log("changement de tolerance");
}

//Enregistrement de la voix de l'utilisateur et obtention des resultats
let recognizer;

//function lancer lors de l'appuie du bouton enregistrement
function switchAudio() {
    //le score est reset en interne
    lastScores = 0;
    console.log("load model");
    //Chargement du model
    loadModel();
    //L'enregistrement du joueur dure 4 secondes
    setTimeout(function () {
        console.log("arret d'enregistrement");
        stopListening();
        //Scroll automatique jusqu'a la prochaine section
        botFunction();
    }, 4000);

}

//Gestion des models
const URL = "https://alexgir.github.io/IML_project/Site-projet/";
let complementModelURL = {
    "francais-number": "my_model_fr/model.json",
    "spanish-number": "my_model/model.json",
    "francais-fruit": "my_model_fruit_fr/model.json",
    "spanish-fruit": "my_model_fruit_spanish/model.json"
};
let complementMetadataURL = {
    "francais-number": "my_model_fr/metadata.json",
    "spanish-number": "my_model/metadata.json",
    "francais-fruit": "my_model_fruit_fr/metadata.json",
    "spanish-fruit": "my_model_fruit_spanish/metadata.json"
};

//Gestion du chargement des models en fonctions des preferences du joueur
function loadModel() {
    console.log("creation du recognizer");
    let mod = language + "-" + theme;
    mod = mod.toLowerCase();
    let modelURL = "" + URL + "" + complementModelURL[mod];
    let metadataURL = "" + URL + "" + complementMetadataURL[mod];
    console.log(modelURL);
    console.log(metadataURL);
    //Création du recognizer en utilisant speechCommands
    recognizer = speechCommands.create("BROWSER_FFT", undefined,
        modelURL,
        metadataURL
    );

    // Préparation des mots et lancement de l'enregistrement de l'utilisateur
    Promise.all([
        recognizer.ensureModelLoaded()
    ]).then(function () {
        console.log("gestion des mots reconnus");
        words = recognizer.wordLabels();
        startListening();
    })
}

//Ecoute de l'utilisateur et obtention d'un score
function startListening() {
    console.log("start listening");
    recognizer.listen(({ scores }) => {
        //Obtention des scores liés à chaque mots
        scores = Array.from(scores).map((s, i) => ({ score: s, word: words[i] }));
        //scores.sort((s1, s2) => s2.score - s1.score);
        for (let i = 0; i < 5; i++) {
            //On n'affiche le rsultat que s'il correspond au mot voulu
            if (scores[i].word == wordToTr) {
                if (lastScores < scores[i].score * 100) {
                    lastScores = scores[i].score * 100;
                }
            }
        }
    }, { probabilityThreshold: tolerance });
    console.log("end listening");
}

//Fin de l'écoute de l'utilisateur et ajout de données au graphique
function stopListening() {
    recognizer.stopListening();
    console.log("fin d'enregistrement");
    //Recuperation du graphe correspondant au mot actuel
    let charActuel = listeGraph[wordToTr];
    console.log(charActuel);
    //Ajout du score actuel
    addData(charActuel, wordToTr, lastScores);
    let res = (Math.round(lastScores * 100) / 100);
    //L'affichage change en fonction du resultat de l'utilisateur
    if(res > 70){
        document.getElementById("buttonNext").style.display = "block";
        document.querySelector('#resultEnd').textContent = res + "% ✅";
    } else {
        document.getElementById("buttonNext").style.display = "none";
        document.querySelector('#resultEnd').textContent = res + "% ❌";
    }
}

// Gestion du changement de mot par le systeme
function nextWord() {
    console.log(wordsToTrain);
    document.getElementById("buttonNext").style.display = "none";
    avancement++;
    changeWordToTrain();
    document.getElementById("Word_to_pronounce").innerHTML = "<h3><strong>" + wordToTr + "</strong></h3>";
    //console.log(avancement);
    inputCenter();
    console.log(wordsToTrain);
}
