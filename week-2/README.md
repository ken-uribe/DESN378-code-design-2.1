# Week 2: The Memory

Add your Week 2 work here.

## What to include

- Assignment submissions
- Experiments and explorations
- Notes and reflections

## This week's focus

- `localStorage` for persistence
- `prefers-color-scheme` detection
- `prefers-reduced-motion` accessibility

// ============================================
// TUTORIAL 2-2: CODEDEX CONDITIONALS
// Student: [Kenia]
// Date: [01.22.26]
// ============================================
​
// --------------------------------------------
// EXERCISE 11: COIN FLIP
// Simulate a coin toss using Math.random()
// Output "Heads" or "Tails"
// --------------------------------------------

let num = Math.random();

if (num > 0.5) {
  console.log("Heads");
} else {
  console.log("Tails");
}

// --------------------------------------------
// EXERCISE 12: GOOD MORNING
// Check if hour < 12
// If true, print morning greeting with routines
// --------------------------------------------

let hour = 10;
if (hour < 12) {
  console.log("Good Morning!");
}

// --------------------------------------------
// EXERCISE 13: GOOD AFTERNOON
// Add else clause to Exercise 12
// If hour < 12: morning greeting
// Else: afternoon greeting
// --------------------------------------------

let hour = 12;
if (hour < 12) {
  console.log("Good Morning!");
} else {
  console.log("Good Afternood!");
}

// --------------------------------------------
// EXERCISE 14: pH LEVELS
// Check if pH is basic, acidic, or neutral
// Use else if for multiple conditions
// --------------------------------------------

let ph = 7;

if (ph > 7) {
  console.log("Basic");
} else if (ph > 7) {
  console.log("Acidic");
} else {
  console.log("Neutral");
}

// --------------------------------------------
// EXERCISE 15: MAGIC 8 BALL
// Generate random number 0-8
// Return different responses based on number
// Format: Question / Magic 8 Ball Answer
// --------------------------------------------

console.log("Question: Should I have Spicy Tuna Onigiri?");

const answer = Math.floor(Math.random() * 9) + 1;

if (answer === 1) {
  console.log("Yes - definitely.");
} else if (answer === 2) {
  console.log("It is decidedly so.");
} else if (answer === 3) {
  console.log("Without a doubt.");
} else if (answer === 4) {
  console.log("Reply hazy, try again.");
} else if (answer === 5) {
  console.log("Ask again later.");
} else if (answer === 6) {
  console.log("Better not tell you now.");
} else if (answer === 7) {
  console.log("My sources say no.");
} else if (answer === 8) {
  console.log("Outlook not so good.");
} else {
  console.log("Very doubtful.");
}

// --------------------------------------------
// EXERCISE 16: AIR QUALITY INDEX
// Check AQI ranges using logical operators
// 0-50: Good, 51-100: Moderate, etc.
// --------------------------------------------

let aqi = 56;

if (aqi >= 0 && aqi <= 50) {
  console.log("Good");
} else if (aqi >= 51 && aqi <= 100) {
  console.log("Moderate");
} else if (aqi >= 101 && aqi <= 150) {
  console.log("Unhealthy (Sensitive Groups)");
} else if (aqi >= 151 && aqi <= 200) {
  console.log("Unhealthy");
} else if (aqi >= 201 && aqi <= 300) {
  console.log("Very Unhealthy");
} else {
  console.log("Hazardous");
}

// --------------------------------------------
// EXERCISE 17: ROCK PAPER SCISSORS
// Player picks 0, 1, or 2
// Computer picks random 0-2
// Determine winner using conditionals
// --------------------------------------------

//Was confusing on this one, had to look up the answer and get an explanation

// Choices lookup
const choices = ["Rock", "Paper", "Scissors"];

// Player & computer choices (0–2)
let player = Math.floor(Math.random() * 3);
let computer = Math.floor(Math.random() * 3);

// Show readable choices
console.log("Player picked:", choices[player]);
console.log("Computer picked:", choices[computer]);

// Game logic
if (player === computer) {
  console.log("It's a tie!");

} else if (
  (player === 0 && computer === 2) || // Rock beats Scissors
  (player === 1 && computer === 0) || // Paper beats Rock
  (player === 2 && computer === 1)    // Scissors beats Paper
) {
  console.log("The player won!");
} else {
  console.log("The computer won!");
}
