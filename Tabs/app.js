
// create an array contains data

const section = [
 {
id: 1,
title: `History`,
info: `I'm baby wolf pickled schlitz try-hard normcore marfa man bun mumblecore vice pop-up XOXO lomo kombucha glossier bicycle rights. Umami kinfolk salvia jean shorts offal venmo. Knausgaard tilde try-hard, woke fixie banjo man bun. Small batch tumeric mustache tbh wayfarers 8-bit shaman chartreuse tacos. Viral direct trade hoodie ugh chambray, craft beer pork belly flannel tacos single-origin coffee art party migas plaid pop-up.s`

 },

 {
id: 2,
title: `Vision`,
info: `Man bun PBR&B keytar copper mug prism, hell of helvetica. Synth crucifix offal deep v hella biodiesel. Church-key listicle polaroid put a bird on it chillwave palo santo enamel pin, tattooed meggings franzen la croix cray. Retro yr aesthetic four loko tbh helvetica air plant, neutra palo santo tofu mumblecore. Hoodie bushwick pour-over jean shorts chartreuse shabby chic. Roof party hammock master cleanse pop-up truffaut, bicycle rights skateboard affogato readymade sustainable deep v live-edge schlitz narwhal.`
 },

 {
id: 3,
title: `Goals`,
info: `Chambray authentic truffaut, kickstarter brunch taxidermy vape heirloom four dollar toast raclette shoreditch church-key. Poutine etsy tote bag, cred fingerstache leggings cornhole everyday carry blog gastropub. Brunch biodiesel sartorial mlkshk swag, mixtape hashtag marfa readymade direct trade man braid cold-pressed roof party. Small batch adaptogen coloring book heirloom. Letterpress food truck hammock literally hell of wolf beard adaptogen everyday carry. Dreamcatcher pitchfork yuccie, banh mi salvia venmo photo booth quinoa chicharrones.`
 }
]

/*
trước khi gõ code cần tìm ra phương pháp
ghi từng bước thực hiện 
DOMContentLoaded 
*/
// lấy dữ liệu từng vùng cụ thể 


const  purpose = document.querySelector('.specific');
const know_More = document.querySelector('.about');

let curentElement = 0;

window.addEventListener('DOMContentLoaded', function(){
purpose.textContent = section[ curentElement].title;
know_More.textContent = section[ curentElement].info;
}); 

function show(text){
 const items = section[text];
purpose.textContent = items.title;
know_More.textContent = items.info;
}
/*
items sẽ là section[0], section[1], section[2]
*/
// addEventListener 
// toggle 

const btn_li = document.querySelectorAll('.btn');
const navbar1 = document.querySelector('.navbar');

for (let i = 0; i < btn_li.length; i++ ){
 
 btn_li[i].addEventListener('click',
 function(){
   show(i);
   btn_li[i].classList.toggle('toggle_class');
});
}



// nếu toggle() không apply đó không phải là do javascript mà do CSS selector, bạn thử xem xét kĩ quyền ưu tiên để thay đổi css cho phù hợp
// thử thay bằng add và remove xem sao 


// tập làm bài này với forEach()
/*
phân tích bài làm: luôn chọn History 
khi chọn cái khác thì phông nền cái chọn là màu trắng và các phím không được chọn trở lại phông nền màu xám

*/