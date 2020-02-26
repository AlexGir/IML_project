//La tolerance de base est de 75%
let tolerance = 0.75;
//Le language de base est l'anglais
let language = "spanish";
//Le theme de base est les nombres
let theme = "number";

let modelLoaded = false;
let wordsToTrain = ["dos","quatro"];
let lastScores = 0;

let spanishNumber = ["dos","quatro","tres","uno"];
let francaisNumber = ["deux","quatre","trois","un"];

//Bouton qui permet de revenir en haut de la page
let mybutton = document.getElementById("myBtn");

//Affichage du mot à prononcer
document.getElementById("Word_to_pronounce").innerHTML = wordsToTrain[0];

//Gestion du graphique de suivi
var ctx = document.getElementById('canvas').getContext('2d');
var chart = new Chart(ctx, {
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

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function inputCenter() {
  document.body.scrollTop = 545; // For Safari
  document.documentElement.scrollTop = 545; // For Chrome, Firefox, IE and Opera
}

function botFunction() {
  document.body.scrollTop = 1500; // For Safari
  document.documentElement.scrollTop = 1500; // For Chrome, Firefox, IE and Opera
}

//Selection du language
function setLanguage(l){
  language = l;
  document.getElementById("buttonLanguage").innerHTML = l;
  console.log("changement de langue");
  wordsToTrain = [spanishNumber[0],spanishNumber[1]];
  document.getElementById("Word_to_pronounce").innerHTML = wordsToTrain[0];
}

//Selection du theme
function setTheme(t){
  theme = t;
  document.getElementById("buttonTheme").innerHTML = t;
  console.log("changement de theme");
  wordsToTrain = [spanishNumber[0],spanishNumber[1]];
  document.getElementById("Word_to_pronounce").innerHTML = wordsToTrain[0];
}

//Selection de la tolerence
function setTolerance(tol){
  tolerance = tol;
  document.getElementById("buttonTolerance").innerHTML = (tol*100).toString() +" %";
  console.log("changement de tolerance");
}

//Enregistrement de la voix de l'utilisateur et obtention des resultats
let recognizer;
function switchAudio(){
      //reset
      lastScores = 0;
 //   if(!modelLoaded){
      console.log("load model");
      loadModel();
 //   }else{
 //     console.log("debut d'enregistrement");
 //     startListening();
 //   }
    setTimeout(function(){ 
      console.log("arret d'enregistrement");
      stopListening();
      botFunction();
    }, 6000);

}


const URL = "https://alexgir.github.io/IML_project/Site-projet/";
var complementModelURL = { "fancais-number" : "my_model_fr/model.json", 
            "spanish-number" : "my_model/model.json", 
            "fancais-fruit" : "my_model_fr/model.json",
            "spanish-fruit" : "my_model/model.json" };
var complementMetadataURL = { "fancais-number" : "my_model_fr/metadata.json", 
            "spanish-number" : "my_model/metadata.json", 
            "fancais-fruit" : "my_model_fr/metadata.json",
            "spanish-fruit" : "my_model/metadata.json" };           
//const modelURL = URL+'model.json';
//const metadataURL = URL+'metadata.json';

//Gestion du model
function loadModel(){
  console.log("creation du recognizer");
  let mod = language + "-" + theme;
   let modelURLtest = "" + URL + "" + complementModelURL[mod];
    let metadataURLtest = "" + URL + "" + complementModelURL[mod];
    
    console.log("modelURLtest : " + modelURLtest);
    console.log("metadataURLtest : " + metadataURLtest);
    console.log("-------------------");
    console.log("complément test : " + complementModelURL[mod]);
  mod = mod.toLowerCase();
  console.log(mod);
  let modelURLa = "" + URL + "" + complementModelURL[mod];
  let metadataURLa = "" + URL + "" + complementModelURL[mod];
   
    
    console.log("modelURL : " + modelURLa);
    console.log("metadataURL : " + metadataURLa);
         console.log("-------------------");
    console.log("complément : " + complementModelURL[mod]);
  //partie à modifier pour avoir plusieurs model (laguages et themes)
  let modelURL = "https://alexgir.github.io/IML_project/Site-projet/my_model/model.json";
  let metadataURL = "https://alexgir.github.io/IML_project/Site-projet/my_model/metadata.json";
  console.log(modelURL);
  console.log(metadataURL);
  recognizer = speechCommands.create("BROWSER_FFT"
  ,undefined,
  modelURL,
  metadataURL
  );
  Promise.all([
      recognizer.ensureModelLoaded()
    ]).then(function(){
      console.log("gestion des mots reconnus");
      words = recognizer.wordLabels();
      modelLoaded = true;
      startListening();
    })
}

//Ecoute de l'utilisateur et obtention d'un score
function startListening(){
  console.log("start listening");
  recognizer.listen(({scores}) => {
      scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
      scores.sort((s1, s2) => s2.score - s1.score);
      for(let i=0;i<5;i++){
        //On n'affiche le rsultat que s'il correspond au mot voulu
        if(scores[i].word == wordsToTrain[0]){
          if(lastScores<scores[i].score*100){
            lastScores = scores[i].score*100;
          }
        }
      }
  }, {probabilityThreshold: tolerance});
  console.log("end listening");
}

//Fin de l'écoute de l'utilisateur et ajout de données au graphique
function stopListening(){
  recognizer.stopListening();
  console.log("fin d'enregistrement");
  addData(chart,wordsToTrain[0], lastScores);
  document.querySelector('#resultEnd').textContent = (Math.round(lastScores*100)/100) + "%";
  
}
