

const weekdays = 
  [
    'Monday',
    'Tuesday',
    'Wesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

const months =
[
    'Junuary',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]


const items = document.querySelectorAll('p');
// console.log(items);
let tempDate = new Date();
let tempyear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

const futureDate = new Date(tempyear,tempMonth,tempDay+10, 11, 20, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];

const date = futureDate.getDate();

let weekday = futureDate.getDay();
weekday = weekdays[weekday];


// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime(){
const today = new Date().getTime();
const t = futureTime - today;

/*
The getTime() method returns the number of milliseconds since January 1, 1970
newDate().getTime will return the number of time between now and January 1, 1970
*/
// console.log(t);
// 1s = 1000ms;
// 1m = 60s;
// 1hr = 60min;
// 1d = 24hr;

// values in ms
const oneDay = 24*60*60*1000;
const oneHour = 60*60*1000;
const oneMinute = 60*1000;


//caculate all values
let days = t / oneDay;
days =  Math.floor(days);
// console.log(days);
let hours = Math.floor((t % oneDay) / oneHour);
console.log(hours);
let minutes = Math.floor((t%oneHour)/ oneMinute);
let seconds = Math.floor((t%oneMinute)/1000);



// set values array 
const values = [days, hours, minutes, seconds];

function format(item){
  if(item < 10){
    return item = `0${item}`
  }
  return item;
}

items.forEach(function(item1, index){
  item1.innerHTML = format(values[index]);
  console.log(item1);
});

if(t < 0){
  clearInterval(countdown);
}
}

// countdown 
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();



// nha??y ti????n t????i t???? curentTime ??????n phu??t gi???? nga??y => ????y la?? th????i gian h????t give away trong t????ng lai
// give away se?? la?? 10 nga??y ti??nh t???? th????i ??i????m b??y gi???? 


// ba??n mu????n l????y theo ??i??nh da??ng na??o 24 12 2050

/*
c????n l????y th????i gian t???? b??y gi???? cho ??????n 1 th????i ??i????m trong t????ng lai ??i??nh nga??y h????t ha??n, cho th????i gian ??????m ng??????c
*/

// set the time of give away is off
// we use set function


// la??m sao ?????? t???? ??????ng c????p nh????t li??n tu??c va?? ??u??ng du??ng setInterval

/*
c????n ta??o ra 1 thu????t toa??n hoa??n ha??o 
ba??n cu??ng c????n ti??m hi????u th??m v???? JS Timing, getTime()
*/

// sau khi bi????t ba??n mu????n thu????t toa??n gi?? thi?? ba??n co?? th???? search google ho????c overflow ho????c co?? th???? t???? nghi?? 


