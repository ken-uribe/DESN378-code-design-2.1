// --------------------------------------------
// THEME PREFERENCE SYSTEM
// --------------------------------------------
// This script does three things:
// 1. Loads a saved theme from localStorage on page load
// 2. Applies that theme by writing state to the <html> element
// 3. Allows the user to toggle and persist a new preference
// --------------------------------------------

// --------------------------------------------
// 1. LOAD SAVED THEME (runs immediately)
// --------------------------------------------
console.log("Checking localStorage for saved theme...");

// Ask the browser if a theme preference was saved earlier
const savedTheme = localStorage.getItem("theme");

// If a saved preference exists, apply it
if (savedTheme) {
  // This creates or updates: <html data-theme="dark|light">
  // The attribute does NOT need to exist in the HTML beforehand
  console.log(`Saved theme found: ${savedTheme}`);
  document.documentElement.dataset.theme = savedTheme;
  console.log("Applied saved theme to <html> element");
} else {
  console.log("No saved theme found. Using default styles.");
}

// If no saved theme exists:
// - data-theme is not set
// - CSS defaults apply
// - system preferences can be checked later

// --------------------------------------------
// 2. SELECT THE TOGGLE CONTROL
// --------------------------------------------

// Grab the button or switch the user clicks
const toggle = document.querySelector(".theme-toggle");

console.log("Theme toggle element selected:", toggle);

// --------------------------------------------
// 3. HANDLE USER INTERACTION
// --------------------------------------------

toggle.addEventListener("click", function () {
  console.log("---");
  console.log("Theme toggle clicked");

  // Read the current theme state from the DOM
  // This is NOT checking CSS
  // This is reading state stored on the <html> element
  const currentTheme = document.documentElement.dataset.theme;

  console.log("Current theme from DOM:", currentTheme);

  // Determine the next theme
  let newTheme;

  if (currentTheme === "dark") {
    newTheme = "light";
  } else {
    newTheme = "dark";
  }

  console.log("New theme calculated:", newTheme);
  // --------------------------------------------
  // 4. APPLY AND PERSIST STATE
  // --------------------------------------------

  // Write the new state to the DOM
  // This updates the live HTML and triggers CSS
  document.documentElement.dataset.theme = newTheme;
  console.log("Updated <html> data-theme attribute");
  // Save the preference so it survives refreshes
  localStorage.setItem("theme", newTheme);
  console.log("Saved new theme to localStorage");
});