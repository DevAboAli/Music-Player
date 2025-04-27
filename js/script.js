document.addEventListener("DOMContentLoaded", function() {
    const songCards = document.querySelectorAll('.song');
    const playerNameTextField = document.querySelector('.player-name p');
    const prevIcon = document.querySelector('.player-pp .fa-backward');
    const nextIcon = document.querySelector('.player-pp .fa-forward');
    const heartIcon = document.querySelector('.player-icons .fa-heart');
    const playerImage = document.querySelector('.player-name img');
    const audio = document.getElementById("audio");
    const playBtn = document.querySelector(".fa-play");
    const progressBar = document.getElementById("progress-bar");
    const currentTimeEl = document.getElementById("current-time");
    const durationEl = document.getElementById("duration");
    const volumeBtn = document.querySelector(".fa-volume-high");
    const logoutBtn = document.getElementById("logoutBtn");

    const songs = [
        "../Voices/organ-stabs-staccato-echo(chosic.com).mp3",
        "../Voices/boom-impact-2(chosic.com).mp3",
        "../Voices/Air-Raid-Siren-Alarm-chosic.com_.mp3",
        "../Voices/Field-Cricket-chosic.com_.mp3",
        "../Voices/laughing(chosic.com).mp3",
        "../Voices/Fire-crackles(chosic.com).mp3",
        "../Voices/hope-sounds-wind(chosic.com).mp3",
        "../Voices/electronic-pounding-sound-mono(chosic.com).mp3"
    ];
    logoutBtn
    let isHeartRed = false;
    let currentSongIndex = 0;

    function loadSong(index) {
        audio.src = songs[index];
        playerNameTextField.textContent = getSongInfo(index);
        playerImage.src = songCards[index].querySelector('.player-img img').src;
    }

    function getSongInfo(index) {
        return songCards[index].querySelector('.song-cap h5').textContent;
    }

    songCards.forEach((songCard, index) => {
        songCard.addEventListener('click', function() {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            audio.play();
            playBtn.classList.replace("fa-play", "fa-pause");
        });
    });

    playBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playBtn.classList.replace("fa-play", "fa-pause");
        } else {
            audio.pause();
            playBtn.classList.replace("fa-pause", "fa-play");
        }
    });

    audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progress;

            const currentMinutes = Math.floor(audio.currentTime / 60);
            const currentSeconds = Math.floor(audio.currentTime % 60);
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;

            const durationMinutes = Math.floor(audio.duration / 60);
            const durationSeconds = Math.floor(audio.duration % 60);
            durationEl.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;

            if (audio.currentTime === audio.duration) {
                nextSong();
            }
        }
    });

    progressBar.addEventListener("input", () => {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

    volumeBtn.addEventListener("click", () => {
        audio.muted = !audio.muted;
        volumeBtn.classList.toggle("fa-volume-high", !audio.muted);
        volumeBtn.classList.toggle("fa-volume-xmark", audio.muted);
    });

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        audio.play();
        playBtn.classList.replace("fa-play", "fa-pause");
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        audio.play();
        playBtn.classList.replace("fa-play", "fa-pause");
    }

    nextIcon.addEventListener("click", nextSong);
    prevIcon.addEventListener("click", prevSong);

    heartIcon.addEventListener("click", function() {
        isHeartRed = !isHeartRed;
        heartIcon.style.color = isHeartRed ? "red" : "white";
    });

    loadSong(currentSongIndex);

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            window.location.href = "../index.html"; 
        });
    }
});
