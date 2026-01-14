// ============================================
// TUTORIAL 1-0: CODEDEX VARIABLES
// Student: [Kenia Uribe]
// Date: [1.13.26]
// ============================================

// --------------------------------------------
// EXERCISE 6: LET & CONST
// Create 4 variables for a user profile:
// - Two const variables 
// - Two let variables 
// Print them all, then reassign one let variable
// --------------------------------------------

let currentLocation = "Uni";
currentLocation = "home";
let mood = "Meh";
const firstName = "Kenia";
const favoriteColor = "BLUE";
console.log(currentLocation);
console.log(mood);
console.log(firstName);
console.log(favoriteColor);

// --------------------------------------------
// EXERCISE 7: DATA TYPES
// Create variables for your favorite company:
// 
// Print them all
// --------------------------------------------

let companyName = "kei_studio";
const foundingYear = 2025;
let isActive = true;
let fundingAmount;
console.log(companyName);
console.log(foundingYear);
console.log(isActive);
console.log(fundingAmount);

// --------------------------------------------
// EXERCISE 8: TEMPERATURE
// Convert Spokane's temperature from °F to °C
// Formula: (fahrenheit - 32) / 1.8
// --------------------------------------------

let farenheit = 47;
const celsius = (farenheit-32)/1.8;
console.log(celsius);

// --------------------------------------------
// EXERCISE 9: TIP CALCULATOR
// Calculate tip and total from a bill
// - billAmount, tipPercent
// - tipAmount = billAmount * (tipPercent / 100)
// - total = billAmount + tipAmount
// --------------------------------------------

const bill = 20;
const tipPercent = .18;
let tipAmount = 20 * .18;
let total = bill + tipAmount;
console.log(total);

// --------------------------------------------
// EXERCISE 10: PLAYLIST DURATION
// Calculate total playlist length
// - numberOfSongs, avgSongLength (in minutes)
// - totalMinutes, hours, remainingMinutes
// Format the output nicely
// --------------------------------------------

let totalSongs = 6;
let songLength = 3;
let playlistLength = totalSongs * songLength;
console.log(playlistLength);