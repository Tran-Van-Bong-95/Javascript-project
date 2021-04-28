const close_tab = document.getElementById('close');

const special = document.querySelector('.special');

const btn = document.querySelector('#btn');
;


btn.addEventListener('click', function(){
special.classList.toggle('show-sidebar');
})


close_tab.addEventListener('click', function(){
special.classList.remove('show-sidebar');
})

// close_tab.addEventListener('click', function(){
//  special.style.transition = "transform linear 0.5s";
//  special.style.transform = 'translate(-30vw)';
// })


