/*
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
source = audioCtx.createMediaStreamSource(stream);
source.connect(analyser);
analyser.connect(distortion);
distortion.connect(audioCtx.destination);
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(0, 0, 300, 300);
*/

let tolerance = 0.75;
let language = "english";
let theme = "number";
let audioEnable = false;
let modelLoaded = false;

let wordsToTrain = ["one","two"];
let lastScores = 0;

//Get the button:
let mybutton = document.getElementById("myBtn");
console.log(mybutton);


document.getElementById("Word_to_pronounce").innerHTML = wordsToTrain[0];

var ctx = document.getElementById('canvas').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: []
        }]
    },

    // Configuration options go here
    options: {}
});


function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}

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

/*
function draw() {
  var drawVisual = requestAnimationFrame(draw);
  analyser.getByteTimeDomainData(dataArray);
  canvas.fillStyle = 'rgb(200, 200, 200)';
  canvas.fillRect(0, 0, WIDTH, HEIGHT);
  canvas.lineWidth = 2;
  canvas.strokeStyle = 'rgb(0, 0, 0)';
  canvas.beginPath();
  var sliceWidth = WIDTH * 1.0 / bufferLength;
  var x = 0;
  for(var i = 0; i < bufferLength; i++) {
   
    var v = dataArray[i] / 128.0;
    var y = v * HEIGHT/2;

    if(i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }
  canvasCtx.lineTo(canvas.width, canvas.height/2);
  canvasCtx.stroke();
    
}
*/

let recognizer;

function switchAudio(){

    //canvas.clearRect(0, 0, 300, 300);
    //draw();

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
      botFunction();
    }, 4000);

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
      if(scores[0].word == wordsToTrain[0]){
        document.querySelector('#resultEnd').textContent = scores[0].word + " reconnu à " +scores[0].score*100 + "%";
        lastScores = scores[0].score*100;
      }
      else{
        document.querySelector('#resultEnd').textContent = " Your pronounciation wasn't good enough to be recognized ";
        lastScores = 0;
      }

  }, {probabilityThreshold: tolerance});
  console.log("end listening");
}

function stopListening(){
  recognizer.stopListening();
  console.log("fin d'enregistrement");
  if(lastScores != 0){
    addData(chart,wordsToTrain[0], lastScores);
  }
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