/*
Some knowleage you need to know 
querySelectorAll()
addEventListener()
forEach()
if/else statements

Mục đích viết phần javascript để thực hiện phần animation khi người dùng thực hiện events 
*/


// select elements 
const items = document.querySelectorAll('section');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');



// event listener 
next.addEventListener('click', nextfunction);
prev.addEventListener('click', prevfunction);

items.forEach(function(item, index){
 item.style.left = `${index*100}%`;
})

let counter = 0;

// function
// next.addEventListener("click", function () {
//   counter++;
//   carousel();
//   console.log(counter);
// });

// prev.addEventListener("click", function () {
//   counter--;
//   carousel();
//   console.log(counter);
// });
function nextfunction(){
  counter++;
  carousel();
}


function prevfunction(){
  counter--;
  carousel();
}

function carousel() {
  // working with slides
  if (counter === items.length) {
    counter = 0;
  }
  if (counter < 0) {
    counter = items.length - 1;
  }
  // working with buttons

  if (counter < items.length - 1) {
    next.style.display = "inline-block";
  } else {
    next.style.display = "none";
  }
  if (counter > 0) {
    prev.style.display = "inline-block";
  } else {
    prev.style.display = "none";
  }
  items.forEach(function (item) {
    item.style.transform = `translateX(${-counter * 100}vw)`;
  });
}


// show-case
prev.style.display = "none";