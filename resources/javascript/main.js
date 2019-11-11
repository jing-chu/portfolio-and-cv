

function openNav() {
    document.getElementById("mySidenav").style.width = "20rem";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

let overlay = document.getElementsByClassName("overlay");
let projectImg = document.querySelectorAll(".project-img");

for (let i=0; i< overlay.length; i++) {
    
    overlay[i].onmouseover = function(){ 
    projectImg[i].filter = "blur(5px)";
    projectImg[i].opacity= 0.8
    };
}

console.log(overlay)
console.log(projectImg)

function openLetter() {
  document.getElementById("Cover-Letter").style.display = "flex";
  document.getElementById("CV").style.display = "none";
  document.getElementsByClassName("tablinks")[0].style.backgroundColor = "#faeaea";
  document.getElementsByClassName("tablinks")[1].style.backgroundColor = "initial";
  
 }

 function openCV() {
  document.getElementById("Cover-Letter").style.display = "none";
  document.getElementById("CV").style.display = "flex";
  document.getElementById("defaultOpen").style.backgroundColor = "initial";
  document.getElementsByClassName("tablinks")[1].style.backgroundColor = "#faeaea";

 } 

    