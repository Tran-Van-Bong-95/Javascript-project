/*
tạo ra object
 get days
 get months
 get years
 get seconds

 Xem như đây là 1 bài kiểm tra độ hiểu biết và các sử dụng date Object
*/

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



// nhảy tiến tới từ curentTime đến phút giờ ngày => đây là thời gian hết give away trong tương lai
// give away sẽ là 10 ngày tính từ thời điểm bây giờ 


// bạn muốn lấy theo định dạng nào 24 12 2050

/*
cần lấy thời gian từ bây giờ cho đến 1 thời điểm trong tương lai định ngày hết hạn, cho thời gian đếm ngược
*/

// set the time of give away is off
// we use set function


// làm sao để tự động cập nhật liên tục và đúng dùng setInterval

/*
cần tạo ra 1 thuật toán hoàn hảo 
bạn cũng cần tìm hiểu thêm về JS Timing, getTime()
*/

// sau khi biết bạn muốn thuật toán gì thì bạn có thể search google hoặc overflow hoặc có thể tự nghĩ 


