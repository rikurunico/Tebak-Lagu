const endpoint = 'https://api.ibeng.tech/api/game/tebaklirik?apikey=tamvan';
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const resultEl = document.getElementById('result');
const timerEl = document.getElementById('timer');
const pointEl = document.getElementById('point');

let question = '';
let answerQuestion = '';
let remainingTime = 45;
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

const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        question = data.result.question;
        answerQuestion = data.result.answer.toLowerCase();
        questionEl.innerText = question;
        updateTimer(); // tambahkan pembaruan timer saat pertanyaan dimuat
        setInterval(updateTimer, 1000); // set interval untuk update waktu setiap detik
        document.body.style.visibility = 'visible'; // tampilkan konten setelah halaman siap
    }
};


xhr.onerror = function () {
    Swal.fire({
        title: 'Yahh!',
        text: 'Terjadi kesalahan saat mengambil data!',
        icon: 'error',
        confirmButtonText: 'Oke'
    })
};

xhr.open('GET', endpoint, true);
xhr.send();
document.body.style.visibility = 'hidden'; // sembunyikan konten sampai halaman siap


function checkAnswer() {
    const answer = answerEl.value.toLowerCase();
    if (answer === '') {
        Swal.fire({
            title: 'Yahh!',
            text: 'Jawaban kamu belum diisi!',
            icon: 'error',
            confirmButtonText: 'Oke'
        })
        return;
    }

    if (answer === answerQuestion) {
        addPoint();
        //create pop up here and refresh page
        Swal.fire({
            title: 'Selamat!',
            text: 'Jawaban kamu benar!',
            icon: 'success',
            confirmButtonText: 'Lanjut',
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                refresh();
            }
        })

    } else {
        //create pop up here with button skip dan jawab ulang
        Swal.fire({
            title: 'Yahh!',
            text: 'Jawaban kamu salah!',
            icon: 'error',
            confirmButtonText: 'Jawab Ulang',
            showCancelButton: true,
            cancelButtonText: 'Skip',
            cancelButtonColor: '#d33',
            allowOutsideClick: false // set opsi allowOutsideClick menjadi false
        }).then((result) => {
            if (result.isConfirmed) {
                return;
            } else if (result.isDismissed) {
                skipQuestion();
            }
        })
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

// fungsi untuk menghapus nilai cookie
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
}

function resetScore() {
    Swal.fire({
        title: 'Apakah kamu yakin?',
        text: 'Skor kamu akan direset!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Reset',
        cancelButtonText: 'Batal',
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.isConfirmed) {
            deleteCookie('point');
            point = 0;
            pointEl.innerText = point;
        }
    })
}

function skipQuestion() {
    refresh();
}
