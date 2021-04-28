// MDN]
/*
The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and dubframes to finish loading

The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images
*/

const btn = document.querySelector('.switch-btn');
const video = document.querySelector('.video-container');

btn.addEventListener('click', function(){
 if(!btn.classList.contains('slide')){
  btn.classList.add('slide');
  video.pause();
 }else{
  btn.classList.remove('slide');
  video.play();
 }
});
// thêm class slide thì switch bị override thuộc tính left: 50%;
// còn ngược lại remove thì switch lại không bị override và left: 0;


// preloader
const preloader = document.querySelector('.preloader');

window.addEventListener('load', function(){
 preloader.classList.add('hide-preloader');
});

// phân biệt event 'load' và event 'DOMContentLoaded'
/*
Differences
The DOMContentLoaded event fires when all the nodes in the page have been constructed in the DOM tree. The load event fires when all resources such as images and sub-frames are loaded "completely".

Ở đây tại sao lại dùng 'load' áp dụng trên button vì phải đợi whole page loaded và  including all dependent resources such as stylesheets and images, video
*/


