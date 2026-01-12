// Store a reference to the <h1> in a variable
const myHeading = document.querySelector("h1");
// Update the text content of the <h1>
myHeading.textContent = "Hello world!";

const myImage = document.querySelector("img");

myImage.addEventListener("click", () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/fox1.png") {
    myImage.setAttribute("src", "images/fox2.png");
  } else {
    myImage.setAttribute("src", "images/fox1.png");
  }
});let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");