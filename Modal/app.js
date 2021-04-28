const button = document.querySelector('#btn');
const inner = document.querySelector('#inner');
const close_tab = document.querySelector('.close');
const outer = document.querySelector('.special');
const all = document.getElementById('hay');

all.style.visibility = 'hidden';

button.addEventListener('click', function(){
outer.classList.toggle('show-inner');
all.style.visibility = 'visible';
});

close_tab.addEventListener('click', function(){
 outer.classList.remove('show-inner');
 all.style.visibility = 'hidden';
})

