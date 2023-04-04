# Tebak Lirik Game
Game Tebak Lirik adalah sebuah game sederhana yang memungkinkan pengguna untuk menebak judul lagu dari sebuah cuplikan lirik. Game ini dikembangkan menggunakan bahasa pemrograman JavaScript dan diimplementasikan dalam bentuk single page application (SPA).

## Fungsi-fungsi
Berikut adalah beberapa fungsi yang terdapat dalam game ini:
```javascript
addPoint()
```
Fungsi ini digunakan untuk menambah skor pengguna ketika menjawab pertanyaan dengan benar.
```javascript
refresh()
```
Fungsi ini digunakan untuk merefresh ulang halaman saat pengguna ingin melanjutkan ke pertanyaan berikutnya.
```javascript
updateTimer()
```
Fungsi ini digunakan untuk meng-update waktu yang tersisa dalam game setiap satu detik. Jika waktu sudah habis, maka halaman akan direfresh.
```javascript
checkAnswer()
```
Fungsi ini digunakan untuk memeriksa jawaban pengguna. Jika jawaban benar, maka skor pengguna akan ditambah dan halaman akan direfresh. Jika jawaban salah, maka akan ditampilkan pesan "Salah!".
```javascript
getCookie(name)
```
Fungsi ini digunakan untuk mengambil nilai cookie dengan nama tertentu.
```javascript
setCookie(name, value, days)
```
Fungsi ini digunakan untuk mengatur nilai cookie dengan nama tertentu, nilai, dan durasi kedaluwarsa.
```javascript
deleteCookie(name)
```
Fungsi ini digunakan untuk menghapus cookie dengan nama tertentu.
```javascript
resetScore()
```
Fungsi ini digunakan untuk mereset skor pengguna dan menghapus nilai cookie yang terkait.
```javascript
skipQuestion()
```
Fungsi ini digunakan untuk melewati pertanyaan saat pengguna tidak tahu jawabannya.

## Penggunaan
Game Tebak Lirik dapat digunakan dengan membuka file index.html pada browser. Halaman akan menampilkan cuplikan lirik dan waktu yang tersisa untuk menjawab pertanyaan. Pengguna dapat menjawab dengan mengetikkan jawaban pada form yang tersedia dan menekan tombol "Jawab". Jika jawaban benar, maka skor pengguna akan bertambah dan pertanyaan berikutnya akan muncul. Jika jawaban salah, maka pengguna dapat mencoba menjawab pertanyaan yang sama atau melewati pertanyaan tersebut dengan menekan tombol "Lewati". Skor pengguna akan tersimpan dalam bentuk cookie pada browser dan akan tetap ada selama 7 hari sejak terakhir diubah. Pengguna dapat mereset skor dengan menekan tombol "Reset Skor".