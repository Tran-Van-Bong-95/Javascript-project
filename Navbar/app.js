
let btn = document.getElementById('btn')
let ul = document.getElementById('hay')
 ul.style.visibility = 'hidden';
 function kiemtra (){
  if(ul.style.visibility == 'hidden'){
      
     ul.style.visibility = 'visible';
   }else{
     ul.style.visibility = 'hidden';
   }
   }
  
btn.addEventListener('click', kiemtra
);

// method2: use toggle to "chuyển đổi" giữa 2 class 
/*
Đặc điểm của cách làm toggle này là ta sẽ style 1 class trước 
và 1 class khác ta để trong file css
khi ta click để toggle thì viết tên class trong file css là được 
*/
// try to use transition on btn
 
/*
w3school
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.mystyle {
  width: 100%;
  padding: 25px;
  background-color: coral;
  color: white;
  font-size: 25px;
  box-sizing: border-box;
}
</style>
</head>
<body>

<p>Click the "Try it" button to toggle between adding and removing the "mystyle" class name of the DIV element:</p>

<p><strong>Note:</strong> The classList property is not supported in IE9 and earlier. In this example, we check if the browser supports the classList.toggle() method. If not, use the className property together with other JS properties and methods to achieve the same result (for IE9).</p>

<button onclick="myFunction()">Try it</button>

<div id="myDIV">
This is a DIV element.
</div>

<script>
function myFunction() {
  var element = document.getElementById("myDIV");

  if (element.classList) { 
    element.classList.toggle("mystyle");
  } else {
    var classes = element.className.split(" ");
    var i = classes.indexOf("mystyle");

    if (i >= 0) 
      classes.splice(i, 1);
    else 
      classes.push("mystyle");
      element.className = classes.join(" "); 
  }
}
</script>

</body>
</html>


*/

