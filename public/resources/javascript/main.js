

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

// ------------------------- Survey page --------------------------------

//Form1 submit event
const form1 = document.getElementById('surveyForm1');
const form2 = document.getElementById('surveyForm2');
const form3 = document.getElementById('surveyForm3');

form1.addEventListener("submit",(e) =>{
    const choice = document.querySelector('input[name=editor]:checked').value;
    const data = {question: "Q1", answer: choice};

    fetch('/poll',{
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

form2.addEventListener("submit",(e) =>{
    const choice = document.querySelector('input[name=server]:checked').value;
    const data = {question: "Q2", answer: choice};

    fetch('/poll',{
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

form3.addEventListener("submit",(e) =>{
    const choice = document.querySelector('input[name=bundler]:checked').value;
    const data = {question: "Q3", answer: choice};

    fetch('/poll',{
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

//
fetch('/poll')
.then(res => res.json())
.then(data =>{
    const votes = data.votes;
    //Count vote points - acc/current
    function getfrequency (votes){
        let obj={}
        votes.forEach(x=>{
            let key=x.answer
            if(key in obj){
                obj[key]+=1
            }else{
                obj[key]=1
            }
        })
        return obj
    }
  
    let voteCounts1=getfrequency(votes.filter(x=>{return x.question === 'Q1'}))
    let voteCounts2=getfrequency(votes.filter(x=>{return x.question === 'Q2'}))
    let voteCounts3=getfrequency(votes.filter(x=>{return x.question === 'Q3'}))  
    
    console.log("oooooooooooooooo"+JSON.stringify(voteCounts1))

    let dataPointsNo1 = [
        { label: 'Atom', y: voteCounts1.Atom},
        { label: 'Webstorm', y: voteCounts1.Webstorm},
        { label: 'Vscode', y: voteCounts1.Vscode},
        { label: 'Other', y: voteCounts1.Other},
    ]

    let dataPointsNo2 = [
        { label: 'HttpServer', y: voteCounts2.HttpServer},
        { label: 'LiveServer', y: voteCounts2.LiveServer},
        { label: 'Express', y: voteCounts2.Express},
        { label: 'Other', y: voteCounts2.Other},
    ]

    let dataPointsNo3 = [
        { label: 'Requirejs', y: voteCounts3.Requirejs},
        { label: 'Browserify', y: voteCounts3.Browserify},
        { label: 'Webpack', y: voteCounts3.Webpack},
        { label: 'Other', y: voteCounts3.Other},
    ]
    
    
    const chart1 = document.getElementById('result1');
    if(chart1) {
        //let totalVotes1 = votes.filter(x =>{return x.question === "Q1"})
        const chart = new CanvasJS.Chart('result1',{
            animationEnabled: true,
            theme: 'theme1',
            title: {
                text: ''
            },
            data:[
                {
                    type: 'column',
                    dataPoints: dataPointsNo1
                }
            ]
        });
        chart.render();
        //PUBLISH AN EVENT TO FRONTEND USING CHANNEL
         // Enable pusher logging - don't include this in production      
         Pusher.logToConsole = true;
        // Open a connection to Channels - key/cluster
         var pusher = new Pusher('0e394f1ae6051d158c42', {
           cluster: 'eu'
         });
         //Subscribe to a CHANNEL:  js-survey
         //Listen for EVENT on the channel: js-vote
         var channel = pusher.subscribe('js-survey');
         channel.bind('js-vote', function(data) {
            if(data.question === "Q1"){
                dataPointsNo1 = dataPointsNo1.map(x => {
                    if(x.label == data.answer) {
                        x.y += data.points;
                        return x;
                    } else {
                        return x;
                    }
                });
                const disBtn1 = document.getElementById("btn1").disabled=true
                chart.render();
            }
            
         });
        
    }


    const chart2 = document.getElementById('result2');
    if(chart2) {
        //let totalVotes2 = votes.filter(x =>{return x.question === "Q2"})
        const chart = new CanvasJS.Chart('result2',{
            animationEnabled: true,
            theme: 'theme1',
            title: {
                text: ''
            },
            data:[
                {
                    type: 'column',
                    dataPoints: dataPointsNo2
                }
            ]
        });
        chart.render();
                 
        Pusher.logToConsole = true;
        
        var pusher = new Pusher('0e394f1ae6051d158c42', {
           cluster: 'eu'
         });
         
        var channel = pusher.subscribe('js-survey');
        channel.bind('js-vote', function(data) {
            if(data.question === "Q2"){
                dataPointsNo2 = dataPointsNo2.map(x => {
                    if(x.label == data.answer) {
                        x.y += data.points;
                        return x;
                    } else {
                        return x;
                    }
                });
                const disBtn2 = document.getElementById("btn2").disabled=true
                chart.render();
            }
            
        });
         
    }

    const chart3 = document.getElementById('result3');
    if(chart3) {
        //let totalVotes3 = votes.filter(x =>{return x.question === "Q3"})
        const chart = new CanvasJS.Chart('result3',{
            animationEnabled: true,
            theme: 'theme1',
            title: {
                text: ''
            },
            data:[
                {
                    type: 'column',
                    dataPoints: dataPointsNo3
                }
            ]
        });
        chart.render();
        

        //PUBLISH AN EVENT TO FRONTEND USING CHANNEL
         // Enable pusher logging - don't include this in production      
         Pusher.logToConsole = true;
        // Open a connection to Channels - key/cluster
         var pusher = new Pusher('0e394f1ae6051d158c42', {
           cluster: 'eu'
         });
         //Subscribe to a CHANNEL:  js-survey
         //Listen for EVENT on the channel: js-vote
         var channel = pusher.subscribe('js-survey');
         channel.bind('js-vote', function(data) {
            if(data.question === "Q3"){
                dataPointsNo3 = dataPointsNo3.map(x => {
                    if(x.label == data.answer) {
                        x.y += data.points;
                        return x;
                    } else {
                        return x;
                    }
                });
                const disBtn3 = document.getElementById("btn3").disabled=true
                chart.render();
            }
            
         });
         
    }

})


