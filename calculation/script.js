/*
| Stage | Difficulty | Available Question Types | Notes |
|------:|------------|--------------------------|-------|
| 1–3 | Extremely Easy | `add`, `sub` | Single-digit addition & subtraction |
| 4–5 | Easy | `add`, `sub`, `mul` | Multiplication unlocked |
| 6–8 | Intermediate | `add`, `sub`, `mul`, `div` | Division unlocked |
| 9–14 | Difficult | `mul`, `div`, `add2`, `sub2` | `add` & `sub` removed |
| 15–19 | Expert | `mul`, `div`, `add2`, `sub2`, `mul2` | Two-digit multiplication added |
| 20–24 | Human Calculator | `mul`, `div`, `add2`, `sub2`, `mul2`, `complex_A1` | `a + b - c` |
| 25–29 | Human Calculator | `mul`, `div`, `add2`, `sub2`, `mul2`, `complex_A1`, `complex_B1`, `complex_B2` | `a × b - c`, `b ÷ a - c` |
| 30–34 | Master | `div`, `add2`, `sub2`, `mul2`, `complex_A1`, `complex_B1`, `complex_B2`, `mul3` | `mul` removed, `mul3` added |
| 35–39 | Elite | `add2`, `sub2`, `mul2`, `complex_A1`, `complex_B1`, `complex_B2`, `mul3`, `div2` | `div` removed, `div2` added |
| 40+ | Impossible | `add2`, `sub2`, `mul2`, `complex_A1`, `complex_B1`, `complex_B2`, `mul3`, `div2`, `add3`, `sub3` | Large addition & subtraction added |

===========================
   VARIABLES
=========================== */

let stage = 10000;

let correctAnswer = 0;

let time = 10;

let timerInterval;

let A = 0;
let B = 0;
let C = 0;

/* ===========================
   RANDOM
=========================== */

function random(min,max){

    return Math.floor(
        Math.random()*(max-min+1)
    ) + min;
}

/* ===========================
   DIFFICULTY
=========================== */

function getDifficulty(){

    if(stage <= 2)
        return "Extremely Easy";

    if(stage <= 5)
        return "Easy";

    if(stage <= 8)
        return "Intermediate";

    if(stage <= 12)
        return "Difficult";

    if(stage <= 17)
        return "Expert";
    
    if(stage <= 25)
        return "Human calculator";

    if(stage <= 30)
        return "Master";

    if(stage <= 40)
        return "Elite";
    

    return "Impossible";
}

/* ===========================
   STATUS BALL
=========================== */

function flash(color){

    let ball =
    document.getElementById("ball");

    ball.style.background=color;

    ball.style.boxShadow=
    `0 0 40px ${color}`;

    setTimeout(()=>{

        ball.style.background="gray";

        ball.style.boxShadow=
        "0 0 20px gray";

    },700);
}

/* ===========================
   QUESTION GENERATOR
=========================== */

