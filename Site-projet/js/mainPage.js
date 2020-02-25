let tolerance = 0.75;
let language = "english";
let theme = "number";
let audioEnable = false;
let modelLoaded = false;

//Get the button:
let mybutton = document.getElementById("myBtn");
console.log(mybutton);

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

function setLanguage(l){
  language = l;
  document.getElementById("buttonLanguage").innerHTML = l;
  console.log("changement de langue");
}

function setTheme(t){
  theme = t;
  document.getElementById("buttonTheme").innerHTML = t;
  console.log("changement de theme");
}

function setTolerance(tol){
  tolerance = tol;
  document.getElementById("buttonTolerance").innerHTML = (tol*100).toString() +" %";
  console.log("changement de tolerance");
}

let recognizer;

function switchAudio(){

    if(!modelLoaded){
      console.log("load model");
      loadModel();
    }else{
      console.log("debut d'enregistrement");
      startListening();
    }
    setTimeout(function(){ 
      console.log("arret d'enregistrement");
      stopListening();
    }, 7000);
}

function loadModel(){
  
  console.log("creation du recognizer");
  recognizer = speechCommands.create("BROWSER_FFT");  
  Promise.all([
      // Make sure that the underlying model and metadata are loaded via HTTPS requests.
      recognizer.ensureModelLoaded()
    ]).then(function(){
      
      console.log("gestion des mots reconnus");
      words = recognizer.wordLabels();
      modelLoaded = true;
      startListening();
    })
}

function startListening(){
  console.log("start listening");
  recognizer.listen(({scores}) => {
      scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
      scores.sort((s1, s2) => s2.score - s1.score);
      document.querySelector('#resultEnd').textContent = scores[0].word + " reconnu à " +scores[0].score*100 + "%";
  }, {probabilityThreshold: tolerance});
  console.log("end listening");
}

function stopListening(){
  recognizer.stopListening();
  console.log("fin d'enregistrement");
}
 /*
function predictWord() {
 // Array of words that the recognizer is trained to recognize.
 const words = recognizer.wordLabels();
 recognizer.listen(({scores}) => {
   // Turn scores into a list of (score,word) pairs.
   scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
   // Find the most probable word.
   scores.sort((s1, s2) => s2.score - s1.score);
   console.log(scores[0].score);
   document.querySelector('#resultEnd').textContent = scores[0].word + " reconnu à " +scores[0].score*100 + "%";
 }, {probabilityThreshold: tolerance});
}

async function app() {
 recognizer = speechCommands.create('BROWSER_FFT');
 await recognizer.ensureModelLoaded();
 predictWord();
}


app();*/