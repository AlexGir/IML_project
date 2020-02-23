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