function generateQuestion(){

    time=10;
    
    document
    .getElementById("difficulty")
    .textContent =
    getDifficulty();

    let types = [

        "add",

        "sub"

    ];

    if(stage >= 4){

        types.push("mul");

    }

    if(stage >= 6){

        types.push("div");

    }

    if(stage >= 9){

        types.push("add2");

        types.push("sub2");

        types.splice(0, 2); 


    }

    if(stage >= 15){

        types.push("mul2");


    }

    if(stage >= 20){

        types.push("complex_A1");

    }
    if(stage >= 25){

        types.push("complex_B1");
        types.push("complex_B2");

    }

    if(stage >= 30){

        types.push("mul3");
        
        types.splice(types.indexOf("mul"), 1);

    }
    
    if(stage >= 35){
        types.push("div2");

        types.splice(types.indexOf("div"), 1);

    }

    if(stage >= 40){
        types.push("add3");
        types.push("sub3");
    }

    let type =
    types[random(0,types.length-1)];

    let q="";

    /* EASY */

    if(type==="add"){

        let a=random(1,10);
        let b=random(1,10);

        q=`${a} + ${b}`;

        correctAnswer=a+b;
    }

    else if(type==="sub"){

        let a=random(1,20);
        let b=random(1,a);

        q=`${a} - ${b}`;

        correctAnswer=a-b;
    }

    /* MULTIPLICATION */

    else if(type==="mul"){

        let a=random(1,10);
        let b=random(1,10);

        q=`${a} × ${b}`;

        correctAnswer=a*b;
    }

    /* DIVISION */

    else if(type==="div"){

        let ans=random(1,10);

        let b=random(1,10);

        let a=ans*b;

        q=`${a} ÷ ${b}`;

        correctAnswer=ans;
    }

    /* 2 DIGIT + */

    else if(type==="add2"){

        let a=random(10,50);
        let b=random(10,50);

        q=`${a} + ${b}`;

        correctAnswer=a+b;
    }

    /* 2 DIGIT - */

    else if(type==="sub2"){

        let a=random(20,50);
        let b=random(10,a);

        q=`${a} - ${b}`;

        correctAnswer=a-b;
    }

    /* MEDIUM MULTIPLICATION */

    else if(type==="mul2"){

       let a = random(10, 30);
       let b = random(2, 15);

       q = `${a} × ${b}`;

       correctAnswer = a * b;
   }
    

    /* A+B-C */

    else if(type==="complex_A1"){

        let a=random(1,20);
        let b=random(1,20);
        let c=random(1,10);

        q=`${a} + ${b} - ${c}`;

        correctAnswer=a+b-c;
    }

    /* A×B-C */

    else if(type==="complex_B1"){

        let a=random(2,15);
        let b=random(2,15);
        let c=random(1,20);

        q=`${a} × ${b} - ${c}`;

        correctAnswer=a*b-c;

        A=a
        B=b
        C=c
 
    }

    /* B÷A-C */

    else if(type==="complex_B2"){

        let a=random(2,10);

        let ans=random(2,10);

        let b=a*ans;

        let c=random(1,10);

        q=`${b} ÷ ${a} - ${c}`;

        correctAnswer=ans-c;
    }

    else if(type==="mul3"){

        let a=random(10,50);

        let b=random(10,50);

        q=`${a} × ${b}`;

        correctAnswer=a*b;

        A=a
        B=b
    }


    else if(type==="div2"){

        let ans=random(1,10);
        let b=random(2,20);

        let a=ans*b
        q=`${a} ÷ ${b}`;

        correctAnswer=a/b;
    }


    else if(type==="add3"){

        let a=random(50,200);

        let b=random(50,200);

        q=`${a} + ${b}`;

        correctAnswer=a+b;

        A=a
        B=b
        
    }

    else if(type==="sub3"){

        let a=random(50,200);

        let b=random(30,a);

        q=`${a} - ${b}`;

        correctAnswer=a-b;

        A=a
        B=b
    }


// Time Management//


    if (type == "complex_B1") {
        if (A > 10 && B > 10) {
            time = 20;
            }
        else{
            time = 15;}
        
    }

    else if (type == "add2" || type == "sub2") {
        if (A >= 20 && B >= 20) {
            time = 15;
        }
    }
    else if (type == "mul2") {
        if (A >= 11 && B >= 11) {
            time = 15;
        }
    }

    else if (type == "div2") {
        time = 12;
    }
        
    else if (type == "mul3") {
        time = 15;
    }
        
    else if (type == "add3" || type == "sub3") {
        if (A >= 100 && B >= 100) {
            time = 15;
        }
    }
    document
    .getElementById("question")
    .textContent=q;

    document
    .getElementById("answer")
    .value="";

    document
    .getElementById("answer")
    .focus();

    startTimer(time);
}

/* CHECK ANSWER */

function checkAnswer(){

    let answer=
    Number(
        document
        .getElementById("answer")
        .value
    );

    if(answer===correctAnswer){

        stage++;

        flash("lime");

    }

    else{

        stage=Math.max(1,stage-1);

        flash("red");
    }

    document
    .getElementById("stage")
    .textContent=stage;

    generateQuestion();
}

/* TIMER */

function startTimer(time){

    clearInterval(timerInterval);

    document
    .getElementById("timer")
    .textContent=time;

    timerInterval=
    setInterval(()=>{

        time--;

        document
        .getElementById("timer")
        .textContent=time;

        if(time<=0){

            clearInterval(timerInterval);

            stage=
            Math.max(1,stage-1);

            document
            .getElementById("stage")
            .textContent=stage;

            flash("red");

            generateQuestion();
        }

    },1000);
}



/* ENTER KEY */

document
.getElementById("answer")
.addEventListener(
"keydown",
function(e){

    if(e.key==="Enter"){

        checkAnswer();
    }

});

/* START GAME */

generateQuestion();
