//localStorage.removeItem("studentName");
//localStorage.removeItem("studentDegree");
function toggleMenu() {
    let menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

/* Show lessons */
function showLesson(lesson) {
    let box = document.getElementById("lessonContent");
    let text = "";

    if (lesson === "lesson1") {
        text = `
        <h3>Lesson 1:Pronouns</h3>
        <p>I, You, He, She, It, We, They</p>
        <ul>
            <li>I am a student.</li>
            <li>She is my friend.</li>
            <li>They are teachers.</li>
        </ul>`;
    }

    if (lesson === "lesson2") {
        text = `
        <h3>Lesson 2:Tenses</h3>
        <p>Present Simple</p>
        <ul>
            <li>I play football.</li>
            <li>She plays piano.</li>
            <li>They go to school.</li>
        </ul>`;
    }

    if (lesson === "lesson3") {
        text = `
        <h3>Lesson 3:Articles</h3>
        <ul>
            <li>a / an for unspecified things</li>
            <li>the for specific thing</li>
            <li>She is an engineer.</li>
        </ul>`;
    }

    box.innerHTML = text;
    box.style.display = "block";
}

/* Quiz Timer */
let timeLeft = 300;
let timerInterval;

function startQuiz() {

   let name=document.getElementById("fullname").value;
   let major=document.getElementById("degree").value;

   if (name== "" || major=="") {
        alert("Please fill in all fields");
        return;
}
    localStorage.setItem("studentName" , name);
    localStorage.setItem("studentMajor" , major);


    // Show questions
    document.getElementById("quizBox").style.display = "block";

    // Start timer
    timeLeft = 300; // 5 minutes
    timerInterval = setInterval(() => {
        document.getElementById("timer").innerText = "Time remaining: " + timeLeft + " seconds";
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000);
}

/* Finish quiz and go to result page */
function finishQuiz() {
    clearInterval(timerInterval);

    let score = 0;

    //Calculate 15 questions
    for (let i = 1; i <= 15; i++) {
        let answer = document.querySelector(`input[name="q${i}"]:checked`);
        console.log("Question", i, answer);
        console.log(answer);

        if (answer) {
            console.log("value:", answer.value);
        }
        if (answer && answer.value === "1") {
            score++;
        }
    }

    //Percentage out of 100
    let percent = (score / 15) * 100;

   //Save score for result page
    localStorage.setItem("examScore", score);
    localStorage.setItem("examPercent", percent);

   //Go to result page
    window.location.href = "result.html";
}
/* show result on result.html */
function showResult() {
    let name=  localStorage.getItem("studentName");
    let score = localStorage.getItem("examScore");
    let percent = localStorage.getItem("examPercent");



    let box = document.getElementById("resultBox");
    box.innerHTML = `

        <h2>Your Exam Score: ${score}</h2>
        <p>Student Name : ${name}<p>
        <p>Your Score : ${score}/15</p>
        <p>Percentage Achieved: ${percent}%</p>
    `;

}
