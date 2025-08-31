// function add() {
//     var input1 = document.getElementById("num1").value;
//     var input2 = document.getElementById("num2").value;
//     document.getElementById("result").innerHTML = parseInt(input1)+parseInt(input2);
// }
// function sub() {
//     var input1 = document.getElementById("num1").value;
//     var input2 = document.getElementById("num2").value;
//     document.getElementById("result").innerHTML = parseInt(input1)-parseInt(input2);
// }
// function mul() {
//     var input1 = document.getElementById("num1").value;
//     var input2 = document.getElementById("num2").value;
//     document.getElementById("result").innerHTML = parseInt(input1)*parseInt(input2);
// }
// function div() {
//     var input1 = document.getElementById("num1").value;
//     var input2 = document.getElementById("num2").value;
//     document.getElementById("result").innerHTML = parseInt(input1)/parseInt(input2);
// }


// function arithmetic(op){
//     var input1 = document.getElementById("num1").value;
//     var input2 = document.getElementById("num2").value;
//     var ans = eval(input1 + op + input2);
//     document.getElementById("result").innerHTML = ans;
// }

var num = 0;
window.onload = function(){
    while (((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight)) {
        addnew();
    }
};

window.onscroll = function() {
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
        addnew();
    }
};

function addnew(){
    num+=1;
    var newdiv = document.createElement("div");
    newdiv.innerHTML = `<div style="background-color : gray; border: 2px solid black;"><h2>Post ${num}</h2></div>`;
    document.body.appendChild(newdiv);
}
