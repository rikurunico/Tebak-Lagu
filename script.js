const endpoint = 'https://api.ibeng.tech/api/game/tebaklirik?apikey=tamvan';
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const resultEl = document.getElementById('result');
const timerEl = document.getElementById('timer');
const pointEl = document.getElementById('point');

let question = '';
let answerQuestion = '';
let remainingTime = 30;
let point = getCookie('point') || 0;
pointEl.innerText = point;

function addPoint() {
    point++;
    setCookie('point', point, 7); // set cookie dengan expired time 7 hari
    pointEl.innerText = point;
}

function refresh() {
    window.location.reload();
}

function updateTimer() {
    timerEl.innerText = `${remainingTime} detik`;
    remainingTime--;
    if (remainingTime < 0) {
        refresh();
    }
}

fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        question = data.result.question;
        answerQuestion = data.result.answer.toLowerCase();
        questionEl.innerText = question;
        setInterval(updateTimer, 1000); // set interval untuk update waktu setiap detik
    })
    .catch(error => console.error(error));

function checkAnswer() {
    const answer = answerEl.value.toLowerCase();
    if (answer === '') {
        alert('Jawaban tidak boleh kosong');
        return;
    }

    if (answer === answerQuestion) {
        resultEl.innerHTML = '<span class="text-green-600 font-semibold">Benar!</span>';
        addPoint();
        refresh();
    } else {
        resultEl.innerHTML = '<span class="text-red-600 font-semibold">Salah!</span>';
    }
}

// fungsi untuk mengambil nilai cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}

// fungsi untuk mengatur nilai cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}
