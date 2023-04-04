const endpoint = 'https://api.ibeng.tech/api/game/tebaklirik?apikey=tamvan';
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const resultEl = document.getElementById('result');
const timerEl = document.getElementById('timer');

let question = '';
let answerQuestion = '';
let remainingTime = 30;

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
        refresh();
    } else {
        resultEl.innerHTML = '<span class="text-red-600 font-semibold">Salah!</span>';
    }
}
