// element.getBoundingClientRec() 
// pageYOffset
// slice
// offsetTop

// calculate the height 
/*
tính toán độ dài cuộn nếu lớn hơn chiều cao navbar thì style lại navbar có background là white 

nếu nhỏ hơn thì giữ nguyên không thay đổi

*/

const navbar1 = document.querySelector('.navbar');
const link = document.querySelectorAll('.link');

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar1.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar1.style.background = 'white';
    link.forEach(m => {
     m.style.color = 'black';
    });
   
  } else {
    navbar1.style.background = 'transparent';
      link.forEach(m => {
     m.style.color = 'white';
    });
  }
 
});

// do this exercise again 