

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

// Survey page

//Form1 submit event
const form = document.getElementById('surveyForm1');

form.addEventListener("submit",(e) =>{
    const choice = document.querySelector('input[name=editor]:checked').value;
    const data = {editor: choice};

    fetch('http://localhost:4000/poll',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

    e.preventDefault();
});

fetch('http://localhost:4000/poll')
.then(res => res.json())
.then(data =>{
    const votes = data.votes;
    const totalVotes = votes.length;
    //Count vote points - acc/current
    const voteCounts = votes.reduce((acc,vote) => 
    ((acc[vote.editor] = (acc[vote.editor] || 0) + parseInt(vote.points)), acc),{});

    let dataPoints = [
        { label: 'Atom', y: voteCounts.Atom},
        { label: 'Webstorm', y: voteCounts.Webstorm},
        { label: 'Vscode', y: voteCounts.Vscode},
        { label: 'Other', y: voteCounts.Other},
    ]
    
    const chart1 = document.getElementById('result1');
    if(chart1) {
        const chart = new CanvasJS.Chart('result1',{
            animationEnabled: true,
            theme: 'theme1',
            title: {
                text: `Total Votes ${totalVotes}`
            },
            data:[
                {
                    type: 'column',
                    dataPoints: dataPoints
                }
            ]
        });
        chart.render();
    
         // Enable pusher logging - don't include this in production
         Pusher.logToConsole = true;
    
         var pusher = new Pusher('0e394f1ae6051d158c42', {
           cluster: 'eu'
         });
     
         var channel = pusher.subscribe('editor-survey');
         channel.bind('editor-vote', function(data) {
            dataPoints = dataPoints.map(x => {
                if(x.label == data.editor) {
                    x.y += data.points;
                    return x;
                } else {
                    return x;
                }
            });
            chart.render();
         });
    }
})


