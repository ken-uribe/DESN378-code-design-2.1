// 1. Grab all the story sections
const sections = document.querySelectorAll(
  '.Intro, .Part1, .Part2, .Part3, .Part4, .Part5'
);

// 2. Grabs all Next and Back buttons
const nextButtons = document.querySelectorAll('.Next');
const backButtons = document.querySelectorAll('.Back');

// 3. Keep track of which section is showing
let currentIndex = 0;

// 4. Hide all sections except the first one
sections.forEach((section, index) => {
  if (index !== currentIndex) {
    section.classList.add('hidden');
  }
});

// 5. NEXT button logic
nextButtons.forEach(button => {
  button.addEventListener('click', () => {
    sections[currentIndex].classList.add('hidden');
    currentIndex++;
    sections[currentIndex].classList.remove('hidden');
  });
});

// 6. BACK button logic
backButtons.forEach(button => {
  button.addEventListener('click', () => {
    sections[currentIndex].classList.add('hidden');
    currentIndex--;
    sections[currentIndex].classList.remove('hidden');
  });
});
