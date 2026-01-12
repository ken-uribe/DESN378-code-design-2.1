// =============================================
// DESN 378: Code + Design 2
// Your JavaScript will live here.
//
// This file will grow throughout the quarter
// as you learn to make the web behave.
// =============================================

console.log('Portfolio loaded');

// Week 0: Hello World!
//alert("Hello World!" );
const myImage = document.querySelector("img");

myImage.addEventListener("click", () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/firefox-icon.png") {
    myImage.setAttribute("src", "images/firefox2.png");
  } else {
    myImage.setAttribute("src", "images/firefox-icon.png");
  }
});
// Week 1: You'll add theme toggle code here
// Week 2: You'll add localStorage persistence here
// Week 3+: More to come...


