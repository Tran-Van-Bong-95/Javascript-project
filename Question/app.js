// plus-icon
const plus = document.querySelectorAll('.plus-icon');

// minus-icon
const minus = document.querySelectorAll('.minus-icon');

const article = document.querySelectorAll('article');

for (let i = 0; i < plus.length; i++){
 plus[i].addEventListener('click', function(){
 minus[i].style.display = 'inline';
 plus[i].style.display = 'none';
 article[i].style.display = 'block';
});
}

for (let j = 0; j < minus.length; j++){
minus[j].addEventListener('click', function(){
 article[j].style.display = 'none';
 plus[j].style.display = 'inline';
 minus[j].style.display = 'none';
})
}

