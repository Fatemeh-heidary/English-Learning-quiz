localStorage.removeItem("studentName");
localStorage.removeItem("studentDegree");
function toggleMenu() {
    let menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

/* نمایش درس‌ها */
function showLesson(lesson) {
    let box = document.getElementById("lessonContent");
    let text = "";

    if (lesson === "lesson1") {
        text = `
        <h3>درس ۱: ضمیرها</h3>
        <p>I, You, He, She, It, We, They</p>
        <ul>
            <li>I am a student.</li>
            <li>She is my friend.</li>
            <li>They are teachers.</li>
        </ul>`;
    }

    if (lesson === "lesson2") {
        text = `
        <h3>درس ۲: زمان‌ها</h3>
        <p>Present Simple</p>
        <ul>
            <li>I play football.</li>
            <li>She plays piano.</li>
            <li>They go to school.</li>
        </ul>`;
    }

    if (lesson === "lesson3") {
        text = `
        <h3>درس ۳: حروف تعریف</h3>
        <ul>
            <li>a / an برای چیزهای نامشخص</li>
            <li>the برای چیز مشخص</li>
            <li>She is an engineer.</li>
        </ul>`;
    }

    box.innerHTML = text;
    box.style.display = "block";
}

/* تایمر آزمون */
let timeLeft = 300;
let timerInterval;

function startQuiz() {

   let name=document.getElementById("fullname").value;
    let studentId=document.getElementById("studentId").value;
   let major=document.getElementById("degree").value;

   if (name== "" || studentId=="" || major=="") {
        alert("لطفاً همه فیلدها را پر کنید");
        return;
}
    localStorage.setItem("studentName" , name);
    localStorage.setItem("studentMajor" , major);

    // نمایش سوالات
    document.getElementById("quizBox").style.display = "block";

    // شروع تایمر
    timeLeft = 300; // ۵ دقیقه
    timerInterval = setInterval(() => {
        document.getElementById("timer").innerText = "زمان باقی‌مانده: " + timeLeft + " ثانیه";
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000);
}

/* پایان آزمون و انتقال به صفحه نتیجه */
function finishQuiz() {
    clearInterval(timerInterval);

    let score = 0;

    // محاسبه ۱۵ سؤال
    for (let i = 1; i <= 15; i++) {
        let answer = document.querySelector(`input[name="q${i}"]:checked`);
        console.log("سوال", i, answer);
        console.log(answer);

        if (answer) {
            console.log("value:", answer.value);
        }
        if (answer && answer.value === "1") {
            score++;
        }
    }

    // درصد از ۱۰۰
    let percent = (score / 15) * 100;

    // ذخیره نمره برای صفحه نتیجه
    localStorage.setItem("examScore", score);
    localStorage.setItem("examPercent", percent);

    // انتقال به صفحه نتیجه
    window.location.href = "result.html";
}
/* نمایش نتیجه در صفحه result.html */
function showResult() {

    let score = localStorage.getItem("examScore");
    let percent = localStorage.getItem("examPercent");

    let box = document.getElementById("resultBox");
    box.innerHTML = `
        <h2>نمره آزمون شما: ${score}</h2>
        <p>نمره شما : ${score}/15</p>
        <p>درصد کسب‌شده: ${percent}%</p>
    `;

}