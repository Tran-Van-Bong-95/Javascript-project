const increase = document.getElementById('increase');
const decrease = document.getElementById('decrease');
const reset = document.getElementById('reset');
const number1 = document.querySelector('#number');

let number = 0;

 decrease.addEventListener('click',function(){
  number--;
  number1.textContent = number;
  if(number > 0){
   number1.style.color = 'green';
  }else if(number < 0){
   number1.style.color ='red';
  }else{
   number1.style.color = 'black';
  }
 });

 reset.addEventListener('click',function(){
  number = 0;
  number1.textContent = number;
  number1.style.color = 'black';
 });

 increase.addEventListener('click', function(){
  number++;
  number1.textContent = number;
  if(number > 0){
   number1.style.color = 'green';
  }else if(number < 0){
   number1.style.color ='red';
  }else{
   number1.style.color = 'black';
  }
 });

//  cách làm này khá thủ công, xem thêm cách làm của youtuber 

