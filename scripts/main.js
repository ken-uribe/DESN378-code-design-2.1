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
//Auto-Generated Project Nav
const username = 'ken-uribe';
const repo = 'DESN378-code-design-2.1';

fetch('https://api.github.com/repos/' + username + '/' + repo + '/git/trees/main?recursive=1')
  .then(res => res.json())
  .then(data => {
    const nav = document.querySelector('nav');
    
    const indexFiles = data.tree
      .filter(item => item.path.endsWith('/index.html'))
      .map(item => item.path.replace('/index.html', ''));

    const weeks = {};
    indexFiles.forEach(path => {
      const parts = path.split('/');
      if (parts.length === 2) {
        const week = parts[0];
        const project = parts[1];
        if (!weeks[week]) weeks[week] = [];
        weeks[week].push(project);
      }
    });

    const ul = document.createElement('ul');
    nav.appendChild(ul);

    Object.keys(weeks).sort().forEach(week => {
      const li = document.createElement('li');
      li.textContent = week;
      ul.appendChild(li);

      const subUl = document.createElement('ul');
      li.appendChild(subUl);

      weeks[week].forEach(project => {
        const subLi = document.createElement('li');
        const link = document.createElement('a');
        link.href = week + '/' + project + '/';
        link.textContent = project;
        subLi.appendChild(link);
        subUl.appendChild(subLi);
      });
    });
  });
// Week 1: You'll add theme toggle code here
// Week 2: You'll add localStorage persistence here
// Week 3+: More to come...


